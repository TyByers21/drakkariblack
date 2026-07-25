# Deploying Drakkari Black

The site is a Node.js Express server that serves the React app **and** the API
(`/api/spotify-token`, `/api/newsletter`, `/api/contact`). It cannot be uploaded
as static files to Hostinger shared hosting — that plan has no Node runtime.

Plan: the app runs on **Render**, the domain stays registered at **Hostinger**,
and Hostinger DNS points at Render.

> **Never move the API keys into the frontend to make static hosting work.**
> The server-side proxy in `server/routes.ts` exists so the Spotify, Mailchimp,
> and Mailgun secrets never reach the browser. Bundling them into the React app
> publishes them to every visitor.

---

## 1. Push to GitHub

`.env` is gitignored and will not be uploaded — that's intentional. Secrets go
into Render's dashboard in step 3.

This repo has **no `origin` remote** (it was stripped during the Replit export;
the only remote is `gitsafe-backup`, which is not GitHub). Add it once:

```bash
git remote add origin https://github.com/<your-username>/drakkariblack.git
```

Then:

```bash
git add .
git commit -m "Add deployment config"
git push -u origin main
```

If the GitHub repo was created with a README or other initial commit, the push
is rejected as a non-fast-forward. See "Push rejected" at the bottom of this file.

## 2. Create the Render service

1. Sign up at <https://render.com> and connect your GitHub account.
2. **New → Blueprint**, select the `drakkariblack` repo.
3. Render reads `render.yaml` and configures the build automatically. Approve it.

The build runs `npm ci --include=dev && npm run build`, then starts
`node dist/index.js`.

## 3. Set the environment variables

Render will prompt for every key marked `sync: false`. Copy the values from your
local `.env`:

| Variable | Where it comes from |
|---|---|
| `SPOTIFY_CLIENT_ID` | Spotify Developer Dashboard |
| `SPOTIFY_CLIENT_SECRET` | Spotify Developer Dashboard |
| `MAILCHIMP_API_KEY` | Mailchimp → Account → Extras → API keys |
| `MAILCHIMP_AUDIENCE_ID` | `ec7b462747` (audience "Drakkari Black") |
| `MAILGUN_API_KEY` | Mailgun → Sending → Domain settings |
| `MAILGUN_DOMAIN` | `drakkariblack.com` |
| `SESSION_SECRET` | Any long random string (currently unused) |

`NODE_ENV` and `NODE_VERSION` are already set in `render.yaml`.

Deploy. When it finishes you'll get a URL like `drakkari-black.onrender.com` —
open it and confirm the site loads before touching DNS.

## 4. Add the custom domain in Render

Service → **Settings → Custom Domains** → add both:

- `drakkariblack.com`
- `www.drakkariblack.com`

Render then shows the exact DNS records to create. **Use the values Render
displays**, not values copied from a guide — Render's IPs change over time.

## 5. Point Hostinger DNS at Render

In hPanel: **Domains → drakkariblack.com → DNS / Nameservers → Manage DNS records**

First confirm the domain is using **Hostinger nameservers** (`ns1.dns-parking.com`
/ `ns2.dns-parking.com`). If it uses someone else's, edit DNS there instead.

Then:

1. **Delete or edit the existing `A` record for `@`** — it currently points at
   Hostinger's shared hosting IP. This is the step people miss; leaving it means
   the domain keeps serving the old hosting.
2. **Delete any existing `CNAME` for `www`** for the same reason.
3. Add the records Render gave you — typically:
   - `A` record, name `@`, value = the IP Render shows
   - `CNAME` record, name `www`, value = `<your-app>.onrender.com`
4. Leave `MX` records alone if you receive email at this domain.

DNS propagation is usually minutes but can take up to 48 hours. Render issues a
TLS certificate automatically once the records resolve — no SSL setup needed.

## 6. Verify

- <https://drakkariblack.com> loads over HTTPS
- Album artwork appears (Spotify proxy working)
- Newsletter signup returns success
- Contact form submits

---

## Known follow-ups

**Mailgun is blocked.** The account returns
`403 Domain drakkariblack.com is not allowed to send: Account Inactivity` for
both the custom and sandbox domains. The integration is correct and will work
once the account is reactivated in the Mailgun dashboard. Until then the contact
form still saves and logs submissions — only the email notification is skipped.

**Render's free tier sleeps.** After ~15 minutes of no traffic the service spins
down, and the next visitor waits ~50 seconds for a cold start. For a public site
that's a bad first impression; the $7/month Starter tier stays warm.

**Rotate the credentials** that were shared in chat: Spotify client secret,
Mailchimp API key, Mailgun API key.

## Push rejected

If `git push` fails with `non-fast-forward` or `refusing to merge unrelated
histories`, the GitHub repo contains commits this clone doesn't share — usually
an auto-created `README`/`.gitignore` from the "Add a README file" checkbox.

Inspect what's actually on the remote before doing anything destructive:

```bash
git fetch origin
git log --oneline origin/main
```

- **Remote has only an init commit you don't care about** — overwrite it:

  ```bash
  git push --force-with-lease origin main
  ```

  `--force-with-lease` (not `--force`) aborts if someone else pushed in the
  meantime.

- **Remote has real work you want to keep** — join the histories instead:

  ```bash
  git pull origin main --allow-unrelated-histories
  # resolve any conflicts, then
  git push origin main
  ```

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

Hostinger's only role from here is **DNS**. The domain stays registered there;
nothing gets uploaded to Hostinger hosting.

Confirmed live state of `drakkariblack.com` (checked against Google + Cloudflare
resolvers):

| Record | Current value | Meaning |
|---|---|---|
| `NS` | `ns1.dns-parking.com`, `ns2.dns-parking.com` | Hostinger nameservers — edit DNS in hPanel ✅ |
| `A` @ | `92.112.189.221` | Hostinger shared hosting — **must be replaced** |
| `AAAA` @ | `2a02:4780:84::32` | Hostinger IPv6 — **must be deleted** (see below) |
| `CNAME` www | → `drakkariblack.com` | Fine to keep, or repoint at Render |
| `MX` | **none** | No inbound email — see Known follow-ups |
| `TXT` | `v=spf1 include:spf.mailjet.com include:spf.titan.email ~all` | SPF omits Mailgun — see Known follow-ups |

In hPanel: **Domains → drakkariblack.com → DNS / Nameservers → Manage DNS records**

1. **Delete the `AAAA` record for `@`** (`2a02:4780:84::32`).
   This is the step that silently breaks things. Render serves the apex over
   IPv4 only. If the IPv6 record survives, any visitor on an IPv6 connection
   still reaches Hostinger's empty hosting while IPv4 visitors see the new site
   — an intermittent "works for me" failure that is miserable to diagnose.
2. **Edit the `A` record for `@`**, replacing `92.112.189.221` with the IP shown
   in Render's Custom Domains panel (currently `216.24.57.1`, but **use what the
   dashboard displays** — Render's IPs change).
3. **Point `www` at Render**: set the `CNAME` for `www` to
   `<your-app>.onrender.com`.
4. **Leave the `TXT`/SPF record alone** for now — it affects email, not the site.

DNS propagation is usually minutes but can take up to 48 hours. Render issues a
TLS certificate automatically once the records resolve — no SSL setup needed.

Verify propagation from your machine:

```bash
nslookup drakkariblack.com 8.8.8.8        # expect Render's IP, not 92.112.189.221
nslookup -type=AAAA drakkariblack.com 8.8.8.8   # expect no answer
```

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

**`info@drakkariblack.com` cannot receive mail.** The domain has **no MX
records** (verified against both Google and Cloudflare resolvers). The contact
form is configured to notify `info@drakkariblack.com`, so even after Mailgun is
reactivated, those notifications would bounce — nothing is listening for inbound
mail at that address. The SPF record references `spf.titan.email`, which
suggests Titan (Hostinger's email product) was intended but never finished.

Two ways to fix, in hPanel → **Emails**:

- Set up Titan/Hostinger email for the domain, which adds the MX records; or
- Skip inbound mail entirely and point notifications at an address that already
  works, by setting `CONTACT_TO_EMAIL` in Render to e.g. your Gmail. No code
  change needed — `server/email.ts` already reads it.

**SPF does not authorize Mailgun.** The current record is:

```
v=spf1 include:spf.mailjet.com include:spf.titan.email ~all
```

Mail sent through Mailgun from `@drakkariblack.com` fails SPF alignment and is
likely to be spam-filtered. When you reactivate Mailgun, add its include:

```
v=spf1 include:spf.mailjet.com include:spf.titan.email include:mailgun.org ~all
```

Mailgun's dashboard also provides DKIM records — add those in Hostinger DNS too.
Note this affects *deliverability of the notification*, and is separate from the
account-inactivity block above.

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

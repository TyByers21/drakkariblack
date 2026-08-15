# Deploying Drakkari Black to Hostinger

The site builds to **pure static files** — HTML, CSS, JS, images. No Node.js
server, no monthly hosting cost, no cold starts. It uploads straight to your
existing Hostinger shared plan.

## Build it

```bash
npm install
npm run build:static
```

Output lands in **`dist/public/`**. That folder's *contents* are what you upload.

## Upload to Hostinger

**hPanel → Files → File Manager → `public_html`**

1. Delete anything already in `public_html` (the default Hostinger placeholder).
2. Upload **everything inside `dist/public/`** — not the folder itself. When
   you're done, `public_html/index.html` must exist (not
   `public_html/public/index.html`).
3. Confirm **`.htaccess`** came across. File Manager hides dotfiles by default:
   use **Settings → Show hidden files**. Without it, visiting
   `drakkariblack.com/setlist` directly returns 404.

Faster for a bulk upload: zip the *contents* of `dist/public`, upload the zip,
then use File Manager's **Extract**.

Nothing else is required — the domain already points at Hostinger, so the site
is live as soon as the files land.

## What runs without a server

| Feature | How it works |
|---|---|
| All 6 pages, images, styling | Static files |
| Booking form | Posts to `formsubmit.co` → `drakkariblack@gmail.com` |
| Album artwork | Baked in at build time (see below) |
| Newsletter signup | Mailchimp embed form |
| Streaming links | Plain outbound links |

No API keys ship to the browser. `.env` is only used at build time.

## Album artwork

`SPEAKEASY_SETLIST` is a static constant, so artwork can never change between
deploys. `scripts/fetch-spotify-artwork.mjs` resolves it once against the
Spotify API and writes `client/src/lib/spotify-artwork.json`, which is committed
to the repo. The browser reads that file — it never calls Spotify or needs a
token.

Current coverage: **73 of 80** songs resolved from Spotify. The other 7 already
carry hand-picked local images and are skipped by design, so every song has art.

**After editing the setlist**, refresh the data:

```bash
npm run build:artwork   # needs SPOTIFY_* in .env
npm run build:static
```

Skipping `build:artwork` is safe — new songs simply fall back to the placeholder
icon until you run it.

## Newsletter

The footer form is Mailchimp's standard embed: a real `<form>` POST to
`list-manage.com` with `target="_blank"`.

It is a native form submission rather than `fetch()` on purpose. Mailchimp sends
no CORS headers, so a scripted request is blocked by the browser, and their JSONP
endpoint (`/subscribe/post-json`) has been retired — it now returns 404 for this
account. A native form POST is not subject to CORS, which is why the official
embed uses one.

Consequence: the confirmation opens in a new tab, and the site cannot read the
result. The toast says "confirm in the tab that just opened" rather than
claiming success it can't verify.

The `u` and `id` values in `Footer.tsx` are public embed identifiers, not
secrets. The Mailchimp **API key** is not used by the site at all.

## Updating the site later

```bash
npm run build:static
```

Re-upload the contents of `dist/public/`. Asset filenames are content-hashed, so
returning visitors pick up changes immediately; `.htaccess` tells browsers never
to cache `index.html`.

---

## Verified

- Build succeeds; `.htaccess` is copied into `dist/public/`
- **Zero `/api/` calls** remain in the built bundle
- All 6 routes (`/`, `/about`, `/listening`, `/setlist`, `/appearances`,
  `/contact`) serve correctly through the SPA fallback
- 80 artwork URLs baked into the bundle

## Not verified

The Mailchimp form POST could not be exercised from the build environment —
outbound requests to `list-manage.com` failed to complete there. The endpoint is
correct (read from Mailchimp's own hosted form), but **test the newsletter in a
browser after uploading**.

## Known follow-ups

**The Express server is now unused by the site.** `server/` still contains
`/api/spotify-token`, `/api/newsletter`, and `/api/contact`, plus the Mailgun
integration. The frontend calls none of them. Keep it for local development
(`npm run dev`) or delete it — it has no effect on the deployed site.

**Mailgun is irrelevant to production.** The booking form goes through
formsubmit.co, so the Mailgun account-inactivity block and the domain's missing
MX records do not affect the live site.

**Rotate the credentials** shared during setup: Spotify client secret, Mailchimp
API key, Mailgun API key. None ship to the browser, but they were exposed in
chat.

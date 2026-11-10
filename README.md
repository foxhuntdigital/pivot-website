# PIVOT — marketing and legal site

A static site for the PIVOT iOS app. Plain HTML and CSS. No framework and
nothing server-side — every path is relative, so it works by opening
`index.html` straight from the filesystem.

## Previewing locally

Vite is included as a dev-only dependency to serve the site with live reload,
so edits to the HTML or CSS show up without a manual refresh. It is not part of
the deployed site — what you upload is still the plain HTML and CSS.

```sh
npm install   # once
npm run dev   # http://localhost:5173, opens your browser
```

Opening `index.html` in a browser directly still works if you would rather skip
npm entirely.

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing page — what PIVOT is, the four feature blocks, App Store badge slot |
| `privacy.html` | Privacy policy — required by App Store Connect |
| `terms.html` | Terms of use / EULA — also linked from the RevenueCat paywall |
| `support.html` | Support page — required by App Store Connect |
| `styles.css` | Shared stylesheet — the whole design system lives here |
| `package.json` | Dev-server scripts and the one dev dependency (Vite) |
| `vite.config.js` | Local dev-server config — lists all four pages as entries |
| `netlify.toml` | Netlify build, publish directory and cache/security headers |

## Site identity

| Value | Setting |
|---|---|
| Domain | `pivot-engine.app` (canonical host, served over HTTPS with `www` redirecting to the apex) |
| Operating entity | Herobic LLC — named in `privacy.html` and `terms.html` |
| Contact address | `support@foxhuntdigital.com` — the support, privacy and legal contact on every page |

The pages link each other with relative paths, so the domain appears only in
the `<link rel="canonical">` and `og:url` tags in each `<head>`. If the domain
ever changes, those four tags and this table are the whole edit:

```sh
grep -rn "pivot-engine.app" *.html README.md
```

Still outstanding:

- **App Store badge.** Both badge slots in `index.html` are marked with an HTML
  comment and currently link to `#`. Download the official badge from Apple's
  marketing resources, drop the image in, and point the `href` at your App Store
  listing.
- **Last updated dates.** `privacy.html` and `terms.html` both read
  *10 September 2026*. Update them whenever you change either document.

## Editing

Open the files in any editor and reload the browser. There is nothing to
compile and nothing to install.

The design system is entirely in `styles.css`, at the top as CSS custom
properties. A few rules hold the whole thing together and are worth keeping:

- **Zero border radius anywhere.** Nothing in this system is rounded.
- **Hairline rules, not cards.** No drop shadows, no gradients.
- Uppercase letterspaced micro-labels (`.micro`) above each section heading.
- One red accent (`--red`). The mist palette (`--mist`) means "measured data"
  and is used only for the readiness grid.

Type is **Archivo** from Google Fonts (400/500/700/800/900), loaded from a CDN
in each page's `<head>`.

## Deploying to Netlify

`netlify.toml` holds the config: build with `npm run build`, publish `dist/`.
Building rather than uploading the repo root keeps `PROMPT.md`, `README.md` and
the config files off the public site, and content-hashes the stylesheet so
updates are never served stale from cache.

### Option A — connect the git repo (recommended)

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Netlify reads `netlify.toml`, so leave the build command and publish
   directory as they are prefilled. Deploy.
4. You get a `*.netlify.app` URL immediately. Check all four pages there before
   pointing `pivot-engine.app` at it.

Every push to `main` redeploys. Pull requests get their own preview URL.

### Option B — drag and drop

Run `npm run build`, then drag the **`dist` folder** onto the Netlify
**Sites** page. Repeat to publish an update.

Note that drag-and-drop ignores `netlify.toml`, so the cache and security
headers above are not applied. Option A is preferable for that reason.

### Pointing your domain at it

1. In the site's **Domain management → Add a domain**, enter `pivot-engine.app`.
2. Either delegate DNS to Netlify by changing your registrar's nameservers to
   the four Netlify gives you, or keep your DNS where it is and add the records
   Netlify shows (an `ALIAS`/`ANAME` or `A` record for the apex, `CNAME` for
   `www`).
3. Set the apex `pivot-engine.app` as the primary domain; Netlify then
   redirects `www` to it automatically. The apex is what the canonical and
   `og:url` tags point at, so keep it primary.
4. TLS via Let's Encrypt is issued once DNS resolves — give it a few minutes
   before testing `https://`.

## URLs to paste where

Once the site is live at `pivot-engine.app`:

**App Store Connect**

| Field | URL |
|---|---|
| Support URL | `https://pivot-engine.app/support.html` |
| Privacy Policy URL | `https://pivot-engine.app/privacy.html` |
| Marketing URL (optional) | `https://pivot-engine.app/` |

**RevenueCat paywall footer**

| Field | URL |
|---|---|
| Terms of Service | `https://pivot-engine.app/terms.html` |
| Privacy Policy | `https://pivot-engine.app/privacy.html` |

Netlify also serves these without the `.html` extension (`/support`,
`/privacy`, `/terms`). The explicit `.html` URLs above are the safe choice
because they also work when opening the files locally.

## A note on the legal pages

`privacy.html` and `terms.html` are drafts. The privacy policy describes only
the data practices that were specified — nothing was invented or added. Have
both reviewed before you rely on them; an app collecting postpartum, injury and
symptom information from consumers is worth a lawyer's read.

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

## Before you publish — placeholders to replace

Four values are stubbed. Replace each across all four HTML files:

| Placeholder | Replace with |
|---|---|
| `YOUR-DOMAIN.com` | your domain |
| `support@YOUR-DOMAIN.com` | your support email address |
| `YOUR LEGAL ENTITY` | the LLC or personal name the policies are issued under |
| `YOUR STATE, USA` | the governing law for the terms (`terms.html` only) |

From the repo root:

```sh
grep -rn "YOUR-DOMAIN\|YOUR LEGAL ENTITY\|YOUR STATE" *.html
```

and to replace them (macOS `sed`):

```sh
sed -i '' 's/YOUR-DOMAIN\.com/example.com/g'        *.html
sed -i '' 's/YOUR LEGAL ENTITY/Example Training LLC/g' *.html
sed -i '' 's/YOUR STATE, USA/Texas, USA/g'          terms.html
```

Also outstanding:

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
   pointing your domain at it.

Every push to `main` redeploys. Pull requests get their own preview URL.

### Option B — drag and drop

Run `npm run build`, then drag the **`dist` folder** onto the Netlify
**Sites** page. Repeat to publish an update.

Note that drag-and-drop ignores `netlify.toml`, so the cache and security
headers above are not applied. Option A is preferable for that reason.

### Pointing your domain at it

1. In the site's **Domain management → Add a domain**, enter your domain.
2. Either delegate DNS to Netlify by changing your registrar's nameservers to
   the four Netlify gives you, or keep your DNS where it is and add the records
   Netlify shows (an `ALIAS`/`ANAME` or `A` record for the apex, `CNAME` for
   `www`).
3. Netlify sets one host as primary and redirects the other automatically.
4. TLS via Let's Encrypt is issued once DNS resolves — give it a few minutes
   before testing `https://`.

## URLs to paste where

Once the site is live at your domain:

**App Store Connect**

| Field | URL |
|---|---|
| Support URL | `https://YOUR-DOMAIN.com/support.html` |
| Privacy Policy URL | `https://YOUR-DOMAIN.com/privacy.html` |
| Marketing URL (optional) | `https://YOUR-DOMAIN.com/` |

**RevenueCat paywall footer**

| Field | URL |
|---|---|
| Terms of Service | `https://YOUR-DOMAIN.com/terms.html` |
| Privacy Policy | `https://YOUR-DOMAIN.com/privacy.html` |

Netlify also serves these without the `.html` extension (`/support`,
`/privacy`, `/terms`). The explicit `.html` URLs above are the safe choice
because they also work when opening the files locally.

## A note on the legal pages

`privacy.html` and `terms.html` are drafts. The privacy policy describes only
the data practices that were specified — nothing was invented or added. Have
both reviewed before you rely on them; an app collecting postpartum, injury and
symptom information from consumers is worth a lawyer's read.

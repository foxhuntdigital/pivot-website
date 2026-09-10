# PIVOT — marketing and legal site

A static site for the PIVOT iOS app. Plain HTML and CSS. No build step, no
framework, no npm dependencies. It works by opening `index.html` straight from
the filesystem — every path is relative and nothing is server-side.

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing page — what PIVOT is, the four feature blocks, App Store badge slot |
| `privacy.html` | Privacy policy — required by App Store Connect |
| `terms.html` | Terms of use / EULA — also linked from the RevenueCat paywall |
| `support.html` | Support page — required by App Store Connect |
| `styles.css` | Shared stylesheet — the whole design system lives here |

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

## Deploying to Cloudflare Pages

This is a direct directory upload — no git integration and no build command
required.

1. In the Cloudflare dashboard go to **Workers & Pages → Create → Pages →
   Upload assets**.
2. Name the project (e.g. `pivot-site`), then drag the *contents* of this repo
   into the upload area — the four `.html` files and `styles.css`. Do not upload
   the enclosing folder, or every URL gains an extra path segment.
3. Deploy. Cloudflare gives you a `*.pages.dev` URL immediately. Check the four
   pages there before pointing your domain at it.

### Pointing your domain at it

1. Add your domain to Cloudflare as a zone, and change your registrar's
   nameservers to the two Cloudflare gives you. Wait for the zone to go active.
2. In the Pages project, open **Custom domains → Set up a custom domain**, enter
   your domain, and let Cloudflare create the DNS record.
3. Repeat for `www.` if you want it, then add a redirect rule so one canonical
   host serves the site.
4. TLS is issued automatically. Give it a few minutes before testing `https://`.

To publish an update, upload the directory again as a new deployment.

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

Cloudflare Pages also serves these without the `.html` extension
(`/support`, `/privacy`, `/terms`). The explicit `.html` URLs above are the safe
choice because they also work when opening the files locally.

## A note on the legal pages

`privacy.html` and `terms.html` are drafts. The privacy policy describes only
the data practices that were specified — nothing was invented or added. Have
both reviewed before you rely on them; an app collecting postpartum, injury and
symptom information from consumers is worth a lawyer's read.

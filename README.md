# Danuta Bakery

Single-page website for [@danuta_bakery](https://www.instagram.com/danuta_bakery/) — cakes to order in Temirtau and Karaganda.

Live: https://highxshell.github.io/danuta-bakery/

## Structure

- `index.html` — page content (Russian)
- `styles.css` — styles
- `script.js` — gallery filters, photo viewer, scroll effects
- `images/` — photos from the Instagram profile

## Editing

- **Phone / WhatsApp:** search `77087106216` in `index.html` and replace it everywhere.
- **Gallery:** add an `<li data-cat="…">` block in the `.gallery` list. Categories: `wedding`, `kids`, `party`, `candy`.
- **Photos:** drop a new file into `images/` and point an `<img src>` at it.

Every push to `main` redeploys the site via GitHub Pages (takes about a minute).

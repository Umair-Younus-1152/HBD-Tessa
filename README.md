# Gull's Birthday Site

A redesigned, self-contained birthday page. No build step, no external
frameworks (jQuery/Bootstrap were removed) — just open `index.html`.

## How to make future changes

You will almost never need to touch anything except **`js/config.js`**.

Open that file and edit:

- **`name`** — updates the balloon letters, the "Happy Birthday, ___!"
  headline, and the closing line of the poem automatically.
- **`colors`** — six hex codes. Change any of them and the entire site
  re-themes (buttons, text, balloons' name-label glow, confetti).
- **`message`** — an array of strings, one per line of the poem shown in
  the final scene. Add, remove, reorder, or edit lines freely; the layout
  adjusts on its own. Don't add the closing "happy birthday" line — that's
  generated automatically from `name`.
- **`music`** — path to the background audio file, if you want to swap the song.

Everything else (`index.html`, `css/style.css`, `js/app.js`) is layout,
styling, and animation logic that reads from `config.js` — you shouldn't
need to edit it for a simple content or color change.

## Changing the flow (advanced)

The whole experience — lights, music, banner, balloons, cake, greeting,
poem, confetti — is one ordered list called `STEPS` near the bottom of
`js/app.js`. Each entry has a button `label` and a `run(next)` function.
To add a new scene, insert a new object in that array; to remove one,
delete its entry; to reorder, move it. Call `next()` when the scene's
animation is done so the flow advances to the next step.

## Running it locally

Just open `index.html` in a browser — no server required. If your
browser blocks local file access for some assets, run:

```
cd Birthday-master
python3 -m http.server 8080
```

and visit `http://localhost:8080`.

## What changed from the original

- Removed jQuery, Bootstrap, and an unused `less.js` dependency — the
  page is now plain HTML/CSS/JS.
- Replaced the old 7-button navbar (which caused visible layout gaps as
  buttons faded in and out) with a single button that advances through
  the story — no more empty space or overlapping controls.
- Fixed a broken insecure font link, a CSS typo, and ~1,300 lines of
  duplicated vendor-prefixed CSS collapsed into reusable, DRY rules.
- Replaced the fragile `nth-child`-based poem reveal with a fixed-height
  message box driven by a simple array, so lines fade in place instead
  of jumping the page around.
- Balloons now spell out "HBD" + the name dynamically instead of being
  hardcoded letter-by-letter in the HTML.
- Added a soft ambient sparkle layer, synced fairy-light glow, and a
  confetti finale for a more polished, modern feel.
- Fully responsive from small phones to desktop, with reduced-motion
  support and visible keyboard focus states.

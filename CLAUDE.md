# Dinksy — Brand & Character Guide

Dinksy is a playful pickleball brand built around two mascots who are living pickleballs:
**DonDon** (yellow) and **DinDin** (pink). The characters are used for **animations** and
**merch**, and the brand lives mostly on **social media**.

**This folder is the Dinksy website project.** Everything built here must follow this guide.

Source references in this folder (treat these as the source of truth):
- `Brand.webp`: brand sheet (logo, palette, typography, character style)
- `Dondon.webp`: DonDon character sheet
- `DinDin.webp`: DinDin character sheet

---

## 1. Logo

- Wordmark: **DINKSY**, all caps, in the chunky bubble display face.
- Primary: black wordmark on Pickleball Yellow block.
- Alternates:
  - **Black on white**: black wordmark inside a thin black rectangular outline on white.
  - **White on black**: white wordmark on solid black block.
- Do not recolor the wordmark outside these three versions; do not stretch or outline it.
- Use the logo as an image asset. Never re-typeset it with a web font.

## 2. Color Palette (official)

The labeled values on the brand sheet are official. Use exactly these.

| Name | Hex | Use |
|---|---|---|
| Pickleball Yellow | `#FDBA21` | Primary brand color, logo block, DonDon |
| Black | `#000000` | Wordmark, outlines, text |
| White | `#FFFFFF` | Backgrounds, sticker borders, DinDin's skirt, DonDon's headband/shoes |
| Character Pink | `#FF8ACB` | DinDin, secondary accent |
| Wood Tan | `#C49E6C` | Paddles (DonDon's wooden paddle) |

Reference-only tones (sampled from the character sheets, not official; the brand palette
wins on any conflict):
- DonDon: darker mustard spots, bandage beige `~#E8C8AC`
- DinDin: dark rose spots `~#C84D77`
- Brand sheet background is a warm off-white/cream.

## 3. Typography

Web fonts chosen as the closest match to the existing logo and brand sheet (Google Fonts):

| Role | Font | Fallback | Use |
|---|---|---|---|
| Bubble Display | **Titan One** | Lilita One | Headlines, slogans, buttons, all-caps punchy text (e.g. "PLAY HARD") |
| Rounded Sans | **Nunito** | Fredoka | Body copy, taglines, captions (e.g. "Dink responsibly") |

- Taglines on the sheet: **"PLAY HARD"** / **"Dink responsibly"**.

## 4. Character Style (shared rules)

- Names are always written **DonDon** and **DinDin**: one word, capital D's.
- Each mascot is a **pickleball**: round sphere head-and-body in one, with darker circular
  "holes" as spots.
- Thin, noodle-like arms and legs; simple hands.
- **Thick black outlines**, flat color fills, minimal shading.
- Expressive cartoon faces: heavy eyebrows/eyelids carry the emotion.
- Presented **sticker-style**: thick white border around the figure, light drop shadow.
- Both hold pickleball paddles.
- **Relationship:** none defined yet. Do not invent one (rivals, siblings, partners, etc.)
  without asking.

## 5. DonDon — Yellow Mascot (he/him/his)

**Personality:** determined, competitive, energetic. He's the try-hard who throws
everything into every point, sometimes too much.

**Look:**
- Pickleball Yellow body with darker mustard spots.
- White sweatband/headband tied in a knot with trailing ends.
- Beige bandage on his forehead/top of head.
- Yellow limbs, white sneakers.
- Wooden (Wood Tan) paddle.
- Often shown with sweat drops and motion lines.

**Expressions on sheet:** fierce/determined scowl, gritted-teeth frustration, dizzy
(spiral eyes, tongue out), huge grin, sweaty and worried, confused after a ball bonks him
on the head, asleep ("Zzz").

**Poses on sheet:** diving fall with thumbs up (paddle dropped), sprinting after a ball,
powering a swing surrounded by loose balls, front / back turnarounds.

## 6. DinDin — Pink Mascot (she/her/hers)

**Personality:** smug, calm, laid-back. She's effortlessly good, unbothered, a little
sassy. The cool counterpart to DonDon.

**Look:**
- Character Pink body with darker rose spots.
- Pink bow on top of her head (sits to one side).
- White ruffled tutu/skirt.
- Pink limbs.
- Pink paddle.
- Signature face: half-lidded eyes and a small smirk.

**Expressions on sheet:** default smug, smug grin, eyes-closed "ooh", wide-eyed surprise,
unimpressed side-eye, bored/resting with paddle.

**Poses on sheet:** casual one-legged forehand swing, lazily leaning over the net mid-spin,
sipping an iced drink with a straw, front / three-quarter / back turnarounds.

## 7. Brand Voice & Tone

Current direction (may change later):
- Playful, punny, sporty. Short, punchy lines.
- Leans on pickleball vocabulary and puns ("dink", "kitchen", "rally", etc.).
- Dual energy mirrors the mascots: **DonDon = hype and hustle**, **DinDin = cool and
  unbothered**.

## 8. Website

- **Purpose:** showcase DonDon and DinDin, sell merch, link out to social media and
  animation content.
- **Mobile-first:** most visitors come from social media on phones.

### Stack

| Piece | Choice | Why |
|---|---|---|
| Store + hosting | **Shopify** (Online Store 2.0) | Dinksy holds its own inventory: Shopify handles stock, orders, shipping labels, payments, taxes. Hosting included. |
| Front end | **Custom Shopify theme** (Liquid + sections/blocks, started from Dawn) | Coders edit the theme code; non-coders edit pages, products and section content in Shopify's visual theme editor. |
| Interactive animations | **Rive** (`@rive-app/canvas` web runtime) | State machines let DonDon/DinDin react to hover, scroll, clicks. Small files, crisp vector art. Lottie only if an animator delivers Lottie files. |
| Dev tooling | **Shopify CLI** (`shopify theme dev` / `shopify theme push`), Git for version control | Local preview against the real store. |

Rules for this stack:
- Every new page piece is a **section with editable settings/blocks**, so non-coders can
  change text, images and products in the theme editor without code.
- Brand tokens below live in one theme CSS file (e.g. `assets/dinksy-tokens.css`).
- Rive animations go in their own reusable section (e.g. `sections/mascot-rive.liquid`)
  with the `.riv` file and state-machine name as settings. Respect
  `prefers-reduced-motion`: show a static frame instead.
- Don't add a separate framework (Next.js, Hydrogen, etc.) without asking; going
  headless would remove the visual editor non-coders rely on.

### Clickable MVP (current phase, before Shopify is connected)

- Lives in `mvp/`: plain HTML/CSS/JS, no build step. Hash routes (plain names only, no
  slashes, so they work when published): `#home`, `#shop`, `#shop-<dondon|dindin|dinksy>`,
  `#product-<id>`, `#dondon`, `#dindin`.
- Published for sharing at https://claude.ai/artifact/5LAbagX3g7iFpcFqsuKnoD (private until
  shared from its Share menu). To update: run `python3 -I mvp/tools/make-artifact.py`
  (rebuilds `mvp/artifact.html` from `index.html`), then republish `mvp/artifact.html`
  with the css/js/assets files.
- Run: `python3 -m http.server 4321 --directory mvp` (also in `.claude/launch.json`
  as `dinksy-mvp`), open http://localhost:4321. ES modules need a server, not `file://`.
- Files: `css/tokens.css` (brand tokens), `css/site.css`, `js/data.js` (mock mascots,
  products, quiz, videos), `js/app.js` (router, cart, interactions).
- Art in `mvp/assets/img/` is cut from the three source sheets (transparent PNGs,
  upscaled 3x, so slightly soft). Replace with high-res exports when available.
- Mock only: sample prices, cart in `localStorage`, checkout/newsletter/social links show
  "connects later" messages. Mascot tap-cycles stand in for future Rive animations.
- Each home block maps to a future Shopify section (hero, marquee, crew, featured
  products, quiz, videos, signup). Keep that 1:1 so porting to Liquid stays simple.

- **Brand tokens:** define once as CSS variables and use everywhere:
  ```css
  :root {
    --yellow: #FDBA21;
    --black: #000000;
    --white: #FFFFFF;
    --pink: #FF8ACB;
    --tan: #C49E6C;
    --cream: #F7F4EF; /* page background, approx. from brand sheet */
    --font-display: "Titan One", "Lilita One", system-ui, sans-serif;
    --font-body: "Nunito", "Fredoka", system-ui, sans-serif;
  }
  ```
- **Visual style:** match the characters: thick black outlines, flat fills, rounded
  shapes, sticker-style cards with white borders. No gradients or realistic 3D.
- **Mascot art:** use the source character images; don't redraw or restyle them.

## 9. Do / Don't

**Do**
- Keep outlines thick and black; fills flat.
- Keep mascots round, spotted, and stick-limbed.
- Keep each mascot's signature accessories (DonDon: headband, bandage, sneakers, wood
  paddle; DinDin: bow, tutu, pink paddle).
- Keep personalities consistent: DonDon is never chill; DinDin is never frantic.
- Use correct pronouns: DonDon he/him, DinDin she/her.

**Don't**
- Swap mascot colors or accessories.
- Write the names as "Don Don", "Din Din", "Dondon", or "Dindin".
- Add realistic shading, gradients, or 3D rendering.
- Use thin or sharp-edged fonts for headlines.
- Invent a relationship or backstory between the mascots.

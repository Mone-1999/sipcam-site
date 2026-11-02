# SIPCAM OXON — HTML preview

Open `index.html` directly, or run `node server.cjs` in this directory and visit http://127.0.0.1:4173.

No dependencies, build step, network fonts, or external image requests. All assets and Onest are local.

Based on Figma frame 8768:74, file JpYqkeBy8W3SN2KYfS1Lq9. Original product photographs and their cropping were exported from the approved layers, without replacement. Hero, leaves, leaf overlay, map, farmer photo and logo were also exported from Figma. Founder portraits and factory photo use matching local source files. MICROPLUS and icons use the assets created in the previous design pass.

CSS responsive layouts; native smooth anchor scrolling; one-time staggered text reveal using IntersectionObserver; keyboard-accessible dialog menu; horizontal history and mobile product scrolling. Reduced-motion preference disables motion. Content remains visible without JavaScript.

The form is a local demonstration. It validates fields and displays an explicit notice; it does not transmit or store submitted data. Backend integration is not part of this preview.

## MICROPLUS scroll scene

New approved sphere asset: assets/microplus-round-v2.png. The section uses microplus.css and a requestAnimationFrame scroll handler in app.js. On screens at least 901px wide and 700px high, the native sticky stage holds for 170 viewport heights of scrolling; three pairs reveal in sequence and the raster artwork rotates gently by 62 degrees in its image plane. This is not a volumetric 3D model. Reverse scrolling reverses the sequence. On narrower/shorter screens, without JavaScript, or with reduced motion, normal document flow is retained. Mobile benefits use the existing one-time reveal. Original product photos are unchanged.

Verified at 1440×900 and 390×844: pinned stage top stays at zero, staged opacity values change with scroll, reverse progress changes the rotation, all six benefits become visible, mobile falls back to static positioning and has no horizontal overflow. The added eyebrow labels and numbering were subsequently removed. Typography remains Onest Medium 500 / Regular 400. The supplied SIPCAM_RUS_LOGO_hori.svg is used unchanged in the header, menu and footer. Screenshot: logo-preview.png.

Verified in browser at 1280px and 390px: no page overflow, all referenced images load, mobile menu opens/closes, anchor navigation, history/product controls and demonstration form. JavaScript syntax checked with node --check.


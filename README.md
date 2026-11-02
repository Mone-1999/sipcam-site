# SIPCAM OXON — HTML preview

Open `index.html` directly, or run `node server.cjs` in this directory and visit http://127.0.0.1:4173.

No dependencies, build step, network fonts, or external image requests. All assets and Onest are local.

Based on Figma frame 8768:74, file JpYqkeBy8W3SN2KYfS1Lq9. Original product photographs and their cropping were exported from the approved layers, without replacement. Hero, leaves, leaf overlay, map, farmer photo and logo were also exported from Figma. Founder portraits and factory photo use matching local source files. MICROPLUS and icons use the assets created in the previous design pass.

CSS responsive layouts; native smooth anchor scrolling; one-time staggered text reveal using IntersectionObserver; keyboard-accessible dialog menu; horizontal history and mobile product scrolling. Reduced-motion preference disables motion. Content remains visible without JavaScript.

The form is a local demonstration. It validates fields and displays an explicit notice; it does not transmit or store submitted data. Backend integration is not part of this preview.

Verified in browser at 1280px and 390px: no page overflow, all referenced images load, mobile menu opens/closes, anchor navigation, history/product controls and demonstration form. JavaScript syntax checked with node --check.

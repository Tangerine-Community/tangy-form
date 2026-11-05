// Module for tangy-option-layouts.html. `npm start` (polymer serve) no longer runs on current Node,
// so serve this page with esbuild, which bundles the bare imports on the fly (nothing is written):
//   npx esbuild demo/tangy-option-layouts.js --bundle --format=esm --outdir=demo/build --servedir=. --serve=127.0.0.1:8090
// then open http://127.0.0.1:8090/demo/tangy-option-layouts.html
import '@polymer/iron-demo-helpers/demo-pages-shared-styles'
import '@polymer/iron-demo-helpers/demo-snippet'
import '../input/tangy-radio-buttons.js'
import '../input/tangy-radio-blocks.js'
import '../input/tangy-checkboxes.js'

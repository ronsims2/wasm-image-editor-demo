# Getting Started

Build the crate using wasm-pack
```
wasm-pack build --target web
```

Manually edit the `package.json` of the newly created crate package (the pkg directory inside the rust project).
and add a `main` entry.  For `wasm-image-editor` I added `"main": "wasm_image_editor.js"`

From inside the `pkg` directory run `npm link` to make the package locally installable.

From insider the web package that is using the wasm crate from npm, run: 
`npm link wasm-image-editor --save`

Start the server
`npm run dev`


### Resources
* https://stackoverflow.com/questions/72587871/how-to-include-an-wasm-npm-module-in-svelte-with-vite

* https://github.com/nshen/vite-plugin-wasm-pack/

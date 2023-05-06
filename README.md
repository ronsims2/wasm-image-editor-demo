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

### Troubleshooting

Do not forget to add WASM dependecies to the vite config!
You many need to add a main entry for both the `wasm-image-editor` and `photon-web`. 


### Notes
wasm-image-editor, photon-web and canvas were benchmarked using  approximately 9MB (5184x3456) images.  Average results below.


| tool              | time |
|-------------------|---|
| HTML5 canvas      | 500ms  |
| wasm-image-editor | 3000ms |
| photon-web | 1800ms |

I think `wasm-image-editor`, and `photo-web` are slow due to the vite plugin and or the algorithm used to resize.





### Resources
* https://stackoverflow.com/questions/72587871/how-to-include-an-wasm-npm-module-in-svelte-with-vite

* https://github.com/nshen/vite-plugin-wasm-pack/

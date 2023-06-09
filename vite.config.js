import { defineConfig} from 'vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import vitePluginWasmPack from 'vite-plugin-wasm-pack'

export default defineConfig({
    plugins: [vitePluginWasmPack([], ['wasm-image-editor', 'photon-web'])],
    define: {
        'process': {version: 'v16.8.0', env: {}}
    }
})

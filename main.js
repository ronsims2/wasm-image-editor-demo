import init, { greet, resize_image } from 'wasm-image-editor'
import axios from 'axios'
import photonInit, { resize, open_image, putImageData } from 'photon-web'

import './style.css'

// This is used by wasm to print debug output
window.log = (x) => {
    console.log(x)
}

const RESIZE_FACTOR = 0.5

const opMode = document.querySelector('#op_mode')
let useWasm = opMode.checked
opMode.addEventListener('click', (e) => {
    useWasm = e.target.checked
})

photonInit().then(() => {
    const uploadElement = document.querySelector('#image_upload_2')
    uploadElement.addEventListener('change', (e) => {
        const start = performance.now()
        const fileUrl = URL.createObjectURL(e.target.files[0])
        const img = new Image()
        img.addEventListener('load', (evt) => {
            const canvas = document.createElement('canvas')
            canvas.width = evt.target.naturalWidth
            canvas.height = evt.target.naturalHeight
            const newWidth = Math.floor(RESIZE_FACTOR * evt.target.naturalWidth)
            const newHeight = Math.floor(RESIZE_FACTOR * evt.target.naturalHeight)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(evt.target, 0, 0, ctx.canvas.width, ctx.canvas.height)

            const photonImg = open_image(canvas, ctx)
            const resizedImg = resize(photonImg, newWidth, newHeight, 1)
            canvas.width = newWidth
            canvas.height = newHeight
            putImageData(canvas, ctx, resizedImg)

            const newImage = new Image()
            newImage.src = canvas.toDataURL()

            const app = document.querySelector('#app')
            app.append(newImage)
            console.log(`Photon resize exec time: ${(performance.now() - start) / 1000}s`)
        })
        img.src = fileUrl
    })
})

init().then(() => {
    const uploadElement = document.querySelector('#image_upload')
    uploadElement.addEventListener('change', (e) => {
        if (e.target.files.length) {
            if(useWasm) {
                const start = performance.now()
                const fileUrl = URL.createObjectURL(e.target.files[0])
                axios.get(fileUrl, { responseType: 'blob'}).then(data => {
                    return data.data.arrayBuffer()
                }).then(data => {
                    const dataArray = new Uint8Array(data)
                    const resizedImage = resize_image(dataArray, RESIZE_FACTOR)
                    const imageBlob = new Blob([resizedImage.buffer], {type: 'image/jpeg'})
                    const resizedImageUrl = URL.createObjectURL(imageBlob)
                    const img = new Image()
                    img.src = resizedImageUrl
                    const app = document.querySelector('#app')
                    app.append(img)
                    console.log(`WASM exec time: ${(performance.now() - start) / 1000}s`)
                })
            } else {
                // use canvas
                const start = performance.now()
                const fileUrl = URL.createObjectURL(e.target.files[0])
                const img = new Image()
                img.addEventListener('load', (e) => {
                    const canvas = document.createElement('canvas')
                    canvas.width = Math.floor(RESIZE_FACTOR * e.target.naturalWidth)
                    canvas.height = Math.floor(RESIZE_FACTOR * e.target.naturalHeight)
                    const ctx = canvas.getContext('2d')
                    const newWidth = ctx.canvas.width
                    const newHeight = ctx.canvas.height
                    ctx.drawImage(e.target, 0, 0, newWidth, newHeight)

                    const newImage = new Image()
                    newImage.src = canvas.toDataURL()
                    const app = document.querySelector('#app')
                    app.append(newImage)
                    console.log(`Canvas resize exec time: ${(performance.now() - start) / 1000}s`)
                })

                img.src = fileUrl
            }
        }
    })
    // demo call to js from wasm
    // greet('foo bar baz')
})




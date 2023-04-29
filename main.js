import init, { greet, resize_image } from 'wasm-image-editor'
import axios from 'axios'
init().then(x => {
    const uploadElement = document.querySelector('#image_upload')
    uploadElement.addEventListener('change', (e) => {
        if (e.target.files.length) {
            const fileUrl = URL.createObjectURL(e.target.files[0])
            axios.get(fileUrl, { responseType: 'blob'}).then(data => {
                return data.data.arrayBuffer()
            }).then(data => {
                const dataArray = new Uint8Array(data)
                const resizedImage = resize_image(dataArray, 0.5)
                console.log(resizedImage)
            })
        }
    })
    greet('foo bar baz')
})




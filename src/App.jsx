import {useState} from 'react'

function App() {
    const [file, setFile] = useState(null)
    const [Respon, setRespon] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0) // state baru untuk menampung persentase upload

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        const URL_UPLOAD = 'https://r2api.rezultroy.workers.dev/'
        const formData = new FormData()
        formData.append('file', file)

        // menggunakan XMLHttpRequest untuk mendapatkan event progress
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', URL_UPLOAD, true)

        // event listener untuk progress upload
        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                const percentComplete = Math.round((e.loaded / e.total) * 100)
                setUploadProgress(percentComplete) // update persentase upload
            }
        }

        xhr.onloadend = function() {
            if (xhr.status === 200) {
                const json = JSON.parse(xhr.response)
                setRespon(json)
                setIsSubmitting(false)
                setUploadProgress(0) // reset persentase upload
            }
        }

        xhr.send(formData)
    }

    const handleFileChange = event => {
        setFile(event.target.files[0])
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} disabled={isSubmitting} />
                <br />
                <button type="submit" disabled={isSubmitting}>Submit</button>
                {isSubmitting && <p>Upload progress: {uploadProgress}%</p>}
            </form>
            {Respon && (
                <>
                    <p>URL: {Respon.hello}</p>
                    <button onClick={() => {
                        navigator.clipboard.writeText(Respon.hello)
                    }}>Copy URL</button>
                </>
            )}
        </>
    )
}

export default App
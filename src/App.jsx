import {useState} from 'react'

function App() {
    const [file, setFile] = useState(null)


    const handleSubmit = (event) => {
        event.preventDefault()
        const URL_UPLOAD = 'https://r2api.rezultroy.workers.dev/'
        // gunakan put
        const formData = new FormData()
        formData.append('file', file)
        fetch(URL_UPLOAD, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.body)
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })

    }


  //   on onchange preview image
    const handleFileChange = event => {
        setFile(event.target.files[0])
    }



  return (
    <>
    <form onSubmit={(event)=> {
        handleSubmit(event)
    }}>

        <input type="file" onChange={handleFileChange} />
        <br />
        {file && <img src={URL.createObjectURL(file)} alt="preview" width="200" />}
        <br />
      <button type="submit">Submit</button>
    </form>
    </>
  )

}

export default App




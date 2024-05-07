import { useState } from "react";
import logo from "./assets/logo.png";
import "./home.css";
import fileIcon from './assets/file.svg'
import up from './assets/up.svg'
import copy from './assets/copy.svg'
import ProgressBar from "./progress";


function App() {
  const [file, setFile] = useState(null);
  const [Respon, setRespon] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // state baru untuk menampung persentase upload

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const URL_UPLOAD = "https://r2api.rezultroy.workers.dev/";
    const formData = new FormData();
    formData.append("file", file);

    // menggunakan XMLHttpRequest untuk mendapatkan event progress
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", URL_UPLOAD, true);

    // event listener untuk progress upload
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const percentComplete = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(percentComplete); // update persentase upload
      }
    };

    xhr.onloadend = function () {
      if (xhr.status === 200) {
        const json = JSON.parse(xhr.response);
        setRespon(json);
        setIsSubmitting(false);
        setUploadProgress(0); // reset persentase upload
      }
    };

    xhr.send(formData);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    setFileName(event.target.files[0].name)
  };

  return (
    <>
      <div className="main">
        <div className="logo">
          <img src={logo} alt="savefile" />
        </div>
        <div className="forms">
          <form onSubmit={handleSubmit}>
            <div className="file-up">
                <label htmlFor="fileUp">
                <div className="files-container">
               {file ?  <img src={fileIcon} alt="file" /> :  <img src={up} alt="up" />}
            </div>
                    {file? <p>{fileName}</p> :<p>Select file to upload</p>}
                </label>
            <input
                id="fileUp"
              type="file"
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
            </div>
            <br />
            {file? Respon? null: <button type="submit" id="submit" disabled={isSubmitting}>
              Submit
            </button>: null}
            {isSubmitting && <ProgressBar completed={uploadProgress} />}
          </form>
          {Respon && (
            <div className="url">
              <p>URL: {Respon.hello}</p>
              <img id="copy" src={copy} onClick={() => {
                  navigator.clipboard.writeText(Respon.hello);
                  alert("Url copied to clipboard")
                }} alt="copy" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import logo from "./assets/logo.png";
import "./home.css";
import fileIcon from "./assets/file.svg";
import up from "./assets/up.svg";
import copy from "./assets/copy.svg";
import ProgressBar from "./progress";
import toast, { Toaster } from "react-hot-toast";
import element from './assets/element.svg';
import open from './assets/open.svg';
import drop from './assets/drop.svg';

function App() {
  const [file, setFile] = useState(null);
  const [Respon, setRespon] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // state baru untuk menampung persentase upload
  const [isEmpty, setIsEmpty] = useState(true);
  const [isDrop,setIsDrop] = useState(false);
  const [size,setSize] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault();
    setFileName("Uploading");
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
        setFile(null)
        setFileName(`<b>Choose file</b> or drag it here`);
        setIsSubmitting(false);
        setSize(0);
        setUploadProgress(0); // reset persentase upload
      }
    };

    xhr.send(formData);
    if (!Respon) {
      setIsEmpty(true);
    }
  };

  const handleFileChange = (event) => {
    setIsEmpty(false);
    setFile(event.target.files[0]);
    setRespon(null);
    setSize(event.target.files[0].size);
    setFileName(event.target.files[0].name);
  };

  const handleDragOver = (event) =>{
    event.preventDefault();
    setIsDrop(true);
  }

  const handleDragLeave = (event) =>{
    event.preventDefault();
    setIsDrop(false);
  } 

  const handleDrop = (event) =>{
    event.preventDefault();
    setIsDrop(false);
    setIsEmpty(false);
    setSize(event.dataTransfer.files[0].size)
    setFile(event.dataTransfer.files[0]);
    setRespon(null);
    setFileName(event.dataTransfer.files[0].name);
  }

  const convertSize = (size) => {
    const units = ['bytes', 'KB', 'MB', 'GB'];
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    const sizeString = size.toFixed(2);
    const finalSize = parseFloat(sizeString).toString();

    return finalSize + ' ' + units[unitIndex];
}

  return (
    <>
      <div className="main">
        <div className="logo">
          <img src={logo} alt="savefile" />
        </div>
        <div className="forms">
        <img id="elemen1" src={element} alt="element" />
      <img id="elemen2" src={element} alt="element" />
          <form onSubmit={handleSubmit}>
            <div className="file-up">
              <label htmlFor="fileUp">
                <div className={isDrop? "files-container-drop":"files-container"}
                  onDragOver={isSubmitting? null : handleDragOver}
                  onDragLeave={isSubmitting ? null : handleDragLeave}
                  onDrop={isSubmitting ? null : handleDrop}
                >
                  {file ? isDrop ?  <img id="drop" src={drop} alt="drop" /> : (
                    isEmpty ? (
                      <img src={up} alt="up" />
                    ) : (
                      <img src={fileIcon} alt="file" />
                    )
                  ) : isDrop ?  <img id="drop" src={drop} alt="drop" /> : (
                    <img src={up} alt="up" />
                  )}
                  {file ?  (
                    <p  dangerouslySetInnerHTML={{__html: fileName}}></p>
                  ) : isDrop? <p>Release here</p> : (
                    <p><b>Choose file</b> or drag it here</p>
                  )}
                  {file ? isSubmitting ? null : <p id="size">{convertSize(size)}</p> : null}      
                </div>
              </label>
              <input
                id="fileUp"
                type="file"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
            </div>
            <br />
            {file ? (
              isEmpty ? null : (
                <button type="submit" id="upload" disabled={isSubmitting}>
                  Upload
                </button>
              )
            ) : null}
            {isSubmitting && <ProgressBar completed={uploadProgress} />}
          </form>
          {Respon && (
            <div
              className="url-container"
            >
              <Toaster position="top-left" />
              <p id="url">{Respon.hello}</p>
              <div>
              <img id="open" src={open} alt="open" onClick={()=>{
                window.open(Respon.hello, "_blank")
              }} />
              <img id="copy" src={copy} alt="copy" onClick={() => {
                navigator.clipboard.writeText(Respon.hello);
                toast.success("Url copied to clipboard", {
                  style: {
                    backgroundColor: "#543FD3",
                    color: "white",
                    fontFamily: "RubikReg",
                  },
                  id: "copys",
                });
              }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

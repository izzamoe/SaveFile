import logo from '../assets/logo.svg'
import circle from '../assets/circle.svg'
import lines from '../assets/lines.svg'
import file from '../assets/file.svg'
import up from '../assets/up.svg'
import '../style/download.css'

const Download = () =>{
    return (
        <div className='download-container'>
            <img id='circle' src={circle} alt="circle" />
            <img id='lines' src={lines} alt="lines" />
            <div className="file-container">
                <img id='logo' src={logo} alt="logo" />
                <div className="ready">
                    <p>Your File is <b>Ready!</b></p>
                </div>
                <div className="file">
                    <div className="file-info">
                        <img id="file-icon" src={file} alt="file" />
                        <div className="info">
                            <p>Name</p>
                            <p>22 January 2025</p>
                        </div>
                    </div>
                    <button className="download-btn">
                        Download
                    </button>
                </div>
                <button className="upload-btn">
                    <img src={up} alt="upload" id="up" />
                    Upload More
                </button>
            </div>
        </div>
    )
}

export default Download;
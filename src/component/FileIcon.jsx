import archive from '../assets/file-icon/archive.webp'
import audio from '../assets/file-icon/music.webp'
import binary from '../assets/file-icon/binary.webp'
import code from '../assets/file-icon/code.webp'
import document from '../assets/file-icon/doc.webp'
import image from '../assets/file-icon/image.webp'
import pdf from '../assets/file-icon/pdf.webp'
import present from '../assets/file-icon/present.webp'
import spreadsheet from '../assets/file-icon/speadsheet.webp'
import text from '../assets/file-icon/text.webp'
import video from '../assets/file-icon/video.webp'
import other from '../assets/file-icon/other.webp'

const icons = {
        "Archive" : archive,
        "Audio": audio,
        "Binary" : binary,
        "Code" : code,
        "Document" : document,
        "Image": image,
        "PDF" : pdf,
        "Presentation" : present,
        "Spreadsheet": spreadsheet,
        "Text": text,
        "Video": video,
}

export const displayIcon = (type) =>{
    const icon = icons[type]
    if(icon){
        return icon
    }else{
        return other
    }
}
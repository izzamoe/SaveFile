import { useNavigate } from "react-router-dom";

export function isLogin() {
    
    const navigate = useNavigate();

    var xhr = new XMLHttpRequest();

    xhr.open("GET",import.meta.env.VITE_AUTH_API_URL + "/me",true)
    xhr.withCredentials = true;
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem("token")}`);
    xhr.onloadend=function () {
        if (xhr.status == 200) {
            navigate("/")
        }else{
            return false
        }
    }
    
    xhr.send()
}
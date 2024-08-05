import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const xhr = new XMLHttpRequest();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    xhr.open("POST", import.meta.env.VITE_AUTH_API_URL + "/auth/login", true);
    xhr.onloadend = function () {
      if (xhr.status == 200) {
        const token = JSON.parse(xhr.response)
        localStorage.setItem("token",token.data.token)
      } else {
        const warn = JSON.parse(xhr.response);
        toast.error(warn.message, {
          duration: 3000,
          style: {
            backgroundColor: "#D52727",
            color: "white",
            fontFamily: "RubikReg",
          },
          id: "error",
        });
      }
    };

    var data = {
      username: username,
      password: password,
    };

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  };

  return (
    <>
      <Toaster position="top-right" />
      <div>
        <h1>Login.</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e)=>setUsername(e.target.value)} name="username" id="username" />
          <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" id="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  );
};

export default Login;

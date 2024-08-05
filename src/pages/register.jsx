import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const xhr = new XMLHttpRequest();

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != confirm) {
      toast.error("Password and confirm password !!", {
        duration: 3000,
        style: {
          backgroundColor: "#D52727",
          color: "white",
          fontFamily: "RubikReg",
        },
        id: "error",
      });
    }

    xhr.open(
      "POST",
      import.meta.env.VITE_AUTH_API_URL + "/auth/register",
      true
    );
    xhr.onloadend = function () {
      if (xhr.status == 200) {
        const msg = JSON.parse(xhr.response);
        toast.success(msg.data.message, {
          duration: 3000,
          style: {
            backgroundColor: "#5240D4",
            color: "white",
            fontFamily: "RubikReg",
          },
          id: "success",
        });
      } else {
        const warn = JSON.parse(xhr.response);
        toast.error("Register failed ! " + warn.message, {
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

    const data = {
      username: username,
      email: email,
      password: password,
    };

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
            name="username"
            id="username"
            placeholder="username"
          />
          <br></br>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            id="email"
            placeholder="email"
          />
          <br></br>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            name="password"
            placeholder="password"
            id="password"
          />
          <br></br>
          <input
            type="password"
            onChange={(e) => setConfirm(e.target.value)}
            required
            name="confirm-password"
            placeholder="confirm password"
            id="confirm"
          />
          <br></br>
          <input type="submit" value="Regis" />
        </form>
      </div>
    </>
  );
};

export default Register;

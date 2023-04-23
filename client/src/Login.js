import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import "./App.css";

import { useNavigate, NavLink } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user.errors) {
          login(user);
          navigate("/home");
        } else {
          setUsername("");
          setPassword("");
          setErrorsList(user.errors);
        }
      });
  }

  //   function handleGoogleLogin(e) {
  //     e.preventDefault();
  //     window.location.assign("/auth/google_oauth2"); // Change this to your OmniAuth Google OAuth2 path
  //   }

  //   function handleGoogleLogin(e) {
  //     e.preventDefault();
  //     fetch("/auth/google_oauth2")
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           throw new Error("Google OAuth login failed");
  //         }
  //       })
  //       .then((user) => {
  //         if (!user.errors) {
  //           login(user);
  //           navigate("/areas");
  //         } else {
  //           setUsername("");
  //           setPassword("");
  //           setErrorsList(user.errors);
  //         }
  //         console.log(user);
  //       })
  //       .catch((error) => {
  //         console.error("Error during Google OAuth login:", error);
  //         // Handle the error as needed (e.g., show an error message).
  //       });
  //   }

  return (
    <>
      <div className="login-page">
        <div className="login-form-container">
          <p className="app-name">protocol 6</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <span style={{ fontWeight: "bold" }}>Login:</span>
            <br />
            <input
              id="username"
              label="Username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <br />
            <input
              label="Password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input type="submit" value="login" />
          </form>
          {errorsList.map((err) => (
            <li style={{ color: "red" }} key={err}>
              {err}
            </li>
          ))}
          <p3>or</p3>
          <br />
          <a
            href="https://protocol-6.onrender.com/auth/google_oauth2"
            className="google-login-btn"
          >
            <img
              src="https://developers.google.com/static/identity/images/btn_google_signin_light_normal_web.png"
              alt="Sign in with Google"
            />
          </a>
          <NavLink to={"/signup"}>
            {" "}
            <p>create an account</p>
          </NavLink>
        </div>
        <div className="photo-container">
          <img src="" />
        </div>
      </div>
    </>
  );
}

export default Login;

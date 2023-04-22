import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const { signup } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user.errors) {
          signup(user);
          navigate("/areas");
        } else {
          setUsername("");
          setPassword("");
          setPasswordConfirmation("");
          setErrorsList(user.errors);
        }
      });
  }

  return (
    <div>
      <p className="about">protocol 6</p>
      <form onSubmit={handleSubmit}>
        <span style={{ fontWeight: "bold" }}>Create Account:</span>
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
        <br />
        <input
          label="Password Confirmation"
          type="password"
          placeholder="confirm password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        ></input>
        <br />
        <input type="submit" value="signup" />
      </form>
      {errorsList.map((err) => (
        <li style={{ color: "red" }} key={err}>
          {err}
        </li>
      ))}
    </div>
  );
}

export default Signup;

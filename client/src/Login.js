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
          navigate("/boards");
        } else {
          setUsername("");
          setPassword("");
          setErrorsList(user.errors);
        }
        console.log(user);
      });
  }

  return (
    <>
      <div>
        <p className="about">
          In a world where imagination knows no bounds, the beauty of
          inspiration lies in sharing it with others. inpso.group provides a
          unique platform for individuals to connect, explore and discover
          inspiration from a global community. The app encourages users to share
          their visions, creating a collective pool of ideas and creativity that
          transcends boundaries. The power of a great idea is amplified by the
          diverse perspectives and energy of inpso.group, enabling concepts to
          take on a life of their own and evolve into something even greater
          than their creators imagined. As we continue to explore and shape the
          possibilities of the world around us, inpso.group remains a hub for
          collaboration and inspiration, where individuals can collectively push
          the boundaries of creativity and bring their dreams to life.
        </p>
        <form onSubmit={handleSubmit}>
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
        <NavLink to={"/signup"}>
          {" "}
          <p>create an account</p>
        </NavLink>
      </div>
    </>
  );
}

export default Login;

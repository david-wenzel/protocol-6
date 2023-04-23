import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import "./App.css";
// import { NavLink} from "react-router-dom";

function Navbar() {
  const { user, logout, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  function logoutUser() {
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      logout();
      navigate("/login");
    });
  }

  if (loggedIn) {
    return (
      <div className="navbar">
        <NavLink to={"/home"}>
          <h1>
            <img className="spin" src="" alt="Inspo.Group" />
          </h1>
        </NavLink>
        <NavLink to={"/mysaved_protocols"}>
          <button>Saved Protocols</button>
        </NavLink>
        {/* <h3>Hello {user.username}</h3> */}
        <button id="logout" onClick={logoutUser}>
          Logout {user.username}
        </button>
        {/* <NavLink to="/"> */}
        {/* <button>Home</button> */}
        {/* </NavLink> */}
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <NavLink to={"/login"}>
          <h1>
            <img className="" src="" alt="Inspo.Group" />
          </h1>
        </NavLink>
        {/* <NavLink to="/login"> */}
        {/* <button>Login</button> */}
        {/* </NavLink> */}
        {/* <NavLink to="/signup"> */}
        {/* <button>Signup</button> */}
        {/* </NavLink> */}
      </div>
    );
  }
}

export default Navbar;

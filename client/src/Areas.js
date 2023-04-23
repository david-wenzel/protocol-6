import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink } from "react-router-dom";
import "./App.css";

// import BoardCard from "./BoardCard";

function Areas({ areas }) {
  const { loggedIn } = useContext(UserContext);

  const renderAreas = areas.map((area) => (
    <li key={area.id}>
      <NavLink to={`/home/${area.id}`}>
        <h1 id="section">{area.title}</h1>
      </NavLink>
    </li>
  ));

  if (loggedIn) {
    return <div className="area-list">{renderAreas}</div>;
  } else {
    return (
      <div>
        <h3>Please Login or Signup</h3>
      </div>
    );
  }
}

export default Areas;

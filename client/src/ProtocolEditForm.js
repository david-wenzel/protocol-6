import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "./context/user";
import "./App.css";

export default function ProtocolEditForm({
  protocol,
  handleEditProtocol,
  handleEditClick,
}) {
  const { user } = useContext(UserContext);

  const initialValues = {
    img_url: protocol.img_url,
    protocol_body: protocol.body,
    title: protocol.title,
    area_id: protocol.area_id,
    user_id: user.id,
  };
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/protocols/${protocol.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((r) => r.json())
      .then((data) => handleEditProtocol(data));

    handleEditClick();
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="img_url"
            placeholder={protocol.img_url}
            value={values.img_url}
            onChange={handleChange}
          />
          <input
            type="text"
            name="body"
            placeholder={protocol.body}
            value={values.body}
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            placeholder={protocol.title}
            value={values.title}
            onChange={handleChange}
          />
          <input type="submit" value="Submit Changes" />
        </form>
      </div>
    </div>
  );
}

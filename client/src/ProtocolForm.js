import { useState, useContext } from "react";
import { UserContext } from "./context/user";
import "./App.css";

export default function ProtocolForm({ id, addProtocol, errorsList }) {
  const { user } = useContext(UserContext);

  const initialValues = {
    img_url: "",
    post_body: "",
    board_id: id,
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
    addProtocol(values);
    setValues(initialValues);
  }

  return (
    <div>
      <form id="postForm" onSubmit={handleSubmit} autoComplete="off">
        <label>
          <span>Add New Protocol:</span>
          <br />
          <input
            className="form-input"
            type="text"
            name="img_url"
            placeholder="img_url"
            value={values.img_url}
            onChange={handleChange}
          />
          <br />
          <input
            className="form-input"
            type="text"
            name="post_body"
            placeholder="post_body"
            value={values.post_body}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="+" />
      </form>
      {errorsList &&
        errorsList.map((err) => (
          <li style={{ color: "red" }} key={err}>
            {err}
          </li>
        ))}
    </div>
  );
}

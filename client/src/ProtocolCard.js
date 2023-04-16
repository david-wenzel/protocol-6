import { useState, useContext } from "react";
import { UserContext } from "./context/user";
import "./App.css";

// import { useState } from 'react';
// import ProtocolEditForm from "./ProtocolEditForm";

export default function ProtocolCard({
  protocol,
  handleEditProtocol,
  deleteProtocol,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useContext(UserContext);

  function handleEditClick() {
    setIsEdit(!isEdit);
  }

  function handleDeleteClick(e, protocol) {
    e.preventDefault();
    // console.log(protocol)
    deleteProtocol(protocol);
  }

  const renderProtocol = (
    <div key={protocol.id}>
      <img src={protocol.img_url} alt="" />
      <p className="protocolBody">{protocol.body}</p>
      {/* <button id='deleteBtn'
onClick={(e) => handleDeleteClick(e, protocol)}
>X</button> /}
{/ <ProtocolEditForm protocol={protocol} handleEditProtocol={handleEditProtocol} /> */}
      <button id="editBtn" onClick={(e) => handleEditClick(e, protocol)}>
        Edit
      </button>
    </div>
  );

  const renderEditProtocol = (
    <div key={protocol.id}>
      <img src={protocol.img_url} alt="" />
      <p className="protocolBody">{protocol.body}</p>
      <button id="deleteBtn" onClick={(e) => handleDeleteClick(e, protocol)}>
        X
      </button>
      <br />
      {/* <ProtocolEditForm
        protocol={protocol}
        handleEditProtocol={handleEditProtocol}
        handleEditClick={handleEditClick}
      /> */}
      <button id="editBtn" onClick={(e) => handleEditClick(e, protocol)}>
        Edit
      </button>
    </div>
  );

  const renderNotUserProtocol = (
    <div key={protocol.id}>
      <img src={protocol.img_url} alt="" />
      <p className="protocolBody">{protocol.body}</p>
    </div>
  );

  return (
    <div className="area">
      {protocol.user_id !== user.id ? (
        renderNotUserProtocol
      ) : isEdit ? (
        <>{renderEditProtocol}</>
      ) : (
        <>{renderProtocol}</>
      )}
    </div>
  );
}

import { useState, useContext } from "react";
import { UserContext } from "./context/user";
import "./App.css";

// import { useState } from 'react';

export default function ProtocolCard({ protocol }) {
  const { user } = useContext(UserContext);

  const renderProtocol = (
    <div key={protocol.id}>
      <h1>{protocol.title}</h1>
      <img src={protocol.img_url} alt="" />
      <p className="protocolBody">{protocol.body}</p>
      {/* <button id='deleteBtn'
onClick={(e) => handleDeleteClick(e, protocol)}
>X</button> /}
{/ <ProtocolEditForm protocol={protocol} handleEditProtocol={handleEditProtocol} /> */}
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
      <>{renderProtocol}</>
    </div>
  );
}

import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import { useParams } from "react-router-dom";
import "./App.css";

import ProtocolCard from "./ProtocolCard";
import ProtocolForm from "./ProtocolForm";

export default function Protocols({
  areas,
  addProtocol,
  deleteProtocol,
  handleEditProtocol,
  saveProtocol,
  errorsList,
}) {
  const [currentArea, setCurrentArea] = useState({ protocols: [] });
  //   const [errorsList, setErrorsList] = useState([]);
  const { loggedIn } = useContext(UserContext);

  const params = useParams();
  const parsedId = parseInt(params.id);

  useEffect(() => {
    const foundArea = areas.find(({ id }) => id === parsedId);
    setCurrentArea(foundArea);
  }, [areas, parsedId]);

  let protocols = [];
  if (currentArea && currentArea.protocols) {
    protocols = currentArea.protocols.map((protocol) => protocol);
  }

  let renderProtocols;
  if (protocols) {
    renderProtocols = protocols.map((protocol) => (
      <ProtocolCard
        key={protocol.id}
        protocol={protocol}
        handleEditProtocol={handleEditProtocol}
        deleteProtocol={deleteProtocol}
        saveProtocol={saveProtocol}
      />
    ));
  }

  if (loggedIn && currentArea && currentArea.title) {
    return (
      <div>
        <h1 className="title">{currentArea.title}</h1>
        <ProtocolForm
          id={parsedId}
          addProtocol={addProtocol}
          errorsList={errorsList}
        />
        <br />
        {renderProtocols}
      </div>
    );
  } else {
    return (
      <div>
        <h3>404 board not found</h3>
      </div>
    );
  }
}

import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import ProtocolCard from "./ProtocolCard";

export default function SavedProtocols({
  areas,
  savedProtocols,
  deleteProtocol,
}) {
  const { loggedIn } = useContext(UserContext);

  // Create a protocolLookup object to map protocol_id to protocol object
  const protocolLookup = areas.reduce((lookup, area) => {
    area.protocols.forEach((protocol) => {
      lookup[protocol.id] = protocol;
    });
    return lookup;
  }, {});

  let renderProtocols;
  if (savedProtocols) {
    renderProtocols = savedProtocols.map((savedProtocol) => {
      const protocol = protocolLookup[savedProtocol.protocol_id];
      return (
        <ProtocolCard
          key={protocol.id}
          protocol={protocol}
          deleteProtocol={deleteProtocol}
        />
      );
    });
  }

  if (loggedIn) {
    return (
      <div>
        <h1 className="title">Saved Protocols</h1>
        <br />
        {renderProtocols}
      </div>
    );
  } else {
    return (
      <div>
        <h3>You need to be logged in to view saved protocols</h3>
      </div>
    );
  }
}
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import SavedProtocolCard from "./SavedProtocolCard";

export default function SavedProtocols({
  areas,
  savedProtocols,
  fetchSavedProtocols,
}) {
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    if (loggedIn) {
      fetchSavedProtocols();
    }
  }, [loggedIn, fetchSavedProtocols]);

  let protocolLookup = {};
  if (areas) {
    // Create a protocolLookup object to map protocol_id to protocol object
    protocolLookup = areas.reduce((lookup, area) => {
      area.protocols.forEach((protocol) => {
        lookup[protocol.id] = protocol;
      });
      return lookup;
    }, {});
  }

  let renderProtocols;
  if (savedProtocols) {
    renderProtocols = savedProtocols.map((savedProtocol) => {
      const protocol = protocolLookup[savedProtocol.protocol_id];
      if (protocol) {
        return <SavedProtocolCard key={protocol.id} protocol={protocol} />;
      } else {
        return null;
      }
    });
  } else {
    renderProtocols = null; // add this line to handle case where savedProtocols is undefined
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

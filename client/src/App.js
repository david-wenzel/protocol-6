import { UserProvider } from "./context/user";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Areas from "./Areas";
import Protocols from "./Protocols";
import Signup from "./Signup";
import SavedProtocols from "./SavedProtocols";
import "./App.css";

function App() {
  const [areas, setAreas] = useState([]);
  const [errorsList, setErrorsList] = useState([]);
  const [savedProtocols, setSavedProtocols] = useState([]);

  useEffect(() => {
    fetch("/areas")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data);
      });
  }, []);

  useEffect(() => {
    fetch("/saved_protocols")
      .then((res) => res.json())
      .then((data) => {
        setSavedProtocols(data);
        console.log("saved:", { data });
      });
  }, []);

  function addProtocol(protocol) {
    fetch("/protocols", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(protocol),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          // Find the board in the boards state that matches the board of the new post
          const updatedAreas = areas.map((area) => {
            if (area.id === data.area.id) {
              // Add the new post to the posts of the matching board
              return {
                ...area,
                protocols: [...area.protocols, data],
              };
            } else {
              setErrorsList(data.errors);
              return area;
            }
          });

          setAreas(updatedAreas);
        } else {
          setErrorsList(data.errors);
        }
      });
  }

  function deleteProtocol(protocol) {
    fetch(`/protocols/${protocol.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        // Remove the deleted post from the posts array of the matching board
        const updatedAreas = areas.map((area) => {
          if (area.id === parseInt(protocol.area_id)) {
            return {
              ...area,
              protocols: area.protocols.filter((p) => p.id !== protocol.id),
            };
          } else {
            return area;
          }
        });
        setAreas(updatedAreas);
      }
    });
  }

  function saveProtocol(protocol_id) {
    fetch("/saved_protocols", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ protocol_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setSavedProtocols([...savedProtocols, data]);
        } else {
          setErrorsList(data.errors);
        }
      });
  }

  return (
    <div className="App">
      <UserProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route
              path="/home"
              element={
                <Areas
                  // errorsList={errorsList}
                  areas={areas}
                />
              }
            />
            <Route
              path="/home/:id"
              element={
                <Protocols
                  errorsList={errorsList}
                  deleteProtocol={deleteProtocol}
                  // handleEditProtocol={handleEditProtocol}
                  saveProtocol={saveProtocol}
                  addProtocol={addProtocol}
                  areas={areas}
                />
              }
            />
            <Route
              path="/mysaved_protocols"
              element={
                <SavedProtocols
                  // handleEditProtocol={handleEditProtocol}
                  savedProtocols={savedProtocols}
                  areas={areas}
                />
              }
            />
            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;

import { UserProvider } from "./context/user";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from "./NavBar";
import Login from "./Login";
import Areas from "./Areas";
import Protocols from "./Protocols";
import Signup from "./Signup";

function App() {
  const [areas, setAreas] = useState([]);
  const [errorsList, setErrorsList] = useState([]);

  useEffect(() => {
    fetch("/areas")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data);
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

  return (
    <div className="App">
      <UserProvider>
        {/* <NavBar /> */}
        <Router>
          <Routes>
            <Route
              path="/areas"
              element={
                <Areas
                  // errorsList={errorsList}
                  areas={areas}
                />
              }
            />
            <Route
              path="/areas/:id"
              element={
                <Protocols
                  errorsList={errorsList}
                  // deleteProtocol={deleteProtocol}
                  // handleEditProtocol={handleEditProtocol}
                  addProtocol={addProtocol}
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

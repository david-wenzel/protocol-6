import { UserProvider } from "./context/user";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from "./NavBar";
import Login from "./Login";
import Areas from "./Areas";

function App() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetch("/areas")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data);
      });
    console.log(areas);
  }, []);

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
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;

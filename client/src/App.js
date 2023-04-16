import { UserProvider } from "./context/user";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from "./NavBar";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <UserProvider>
        {/* <NavBar /> */}
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;

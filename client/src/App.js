import { UserProvider } from "./context/user";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavBar />
        <Router>
          <Routes>
            <Route
              path="/areas"
              element={
                <Boards
                  errorsList={errorsList}
                  boards={boards}
                  addBoard={addBoard}
                />
              }
            />
            <Route
              path="/areas/:id"
              element={
                <Posts
                  errorsList={errorsList}
                  deletePost={deletePost}
                  handleEditPost={handleEditPost}
                  addPost={addPost}
                  boards={boards}
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

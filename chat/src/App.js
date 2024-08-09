import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Views/Login/Login";
import Home from "./Views/Home/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router /*basename="/chat/dist_react/index.html"*/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import Favorites from "./components/Favorites/Favorites";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";

const App = () => {
  const location = useLocation();
  const hideNavOnRoutes = ["/", "/signup", "/login"];

  return (
    <div className="App">
      {hideNavOnRoutes.includes(location.pathname) ? null : <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;

import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { Login } from "./page/login/Login";
import { Route, Routes } from "react-router-dom";
import { Register } from "./page/register/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

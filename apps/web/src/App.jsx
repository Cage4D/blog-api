import "../styles.css";
import Home from "./Home";
import React from "react";
import SignUp from "./Signup";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

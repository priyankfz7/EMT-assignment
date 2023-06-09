import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import EditorPage from "../Pages/EditorPage";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor/:roomId" element={<EditorPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AllRoutes;

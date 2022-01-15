import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "../components/NotFound";
import Login from "../auth/Login";
import Register from "../auth/Register";

const PublicRuta = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default PublicRuta;

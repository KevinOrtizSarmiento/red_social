import React from "react";
import { Route, Routes } from "react-router-dom";
import Follow from "../components/Follow";

import NotFound from "../components/NotFound";
import EditProfile from "../views/EditProfile";
import Favoritos from "../views/Favoritos";
import Friends from "../views/Friends";
import FriendsProfile from "../views/FriendsProfiles";
import Home from "../views/Home";
import Perfil from "../views/Perfil";
const PrivateRuta = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me/:type" element={<Follow/>}/>
        <Route path="/favoritos" element={<Favoritos/>}/>
        <Route path="/friends/profile/:id" element={<FriendsProfile />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/profile" element={<Perfil />} />
        <Route path="/edit/profile/:id" element={<EditProfile/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default PrivateRuta;

import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { checkUser } from "../redux/apiCalls/authApiCalls";
import { useDispatch } from "react-redux";
const REACT_APP_HOST = process.env.REACT_APP_HOST

const Menu = ({ id, getNote, idPublicacion }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const own = currentUser._id;
  const eliminar = async (e) => {
    e.preventDefault();
    await axios
      .delete(REACT_APP_HOST + "/nota/eliminar/" + idPublicacion)
      .then((res) => {
        getNote();
      })
      .catch((error) => {});
  };
  const favorito = async (e) => {
    e.preventDefault();
    await axios
      .post(REACT_APP_HOST + "/cliente/save/me/favorite", {
        idPublicacion: idPublicacion,
        id: own,
      })
      .then((res) => {
        checkUser(dispatch);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="menu-puntos">
      
      <button
        class="nav-link buton "
        id="navbarDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i
          style={{ fontSize: "1.5rem" }}
          class="bi i-NavBar bi-three-dots-vertical"
        ></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <div>
          <button
            style={{
              display: "block",
              textDecoration: "none",
              color: "#000",
              paddingTop: "0.3rem",
              paddingBottom: "0.2rem",
              paddingLeft: "1rem",
            }}
            onClick={favorito}
            id="logout"
            class="dropdown-item"
          >
            {currentUser.favoritos?.includes(idPublicacion) ? (
              <i class="bi bi-bookmark-x-fill"></i>
            ) : (
              <i class="bi bi-bookmark-fill"></i>
            )}{" "}
            {currentUser.favoritos?.includes(idPublicacion)
              ? "Eliminar nota de guardados"
              : "Guardar Nota"}
          </button>
          <button
            style={{
              display: "block",
              textDecoration: "none",
              color: "#000",
              paddingTop: "0.3rem",
              paddingBottom: "0.2rem",
              paddingLeft: "1rem",
            }}
            id="logout"
            class="dropdown-item"
            to="/profile"
          >
            <i class="bi bi-exclamation-octagon-fill"></i> Denunciar
          </button>
        </div>
        {own === id ? (
          <button
            onClick={eliminar}
            style={{
              display: "block",
              textDecoration: "none",
              color: "#000",
              paddingLeft: "1rem",
            }}
            id="logout"
            class="dropdown-item"
          >
            <i class="bi bi-trash-fill"></i> Eliminar
          </button>
        ) : null}
      </ul>
    </div>
  );
};

export default Menu;

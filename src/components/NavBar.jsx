import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls/authApiCalls";
import { useNavigate } from "react-router";
import "./style/styles.css";

const NavBar = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const cerrar = (e) => {
    e.preventDefault();
    logout(dispatch);
    navigate("/");
  };
  return (
    <header id="nef" className=" nav-nav  ">
      <div
        id="tex"
        className="container d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <NavLink id="academica" className="navbar-brand " to={"/"}>
         Academica
        </NavLink>
        {currentUser?<NavLink style={{color:'black'}} className="amigos nav-link" to="/friends">Amigos</NavLink>:null}
        {currentUser ? (
          <ul id="navKevin">
            <NavLink to={"/profile"}>
              {currentUser.img ? (
                <img
                  style={{ borderRadius: "40px", marginTop: "8px" }}
                  width="40px"
                  height="40px"
                  src={currentUser.img}
                  alt=""
                />
              ) : (
                <div class="spinner-grow text-light" role="status" />
              )}
            </NavLink>
            <button
              class="nav-link buton "
              id="navbarDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi i-NavBar bi-caret-down-fill"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink
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
                Perfil
              </NavLink>
              <li className="li">
                <hr class="dropdown-divider" />
              </li>
              <button
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "#000",
                  paddingLeft: "1rem",
                }}
                id="logout"
                class="dropdown-item"
                onClick={cerrar}
              >
                Cerrar sesion
              </button>
            </ul>
          </ul>) : null}
      </div>
    </header>
  );
  
};
export default NavBar;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux"
import "./styles/friends.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const REACT_APP_HOST = process.env.REACT_APP_HOST
const Friends = () => {
  const {currentUser} = useSelector((state)=>state.auth)
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [load, setLoad] = useState(true);

  const filtrar = (terminoBusqueda) => {
    // eslint-disable-next-line array-callback-return
    var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.last
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
  };
  const obtener = async () => {
    await axios
      .get(REACT_APP_HOST+"/cliente/obtener")
      .then((res) => {
        setUsuarios(res.data);
        setTablaUsuarios(res.data);
        setLoad(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  useEffect(() => {
    obtener();
  }, []);
  return (
    <div  className="container friends">
      <input
        value={busqueda}
        onChange={handleChange}
        type="text"
        id="serach"
        className="form-control  me-2 "
        placeholder="Buscar"
      />
      <div>
          {load?<Skeleton count={10} className="skeleton-list"/>:null}
        {usuarios.map((i) => {
          return (
            <div key={i._id}>
              {currentUser._id===i._id?null:<NavLink className="list" to={"/friends/profile/" + i._id} >
              {i.name + " " + i.last}
              
            </NavLink>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/perfil.css";
import axios from "axios"
import { checkUser } from "../redux/apiCalls/authApiCalls"
import "react-loading-skeleton/dist/skeleton.css";
import Menu from "../components/Menu";
import { NavLink } from "react-router-dom";
const REACT_APP_HOST = process.env.REACT_APP_HOST
const Perfil = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth);
  const des = currentUser.des
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const obtener = async ()=> {
    await axios.get(REACT_APP_HOST+"/nota/buscar/"+currentUser._id).then(res=> {
      setData(res.data)
    }).catch(error=> {
      console.log(error)
    })
  }
  
  useEffect(() => {
    obtener()
    setTimeout(() => {
      setLoad(false);
      checkUser(dispatch) 
    }, 1500);
  }, []);
  return (
    <div style={{ minHeight: "800px" }} className="container">
      {!load ? (
        <div>
          {currentUser.imgTable?
            <img
              src={currentUser.imgTable}
              style={{ borderRadius: " 20px 20px 0 0px", marginTop: "1rem" }}
              width="100%"
              className="img-fluid"
              height="50%"
              alt=""
            />:<div className="banner"></div>}
          <img
            src={currentUser.img}
            className="perfilPhoto"
            alt=""
          />
        </div>
      ) : (
        <div>
          <div
            className="bannerLoad"
          />
          <div
            className="perfilLoad"
          />
        </div>
      )}
      <div className="info-width">
        <div className="info">
          <h2 className="informacion">Informacion</h2>
          <h5>
            <i class="bi bi-person-fill"></i>{" "}
            {currentUser.name + " " + currentUser.last}
          </h5>
          <h5>
            <i class="bi bi-envelope-fill"></i> {currentUser.email}
          </h5>
          <h5><i class="bi bi-gender-ambiguous"></i> {currentUser.genero?currentUser.genero:"Genero indefinido"}</h5>
          <h5><i class="bi bi-bookmarks-fill"></i><NavLink className="favorite-link" to="/favoritos"> Favoritos</NavLink></h5>
          <h5>
            <i class="bi bi-people-fill"></i><NavLink className="favorite-link" to="/me/followers"> Seguidores</NavLink>:{" "}
            {currentUser.followers.length}
            
          </h5>
          <h5>
            <i class="bi bi-people-fill"></i><NavLink className="favorite-link" to="/me/following"> Siguiendo</NavLink>:{" "}
            {currentUser.following.length}
          </h5>
          <h4>Descripcion</h4>
          <h6>{des.length>0?des:"Añade una descripcion"}</h6>
          <NavLink to={"/edit/profile/"+currentUser._id}><button className="btn b btn-success">Editar Perfil</button></NavLink>
          
        </div>
      </div>
      {data.map(i=>{
        return(
          <div className="note" key={i._id}>
            <div className="note-cont">
                <h5>{i.names}</h5>
                <p>{i.info}</p>
                </div>
                <Menu id={i.autor} getNote={obtener} idPublicacion={i._id}/>
              </div>
        )
      })}

    </div>
  );
};

export default Perfil;

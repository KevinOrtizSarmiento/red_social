import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {useDispatch } from "react-redux";
import "./styles/friendsProfile.css";
import { checkUser } from "../redux/apiCalls/authApiCalls"
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import Menu from "../components/Menu";
const REACT_APP_HOST = process.env.REACT_APP_HOST
const FriendsProfiles = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState([]);
  const [loadFollow, setLoadFollow] = useState(false);
  const [loadunFollow, setLoadunFollow] = useState(false);
  const [loadInfo, setLoadInfo] = useState(true);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  const buscar = async () => {
    await axios
      .get(REACT_APP_HOST+"/cliente/obtener/" + id)
      .then((res) => {
        setUser(res.data);
        setLoadInfo(false);
      })
      .catch((error) => {
        
      });
  };
  const unfollower = async (e) => {
    setLoadunFollow(true)
    await axios.put(REACT_APP_HOST+"/cliente/unfollow", {
      eliminarSeguidor: currentUser._id,
      personaAnoSeguir: id,
    }).then(res=>{
      
        buscar();
        checkUser(dispatch)
        setLoadunFollow(false)
    }).catch(error=> {
      setLoadFollow(false)
    })
  }
  const follower = async (e) => {
    e.preventDefault();
    setLoadFollow(true)
    await axios
      .put(REACT_APP_HOST+"/cliente/follow", {
        nuevoSeguidor: currentUser._id,
        personaAseguir: id,
      })
      .then((res) => {
        
        buscar();
        checkUser(dispatch)
        setLoadFollow(false)
      })
      .catch((error) => {
        
        setLoadFollow(false)
      });
  };
  const obtener = async ()=> {
    await axios.get(REACT_APP_HOST+"/nota/buscar/"+id).then(res=> {
      setData(res.data)
    }).catch(error=> {
      
    })
  }
  useEffect(() => {
    buscar();
    obtener()
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, []);
  return (
    <div className="friendsProfiles container">
      <div style={{ minHeight: "800px" }} className="container">
        {!load ? (
          <div>
            {user.imgTable ? (
              <img
                src={user.imgTable}
                style={{ borderRadius: " 20px 20px 0 0px", marginTop: "1rem" }}
                width="100%"
                className="img-fluid"
                height="50%"
                alt=""
              />
            ) : (
              <div
                className="banner"
              ></div>
            )}
            <img
              src={user.img}
              className="perfilPhoto"
              alt=""
            />
            {currentUser._id !== id  ? (
              <div style={{ float: "right",margin: "1.3rem 2rem 0"}}>
                {user.followers?.includes(currentUser._id)? (
                  <button
                    style={{ float: "right", width:'15rem' }}
                    onClick={unfollower}
                    isabled={loadunFollow?"true":""}
                    className="btn btn-primary"
                  >
                   {loadunFollow?<div class="spinner-border" role="status"/>:"Dejar de seguir"}
                  </button>
                ) : (
                  <button
                    style={{ float: "right",  width:'15rem' }}
                    onClick={follower}
                    disabled={loadFollow?"true":""}
                    className="btn btn-primary"
                  >
                    {loadFollow?<div class="spinner-border" role="status"/>:"Seguir"}
                  </button>
                )}
              </div>
            ) : null}
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
        {loadInfo ? (
          <div >
            <div className="infoVisit">
              <h2 className="informacion">Informacion</h2>
              <h5>
                <Skeleton className="skeleton-Friend" />
              </h5>
              <h5>
                <Skeleton className="skeleton-Friend" />
              </h5>
              <h5>
                <Skeleton className="skeleton-Friend" />
              </h5>
              <h5>
                <Skeleton className="skeleton-Friend" />
              </h5>
            </div>
          </div>
        ) : (
          <div className="infoVisit" style={{ display: "flex" }}>
            <div >
              <h2 className="informacion">Informacion</h2>
              <h5>
                <i class="bi bi-person-fill"></i> {user.name + " " + user.last}
              </h5>
              <h5>
                <i class="bi bi-envelope-fill"></i> {user.email}
              </h5>
              <h5><i class="bi bi-gender-ambiguous"></i> {user.genero?user.genero:"Genero indefinido"}</h5>
              <h5>
                <i class="bi bi-people-fill"></i> Seguidores:{" "}
                {user.followers ? user.followers.length : "Cargando..."}
              </h5>
              <h5>
                <i class="bi bi-people-fill"></i> Siguiendo:{" "}
                {user.following ? user.following.length : "Cargando..."}
              </h5>
            </div>
            
          </div>
          
        )}
            {data.map(i=>{
        return(
          <div className="note" key={i._id}>
            <div className="note-cont">
                <h5>{i.names}</h5>
                <p>{i.info}</p>
                </div>
                <Menu id={i.autor}/>
              </div>
        )
      })}
      </div>
      
    </div>
  );
};

export default FriendsProfiles;

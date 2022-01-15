import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles/home.css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Menu from "../components/Menu";
import Comentarios from "../components/Comentarios";
const REACT_APP_HOST = process.env.REACT_APP_HOST
const Home = () => {
  const [nota, setNota] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [showC, setShowC] = useState(false);
  const [error, setError] = useState(false)
  const [showId, setShowId] = useState("");
  let date = new Date();
  let day = `${date.getDate()}`.padStart(2, "0");
  let month = `${date.getMonth() + 1}`.padStart(2, "0");
  let year = date.getFullYear();
  var fecha = `Dia: ${day} - Mes: ${month} - Año: ${year}`;
  //implementar comentarios
  const { currentUser } = useSelector((state) => state.auth);
  const openComents = (id) => {
    setShowC(true);
    setShowId(id);
  };
  const closeComents = () => {
    setShowC(false);
    setShowId("");
  };
  const newNote = async (e) => {
    e.preventDefault();
    const autor = currentUser._id;
    if(nota.trim().length<=0 || nota.length>120){
      setError(true)
    }else{
      setError(false)
    await axios
      .post(REACT_APP_HOST + "/nota/new", {
        autor: autor,
        names: currentUser.name + " " + currentUser.last,
        info: nota.trim(),
        fecha: fecha,
        imgNota:currentUser.img
      })
      .then((res) => {
        setNota("");
        getNote();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const like = async (idP) => {
    await axios
      .put(REACT_APP_HOST + "/nota/like", {
        id: currentUser._id,
        idPublicacion: idP,
      })
      .then((res) => {
        getNote();
        
      })
      .catch((error) => {
        console.log(error);
        
      });
  };
  const getNote = async () => {
    await axios
      .get(REACT_APP_HOST + "/nota/find")
      .then((res) => {
        setData(res.data);
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getNote();
  }, []);
  return (
    <div className="nota">
      
      <div className="name-me">
        <h5>Crear Nota</h5>
        <div className="nota-me-p">
        <i className="bi i-nota bi-person-fill"></i>{" "}
        <h5 id="name-me-name"> {currentUser.name + " " + currentUser.last}</h5>
        </div>
      </div>
      <div className="form-floating area-nota ">
        <textarea
          className={error?"form-control is-invalid nota-min":"form-control nota-min"}
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Escribe algo..."
          id="floatingTextarea2"
          
        ></textarea>
        <label>Escribe algo...</label>
      </div>
      <p className="limit-nota">*Maximo 120 caracteres*</p>
      <p className="limit-nota">{nota.length+"/120"}</p>
      <button
        onClick={newNote}
        className="btn btn-success boton"
        disabled={nota.trim().length<=0 || nota.trim().length>120?"true":""}
      >
        Publicar
      </button>
      <div className="nota-content">
        {load ? (
          <div>
            <h3>
              <Skeleton count={7} width="100%" height="12rem" />
            </h3>
            <h5>
              <Skeleton count={7} width="100%" height="12rem" />
            </h5>
          </div>
        ) : null}
        {data.length === 0 ? "No hay notas" : null}
        {data.map((i) => {
          return (
            <div className="note" key={i._id}>
              <div className="note-cont">
                <div style={{display:'flex'}}><img className="comentario-perfil-photo" src={i.imgNota} alt="" /><h5 className="name">{i.names}</h5></div>
                <p className="text-principal">{i.info}</p>
                <div className="borrar">
                  {i.reaction ? "(" + i.reaction.length + ") " : "cargando..."}
                  <button className="reaction-btn" onClick={() => like(i._id)}>
                    <div>
                      {i.reaction?.includes(currentUser._id) ? (
                        <i class="bi corazon bi-heart-fill"></i>
                      ) : (
                        <i class="bi corazonoff bi-heart"></i>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => openComents(i._id)}
                    className="reaction-btn"
                  >
                    <i class="bi bi-chat-dots"></i>
                  </button>
                  {showC && i._id === showId ? (
                    <button onClick={closeComents} className="ocultar">
                      Ocultar comentarios
                    </button>
                  ) : null}

                  <div>
                    <small>{i.fecha}</small>
                  </div>
                  {showC && i._id === showId ? (
                    <Comentarios
                      id={i._id}
                      img={currentUser.img}
                      names={currentUser.name + " " + currentUser.last}
                      autor={currentUser._id}
                    />
                  ) : null}
                </div>
              </div>
              <Menu id={i.autor} getNote={getNote} idPublicacion={i._id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

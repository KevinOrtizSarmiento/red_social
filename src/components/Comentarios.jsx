import axios from "axios";
import React, { useState, useEffect } from "react";
import "./style/comentarios.css";
const REACT_APP_HOST = process.env.REACT_APP_HOST

const Comentarios = ({ id, img, names, autor }) => {
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const obtener = async () => {
    await axios
      .get(REACT_APP_HOST + "/comentario/get/" + id)
      .then((res) => {
        setComentarios(res.data);
      })
      .catch((error) => {
      });
  };
  const crearComentario = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (comentario.trim().length <= 0) {
      setError(true);
      setLoad(false);
    } else {
      setError(false);
      await axios
        .post(REACT_APP_HOST + "/comentario/new", {
          publicacionId: id,
          autor: autor,
          info: comentario,
          username: names,
          img: img,
        })
        .then((res) => {
          setLoad(false);
          setComentario("");
          obtener();
        })
        .catch((error) => {
          console.log(error);
          setLoad(false);
        });
    }
  };
  useEffect(() => {
    obtener();
  }, [id]);
  return (
    <div className="caja-comentarios">
      <div className="comentario-perfil">
        <img src={img} alt="" className="comentario-perfil-photo" />
        <div className="comentario-input">
          <small>{names}</small>
          <div className="input-send">
            <textarea
              id="coment-text"
              placeholder="Añade un comentario..."
              type="text"
              onChange={(e) => setComentario(e.target.value)}
              value={comentario}
              className={error ? "form-control is-invalid" : "form-control"}
            />
            {load ? (
              <div
                id="send-loading"
                class="spinner-border text-secondary"
                role="status"
              ></div>
            ) : (
              <button
                onClick={crearComentario}
                id="send"
                className="reaction-btn"
              >
                <i class="bi  bi-send-fill"></i>
              </button>
            )}
          </div>
        </div>
      </div>
      <p><strong>Comentarios</strong> ({comentarios.length})</p>
          {comentarios.map(i=>{
              return(
                  <div className="seccion-comentarios" key={i._id}>
                      
                        <div className="comentario-perfil-info">
                        <img src={i.img} alt="" className="comentarios-perfil-photo" />
                        <div className="coment-and-name">
                          <div className="username-and-i">
                          <i className="bi profile-coment  bi-person-fill"></i>
                          <small>{i.username}</small>
                          </div>
                        <p className="info-coment">{i.info}</p>
                        </div>
                        </div>
                  </div>
              )
          })}
    </div>
  );
};

export default Comentarios;

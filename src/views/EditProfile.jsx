import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/edit.css";
import { checkUser } from "../redux/apiCalls/authApiCalls"
import axios from "axios"
import { useNavigate } from "react-router";
const REACT_APP_HOST = process.env.REACT_APP_HOST
const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [name, setName] = useState(currentUser.name);
  const navigate = useNavigate()
  const [last, setLast] = useState(currentUser.last);
  const [des, setDes] = useState(currentUser.des);
  const [msg, setMsg] = useState("")
  const [genero, setGenero] = useState(currentUser.genero);
  const [errors, setErrors] = useState({
    name: null,
    last: null,
    genero: null,
  });
  const cancel = (e)=> {
    e.preventDefault()
    navigate("/profile")
  }
  const updateUser = async (e) => {
    e.preventDefault();
    if (name.trim().length <= 0) {
      setErrors({
        name: true,
      });
    } else if (last.trim().length <= 0) {
      setErrors({
        last: true,
      });
    } else if (genero === "no-valid") {
      setErrors({
        genero: true,
      });
    } else {
      setErrors({
        name: null,
        last: null,
        genero: null,
      });
      await axios.put(REACT_APP_HOST+"/cliente/update/user/"+currentUser._id, {name:name, last:last, des:des, genero:genero}).then(res=> {

        setMsg("Usuario actualizado correctamente.")
        checkUser(dispatch)
        setTimeout(() => {
          navigate("/profile")
        }, 500);
      }).catch(error=> {
        setMsg("Ups! ocurrio un error. Intentalo mas tarde")
      })
    }
  };
  return (
    <div className="container edit-principal">
      
      <div className=" edit"><div className="res">
        <small>{msg}</small>
      </div>
        <div className="edit-input-flex">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className={
              errors.name
                ? "form-control edit-input is-invalid"
                : "form-control edit-input"
            }
            placeholder="Nuevo nombre"
          />

          <input
            value={last}
            onChange={(e) => setLast(e.target.value)}
            type="text"
            className={
              errors.last
                ? "form-control edit-input is-invalid"
                : "form-control edit-input"
            }
            placeholder="Nuevo apellido"
          />
        </div>
        <div className="edit-input-flex">
          <input
            value={currentUser.email}
            type="text"
            className="form-control edit-input"
            readOnly
          />
          <select
            onChange={(e) => setGenero(e.target.value)}
            class={
              errors.genero
                ? "form-select select is-invalid"
                : "form-select select"
            }
          >
            <option value={genero} disabled selected>
              Elige tu genero
            </option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Indefinido">Prefiero no decirlo</option>
          </select>
        </div>
        <textarea
          type="text"
          value={des}
          id="description"
          onChange={(e) => setDes(e.target.value)}
          placeholder="Añade una descripcion acerca de ti (opcional)"
          className=" form-control edit-input"
        />

        <div className="edit-input-flex">
          <button onClick={cancel} className="btn btn-secondary btn-edit">Cancelar</button>
          <button onClick={updateUser} className="btn btn-success btn-edit">
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

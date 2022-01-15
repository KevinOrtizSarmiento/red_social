import React, { useEffect, useState } from "react";
import { register, cambiar } from "../redux/apiCalls/authApiCalls";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors, currentUser, isFetching, registerex} = useSelector((state) => state.auth);
  const user = { name: name.trim(), last: last.trim(), email: email.trim(), password: password.trim() };

  const enviar = async (e) => {
    e.preventDefault();
    
    register(dispatch, user);
    
  };
  useEffect(()=>{
    if(registerex){
      cambiar(dispatch)
      setMsg("Usuario registrado con exito")
      setTimeout(() => {
        setMsg("")
        navigate("/")
      }, 1000);
      
    }
  },[registerex])
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <div className={msg.length>0?"checkbox dos registersuccess text-success fw-bold":"checkbox registersuccess text-success fw-bold"}>
                <small>{msg}</small>
              </div>
    <div className="form-register">
      
      {currentUser ? null : (
        <main id="loginPage" className="form-signin text-center">
          <form onSubmit={enviar} autocomplete="off">
            <div className="form-floating o ">
              <input
                type="text"
                className="form-control"
                
                placeholder="nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="floatingInput">Nombres</label>
              <p >
                <small>*Maximo 45 caracteres*</small>
              </p>
              
            </div>
            <div className="form-floating o ">
              <input
                type="text"
                className="form-control"
                
                placeholder="apellido"
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
              <label htmlFor="floatingInput">Apellidos</label>
              <p >
                <small>*Maximo 45 caracteres*</small>
              </p>
              
            </div>
            <div className="form-floating o ">
              <input
                type="email"
                className={errors ? "form-control is-invalid" : "form-control"}
                
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Correo Electrónico</label>
              <p >
                <small>*Correo valido sin espacios*</small>
              </p>
            </div>
            <div className="form-floating o ">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Contraseña</label>
              <p >
                <small>*Minimo 8 caracteres*</small>
              </p>
            </div>
            {errors ? (
              <div className="checkbox mb-3 text-danger fw-bold">
                <small>Este correo ya esta registrado</small>
              </div>
            ) : null}
            <button
              disabled={isFetching ||name.trim().length <= 0|| name.length>45||last.trim().length<= 0||last.length>45||email.trim().length<=0||email.length<=0||password.trim().length<=0||password.length<8? "true" : ""}
              className="b btn btn-lg btn-success"
              type="submit"
            >
              {isFetching ? (
                <div class="spinner-border" role="status" />
              ) : (
                "Crear nueva cuenta"
              )}
            </button>

            <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
          </form>
        </main>
      )}
    </div>
    </div>
  );
};
export default Register;

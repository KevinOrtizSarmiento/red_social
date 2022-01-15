import React, { useEffect, useState } from "react";
import { login } from "../redux/apiCalls/authApiCalls";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router"
import "./style.css"
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error, currentUser, isFetching } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const user = { email: email, password: password };

  const enviar = async (e) => {
    e.preventDefault();
    login(dispatch, user);
  };
  useEffect(()=>{
    if(currentUser){
      navigate("/")
    }
    
  },[])
  return (
    <div className="form-login">
      {currentUser ? null: (
       <main id="loginPage"  className="form-signin text-center">
       <form onSubmit={enviar} autocomplete="off">
      
         <div className="form-floating">
           <input
             type="email"
             className={error ? "form-control is-invalid" : "form-control"}
             id="floatingInput"
             placeholder="name@example.com"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
           />
           <label htmlFor="floatingInput">Correo Electrónico</label>
           <p className="text-danger">
             <small>{error}</small>
           </p>
         </div>
         <div className="form-floating">
           <input
             type="password"
             className={
               error? "form-control is-invalid" : "form-control"
             }
             id="floatingPassword"
             placeholder="Contraseña"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
           <label htmlFor="floatingPassword">Contraseña</label>
           <p className="text-danger">
             <small>{error}</small>
           </p>
         </div>
         {error? (
           <div className="checkbox mb-3 text-danger fw-bold">
             <small>Correo o contraseña incorrectos!</small>
           </div>
         ) : null}
 
         <button disabled={isFetching?"true":""} className="w-100 mb-3 btn btn-lg btn-primary" type="submit">
           {isFetching?
        <div class="spinner-border" role="status"/>:"Iniciar sesion"}
         </button>
         <p className="mt5 mb-3 text-muted">
           O
         </p>
         <NavLink to="/register">
         <button className="w-100 btn btn-lg btn-success" >
           Crear nueva cuenta
         </button>
         </NavLink>


         <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
       </form>
     </main>
      )}
     
    </div>
  );
};
export default Login;

import React,{useState, useEffect} from 'react'
import {checkUser} from "../redux/apiCalls/authApiCalls.js"
import Menu from "../components/Menu"
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux'
import "./styles/favorito.css"
const REACT_APP_HOST = process.env.REACT_APP_HOST
const Favoritos = () => {
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state)=>state.auth)
    const [data, setData] = useState([])
    const obtener = async () => {
        await axios.post(REACT_APP_HOST+"/cliente/me/favoritos", {favoritos:currentUser.favoritos}).then(res=>{
            setData(res.data)
        }).catch(error=> {
            console.log(error)
        })
            
    }
    useEffect(()=>{
        obtener()
    },[currentUser.favoritos])
    return (
        <div className='container favorito'>
            <h3 className='title'>Mis Notas Guardados</h3>
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
      {data.length<=0?<small className='favoritos-vacio'>No hay notas guardadas en tus <strong>Guardados</strong></small>:null}
        </div>
    )
}

export default Favoritos

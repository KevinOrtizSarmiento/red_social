import React,{useState, useEffect} from 'react'
import { NavLink } from "react-router-dom"
import {useParams} from "react-router"
import {useSelector} from "react-redux"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios"
const REACT_APP_HOST = process.env.REACT_APP_HOST

const Follow = () => {
    const {currentUser} = useSelector((state) => state.auth)
    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const [msg, setMsg] = useState("")
    const {type} = useParams()
    const meFollowers = async () => {
        if(type === "followers"){
          setMsg("Tus Seguidores")
          await axios.post(REACT_APP_HOST+"/cliente/followers/me", {data:currentUser.followers}).then(res=>{
            setLoad(false)
            setData(res.data)
          }).catch(error=> {
            setLoad(false)
          })
        }else if (type === "following"){
          setMsg("Tus Seguidos")
          await axios.post(REACT_APP_HOST+"/cliente/followers/me", {data:currentUser.following}).then(res=>{
            setLoad(false)
            setData(res.data)
          }).catch(error=> {
            setLoad(false)
          })
        }
      }
      useEffect(() => {
          meFollowers()
          
      }, [])
    return (
        <div className='container follow-page'>
          <h4 id="msg-follow">{msg}</h4>
          {load?<Skeleton count={10} className="list-follow-skeleton"/>:null}
        {data.map((i) => {
          return (
            <div key={i._id}>
              {currentUser._id===i._id?null:<NavLink className="list list-follow" to={"/friends/profile/" + i._id} >
              {i.name + " " + i.last}
              
            </NavLink>}
            </div>
          );
        })}
        {data.length<=0?<p className='msg-follow-page'>No tienes <strong>{msg.slice(4)}</strong> en tu cuenta</p>:null}
        </div>
    )
}

export default Follow

import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  checkUserStart,
  checkUserSuccess,
  checkUserFailure,
  registercam
} from "../slices/auth";
import axios from "axios";

axios.defaults.withCredentials = true;
const REACT_APP_HOST = process.env.REACT_APP_HOST
export const cambiar = (dispatch) => {
  dispatch(registercam());
}
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  await axios.post(REACT_APP_HOST+"/auth/login", user).then(res=>{
    dispatch(loginSuccess(res.data))
  }).catch(error=>{
    dispatch(loginFailure())
  })
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  await axios.post(REACT_APP_HOST+"/auth/register", user).then(res=>{
    dispatch(registerSuccess());
  }).catch(error=>{
    dispatch(registerFailure())
  })
};

export const logout = async (dispatch) => {
  dispatch(logoutStart());
  await axios.post(REACT_APP_HOST+"/auth/logout").then(res=>{
    dispatch(logoutSuccess(res.data));
  }).catch(error=>{
    dispatch(logoutFailure())
  })
};

export const checkUser = async (dispatch) => {
  dispatch(checkUserStart());
  await axios.get(REACT_APP_HOST+"/auth/info").then(res=>{
    dispatch(checkUserSuccess(res.data));
  }).catch(error=>{
    dispatch(checkUserFailure())
  })
};

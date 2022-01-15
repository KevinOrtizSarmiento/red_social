import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isFetching: false,
    isCheckingUserFetching: false,
    closing: false,
    errors:null,
    registerex:null,
    error: null,
    notas: [],
    status:false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.registerex = false;
      state.isFetching = true;
      state.errors = null;
    },
    registerSuccess: (state) => {
      state.registerex = true;
      state.isFetching = false;
      state.errors = null;
      state.currentUser = null;
    },
    registercam: (state) => {
      state.registerex = false;
    },
    registerFailure: (state) => {
      state.registerex = false;
      state.currentUser = null;
      state.isFetching = false;
      state.errors = true;
    },
    logoutStart: (state) => {
      state.closing = true;
      state.currentUser = null;
      state.error = null;
      state.registerGood = false;
    },
    logoutSuccess: (state, action) => {
      state.closing = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    logoutFailure: (state) => {
      state.currentUser = null;
      state.closing = false;
      state.error = true;
    },
    checkUserStart: (state) => {
      state.isCheckingUserFetching = true;
    },
    checkUserSuccess: (state, action) => {
      state.isCheckingUserFetching = false;
      state.currentUser = action.payload;
    },
    checkUserFailure: (state) => {
      state.isCheckingUserFetching = false;
      state.currentUser = null;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  checkUserStart,
  checkUserSuccess,
  checkUserFailure,
  registercam

} = authSlice.actions;
export default authSlice.reducer;
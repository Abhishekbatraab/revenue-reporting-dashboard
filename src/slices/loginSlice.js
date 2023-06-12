import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../app/firebase";

export const initialState = {
    loading: false,
    token: isLoggedIn()
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoginProgress: (state, { payload }) => {
            console.log("Payload in setLoginProgress", payload);
            state.loading = payload.loading
        },
        setTokenSuccessful: (state, {  payload }) => {
            console.log("Payload in setTokenSuccessful is ", payload);
            login(payload);
            state.token = payload.token;
            state.loading = true;
        }
    }
})

export const { setLoginProgress, setTokenSuccessful } = loginSlice.actions;

export default loginSlice.reducer;

function login(payload){
    localStorage.setItem("token", payload.token);
}

export function isLoggedIn() {
    const token = localStorage.getItem("token");
    console.log("Token in isLoggedIn is ", token);
    if (token) {
      return token;
    } else {
      return "";
    }
}

export function socialAuth(token){
    console.log("Token in socialAuth is ", token);
    const payload = {
        token: token
    }
    return async (dispatch) => {
        console.log("I am dispatching");
        try{
            dispatch(setTokenSuccessful(payload))
        }catch(error){
            console.log(error);
        }
    }
}

export function logout(){
    localStorage.removeItem("token");
    socialLogout();
}

function socialLogout() {
    return auth.signOut();
}

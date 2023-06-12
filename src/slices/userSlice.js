import { createSlice } from "@reduxjs/toolkit";
import { setUserIntoDB, getUserfromDB } from '../app/firebase';

export const initialState = {
    user: {
        name: '',
        email: ''
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            console.log("Payload in setUser is ", payload);
            state.user = payload
            setUserIntoDB(payload);
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer

export function setUserDetails(user){
    console.log("User in setUserDetails ", user);
    return async (dispatch) => {
        try{
            dispatch(setUser(user))
        }catch(error){
            console.log(error);
        }
    }
}

export async function getUserDetails(){
    const userObject = await getUserfromDB();
    return userObject
}
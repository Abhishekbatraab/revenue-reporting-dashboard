import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from "../slices/loginSlice";
import userReducer from '../slices/userSlice';

// const appReducer = combineReducers({
//     login: loginReducer
// })

// const rootReducer = (state, action) => {
//     return appReducer(state, action)
// }
const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
})



export default rootReducer


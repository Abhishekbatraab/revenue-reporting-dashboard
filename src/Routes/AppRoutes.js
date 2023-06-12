import React, { useEffect } from "react";
import {  Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import { isLoggedIn } from "../slices/loginSlice";
import history from "../app/history";

const ProtectedRoute = ({ children }) => {
    console.log("I am in protected route");
    const token = isLoggedIn();
    if(!token){
        console.log("Navigate to login");
        return <Home />
    }
    return children
}

function AppRoutes(){
   
    return (<React.StrictMode>
        <Header />
        <Routes>
            {/* <Route path="/" element={<Home />}/> */}
            <Route path="/" element={<ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>}>
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/dashboard" element={<ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>}>
                
            </Route>
        </Routes>
    </React.StrictMode>)
}

export default AppRoutes
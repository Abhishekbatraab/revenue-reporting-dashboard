import { Container, Grid, Paper, Typography, Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import './Login.css';
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { useSelector } from "react-redux";

const Login = () => {
    const login = useSelector(state=>state.login);
    console.log("Login state is ", login);
    const loading = login.loading;
    console.log("I am in login component");
    // {loading && <Backdrop
    //     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //     open={loading}
    // >
    //     <CircularProgress color="inherit" />
    // </Backdrop>}
    
    return (!loading ? <Container maxWidth="sm" sx={{marginTop: '100px'}}>
        <Paper elevation={3} sx={{display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center',padding: '20px 10px'}}>
            <Typography variant="h5" >
                Login
            </Typography>
            <Grid container sx={{marginTop: '20px',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <GoogleAuth />       
            </Grid>
        </Paper>
    </Container> : <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
    >
        <CircularProgress color="inherit" />
    </Backdrop>)
}

export default Login
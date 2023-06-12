import React, { useCallback, useEffect, useState } from "react"
import { auth, signInWithGoogle, googleProvider } from '../../app/firebase.js'
import { getRedirectResult } from "firebase/auth";
import GoogleIcon from  '../../images/google-icon.svg';
import { Button } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import { setLoginProgress, socialAuth } from "../../slices/loginSlice.js";
import { setUserDetails } from "../../slices/userSlice.js";
import history from "../../app/history.js";
import { redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {

    const [loading, setLoading] = useState(false);
    console.log("Auth in google auth is ", auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        getRedirectResult(auth)
        .then((result) => {
            console.log("Result is ", result);
            if (result && result.user) {
                auth.currentUser.getIdToken(true).then((idToken) => {
                    console.log("Id Token is ", idToken)
                    if(idToken){
                        const payload = {
                            loading: false
                        }
                        dispatch(socialAuth(idToken)).then(()=>{
                            navigate('/dashboard')
                            dispatch(setLoginProgress(payload));
                        });
                        const user = {
                            name: result.user.displayName,
                            email: result.user.email
                        }
                        dispatch(setUserDetails(user));
                    }
                });
            }
            // const token = result._tokenResponse.idToken;
            // console.log("Token is ", token);
            // if(token){
              
            // }
        }).catch((error) => {
            console.log("Error is ", error);
        });
    },[loading]);

    const handleLoginClick = async () => {
        console.log("I am in handleLoginClick");
        setLoading(true);
        try{
            await signInWithGoogle();
            setLoading(false);
        }catch(error){
            console.log("Error while Signing with google ", error);
            setLoading(false);
        }
    }

    return (<div>
        {loading && <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>}
        <Button 
            variant="outlined"
            startIcon={<img style={{ width: "2rem", height: "2rem" }} src={GoogleIcon} />}
            onClick={()=>{handleLoginClick();}}
        >
            Google Sign In
        </Button>
    </div>)
}

export default GoogleAuth
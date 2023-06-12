import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import { isLoggedIn, logout } from "../../slices/loginSlice";
import { useSelector } from "react-redux";

const Header = () => {

    const [menu, setMenu] = useState([
        {name: 'Home', isActive: false, to: ''}, 
        {name: 'About Us', isActive: false, to: 'aboutUs'}, 
        {name: 'Contact Us', isActive: false, to: 'contactUs' }
    ]);

    const navigate = useNavigate();
    const login = useSelector(state=>state.login);
    const [isShowLogin, setIsShowLogin] = useState(login.loading);
    
    useEffect(()=>{
        if(isLoggedIn()!==""){
            setIsShowLogin(false)
        }
    }, [isShowLogin])

    function logoutUser(){
        logout();
        navigate('/home');
        setIsShowLogin(true);
    }

    return (
        <div className="headerContainer">
            <div className="revenueReport">
                Revenue Report
            </div>
            <div className="menuLinks">
                <ul>
                    {menu.map(menuItem=><li key={menuItem.name}><Link to={menuItem.to}>{menuItem.name}</Link></li>)}
                </ul>
            </div>
            <div className="loginMenu">
                {isShowLogin ? <Link to='/login'>
                    <button className="loginButton">Login</button>
                </Link>:<div>
                    <button className="logoutButton" onClick={()=>logoutUser()}>Logout</button>
                </div>}
            </div>
        </div>
    )
}

export default Header
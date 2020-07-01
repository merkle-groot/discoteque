import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';
import "./Nav.css";

function Nav(){

    const navStyle={
        color:"#ffffff",
    }
    
    return(
        <nav>
            <div className="logo-image">
                <img clasName="logo" src={logo} alt="logo"/>
            </div>
            <div className="nav-bar">
                <ul className="nav-links">
                    <Link to="/dashboard" className="nav-ind">
                        <li>Home</li>
                    </Link>
                    
                    <Link to="/about" className="nav-ind">
                        <li>About</li>
                    </Link>  

                    <Link to="/login" className="nav-ind"> 
                        <li>Login</li>
                    </Link> 

                    
                </ul>
            </div>
        </nav>
    )
}

export default Nav;

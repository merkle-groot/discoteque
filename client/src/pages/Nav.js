import React from 'react';
import {Link} from 'react-router-dom';

function Nav (){

    const navStyle={
        color:"#ffffff",
    }
    
    return(
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link to="/about" style={navStyle}>
                    <li>About</li>
                </Link>  

                <Link to="/login" style={navStyle}> 
                    <li>Login</li>
                </Link> 
            </ul>
        </nav>
    )
}

export default Nav;

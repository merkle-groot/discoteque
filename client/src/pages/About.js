import React,{useEffect} from 'react';

function Login (){

    const fetchIcons= async () => {
        const data = await fetch("https://fortnite-api.theapinetwork.com/upcoming/get");
        const items = await data.json();
        console.log(items);
    } 

    useEffect(()=>{
        fetchIcons();
    },[]);
    
    return(
        <div>
            <h1>About</h1>
        </div>
    )
}

export default Login;

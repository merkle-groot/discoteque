import React from 'react';

import {
    Button
} from 'reactstrap';

function Login (){
    
    return(
        <div 
        style={{
            height:"50vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}
        >
            <Button color="danger" size="lg"
                onClick={()=>
                    window.open("http://www.last.fm/api/auth/?api_key=c0f9dd56d9162c4cc8ff1e8351596806","_self")
                }>
                Login using last.fm
            </Button>
        </div>
    );
}

export default Login;
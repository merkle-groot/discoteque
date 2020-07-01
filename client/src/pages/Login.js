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
                    window.open("http://www.last.fm/api/auth/?api_key=84a261467ef7a977a78a25b828506984","_blank")
                }>
                Login using last.fm
            </Button>
        </div>
    );
}

export default Login;
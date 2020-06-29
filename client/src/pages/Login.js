import React from 'react';
import {
    Container,
    Button
} from 'reactstrap';

function Login (){
    
    return(
        <Container>
            <Button color="danger" size="lg" 
                onClick={()=>
                    window.open("http://www.last.fm/api/auth/?api_key=84a261467ef7a977a78a25b828506984","_blank")
                }>
                Login using last.fm
            </Button>
        </Container>
    );
}

export default Login;
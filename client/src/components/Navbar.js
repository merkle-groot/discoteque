import React, {useState} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
} from 'reactstrap';


function AppNavbar(){
    const [isOpen,toggleIsOpen] = useState(false);


    const toggle =()=>{
        toggleIsOpen(()=>!isOpen)
    }

    return(
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/" >
                        DISCOTEQUE
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/dashboard">
                                    Dashboard
                                </NavLink>
                            </NavItem>    

                            <NavItem>
                                <NavLink href="/about">
                                    About
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink href="/login">
                                    Login
                                </NavLink>
                            </NavItem>

                            

                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );        
   
}

export default AppNavbar;
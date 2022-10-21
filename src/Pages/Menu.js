import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import {Link} from 'react-router-dom'

function Menu(props) {
    return (

        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Menú</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Login" >Iniciar Sesion</Nav.Link>
                        <Nav.Link as={Link} to="/Registrarse">Registrarse</Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Menu;


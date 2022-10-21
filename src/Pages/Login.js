import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import axios from "axios";
import '../css/Login.css'
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'
function Login(props) {

    {/* Direccion del back*/ }
    const urlBack = "https://localhost:44379/api/Personas";
    const cookies = new Cookies();

    {/* Almacenar lo que el usuarios escribe */ }
    const [form, setForm] = useState({
        numero_identificacion: '',
        contrasenhia: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
        console.log(form);
    }

    
    const iniciarSesion = async () => {
        await axios.get(urlBack + `/${form.numero_identificacion}/${form.contrasenhia}`)
            .then(response => {
                return response.data;
            }).then(response => {
                if (response.length > 0) {
                    var respuesta = response[0];
                    console.log(respuesta);
                    
                    props.history.push('/listaObligacionesCubiertas')
                    cookies.set('numero_identificacion', respuesta.numero_identificacion, {path: '/'});
                    cookies.set('nombre', respuesta.nombre, {path: '/'});
                    cookies.set('apellido', respuesta.apellido, {path: '/'});
                    alert("Bienvenido " + respuesta.nombre + " " + respuesta.apellido);
                } else {
                    alert('Datos incorrectos');
                    props.history.push('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <><Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Menú</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Login">Iniciar Sesion</Nav.Link>
                        <Nav.Link as={Link} to="/Registrarse">Registrarse</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <div className="containerPrincipal">
                <div className="containerLogin">
                    <div className="card-header">
                        <h4>Usuarios registrados</h4>
                    </div>
                    <br></br>

                    <div className="col-md-12">
                        <label htmlFor="validationCustomUsername" className="form-label">
                            N° Documento
                        </label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">
                                👤
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                id="validationCustomUsername"
                                aria-describedby="inputGroupPrepend"
                                name="numero_identificacion"
                                onChange={handleChange} />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="validationCustomUsername" className="form-label">
                            Contraseña
                        </label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">
                                🔑
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                id="validationCustomUsername"
                                aria-describedby="inputGroupPrepend"
                                name="contrasenhia"
                                onChange={handleChange} />
                        </div>
                    </div>
                    <br></br>
                    <button className="btn btn-primary" onClick={() => iniciarSesion()}>Iniciar Sesión</button>
                    <br></br>
                </div>
            </div></>
    );
}

export default Login;

import React , { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import axios from "axios";
import '../css/Login.css'
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'

function Registrarse(props) {

    const urlBack = "https://localhost:44379/api/Personas";
    const [data, setData]=useState([]);
    
    {/* Almacenar lo que el usuarios escribe */ }
    const [form, setForm] = useState({
        identificacion: '',
        password: ''
    })
    
    const handleChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
        console.log(form);
    }
    const datos ={
        "numero_identificacion":form.identificacion,
        "contrasenhia":form.password,
        "email":form.correo
    }
    const agregarPropietario = async () => {
        await axios.put(urlBack + "/"+form.identificacion+"/"+form.correo, datos)
            .then(datos => {
               alert("Usuario añadido")
               props.history.push('/Login')
            })
            .catch(error => {
                alert("ID y/o Correo son incorrectos ");
                props.history.push('/Registrarse')
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
                        <h4>➕ Registrarse</h4>
                    </div>
                    <br></br>
                    <div className="col-md-12">
                        <label htmlFor="validationCustomUsername" className="form-label">
                            N° de Documento
                        </label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">
                                🇮🇩
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                id="validationCustomUsername"
                                aria-describedby="inputGroupPrepend"
                                name="identificacion"
                                onChange={handleChange}
                                
                            />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="validationCustomUsername" className="form-label">
                            Correo
                        </label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">
                                📧
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                id="validationCustomUsername"
                                aria-describedby="inputGroupPrepend"
                                name="correo"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="validationCustomUsername" className="form-label">
                            Nueva contraseña
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
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <br></br>
                    <button className="btn btn-primary" onClick={() => agregarPropietario()} >Crear Usuario</button>
                    <br></br>
                </div>
            </div></>
    );
}

export default Registrarse;
import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from 'axios';
import { Link } from 'react-router-dom'

function MenuLogin(props) {
    const cookies = new Cookies();
    const url = "https://localhost:44379/datos";
    const [data, setData] = useState([]);
    const datos = cookies.get('numero_identificacion');
    const peticion = async () => {
        await axios.get(url+ '/' + datos)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const cerrarSesion=()=>{
        cookies.remove('numer_identificacion');
        cookies.remove('nombre');
        cookies.remove('apellido');
        cookies.remove('contrasenhia');
        props.history.push('./');
        alert("Cerrando sesión");
    }
    useEffect(() => {
        
        peticion();
    }, [])

    
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Usuario {datos}</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/listaPagosRealizados" eventKey="disabled">Lista pagos realizados</Nav.Link>
                                <Nav.Link as={Link} to="/listaObligacionesCubiertas">Lista obligaciones pagadas</Nav.Link>
                                <Nav.Link as={Link} to="/listaObligacionesPagar">Lista obligaciones a pagar</Nav.Link>
                            
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <div>
                <button className="btn btn-danger"  onClick={() => cerrarSesion()} >Cerrar sesión</button>

                </div>
                <br></br>
                <h2>Lista de pagos realizados</h2>
                <div className="tabla">
                    <table className="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Referencia de pago</th>
                                <th scope="col">Valor cancelado</th>
                                <th scope="col">Fecha máxima de pago</th>
                                <th scope="col">Referencia obligación</th>
                                <th scope="col">Referencia propiedad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(pagos => (
                                <tr key={pagos.id_Pago}>
                                    <td>{pagos.id_Pago}</td>
                                    <td>{pagos.valor_Pagado}</td>
                                    <td>{pagos.fecha}</td>
                                    <td>{pagos.id_Obligacion}</td>
                                    <td>{pagos.id_propiedad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </>
    );
}
export default MenuLogin;
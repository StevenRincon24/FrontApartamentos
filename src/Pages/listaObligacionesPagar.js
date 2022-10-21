import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from 'axios';
import { Link } from 'react-router-dom'
import jsPDF from "jspdf";
import "jspdf-autotable";

function MenuLogin(props) {
    const cookies = new Cookies();
    const url = "https://f57d-2800-484-ae86-3928-e4dc-8149-5f45-a6aa.ngrok.io/obligacionNoPaga";
    const [data, setData] = useState([]);
    const datos = cookies.get('numero_identificacion');
    const peticion = async () => {
        await axios.get(url + '/' + datos)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const cerrarSesion = () => {
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


    const exportPDF = (registro) => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(12);
        let date = new Date().toLocaleDateString();
        let hora = new Date().getHours();
        let minutos = new Date().getMinutes();
        let segundos = new Date().getSeconds();
        const title = "Hasta el día " + date + " a las " + hora + ":" + minutos + ":" + segundos + " el recibo de su obligación es el siguiente";
        const headers = [["Referencia", "Fecha pago", "Descripcion", "Valor restante", "Id propiedad"]];
        const dataTable = data.map(persona => [persona.referencia, persona.fechaLimite, persona.concepto, (persona.valor - persona.valorPagado), persona.idPropiedad]);
        let content;
        dataTable.forEach(element => {
            if (element[0] == registro) {
                const dataTable1 = [[element[0], element[1], element[2], "$" + element[3], element[4]]];
                console.log("Entra");
                content = {
                    startY: 50,
                    head: headers,
                    startY: 60,
                    body: dataTable1
                };
                doc.text(title, marginLeft, 40);
                doc.autoTable(content);
                doc.output('save', 'Recibo de obligacion ' + element[0]);
            }
        });

    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Usuario {datos}</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/listaPagosRealizados">Lista pagos realizados</Nav.Link>
                            <Nav.Link as={Link} to="/listaObligacionesCubiertas">Lista obligaciones pagadas</Nav.Link>
                            <Nav.Link as={Link} to="/listaObligacionesPagar" eventKey="disabled">Lista obligaciones a pagar</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <div>


                    <button className="btn btn-danger" onClick={() => cerrarSesion()} >Cerrar sesión</button>

                </div>
                <br></br>
                <h2>Lista obligaciones a pagar</h2>
                <div className="tabla">
                    <table className="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Referencia obligación</th>
                                <th scope="col">Fecha máxima de pago</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Valor pagado</th>
                                <th scope="col">Valor total</th>
                                <th scope="col">Valor restante</th>
                                <th scope="col">Identificador propiedad</th>
                                <th scope="col">Descargar recibo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(persona => (
                                <tr style={{ backgroundColor: !!(persona.valorPagado == 0) ? '#DB4948' : '#FFF23D' }} key={persona.referencia}>
                                    <td>{persona.referencia}</td>
                                    <td>{persona.fechaLimite}</td>
                                    <td>{persona.concepto}</td>
                                    <td >${persona.valorPagado} </td>
                                    <td>${persona.valor}</td>
                                    <td>${persona.valor - persona.valorPagado}</td>
                                    <td>{persona.idPropiedad}</td>
                                    <td><button className="btn btn-primary" onClick={() => exportPDF(persona.referencia)}><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="bi bi-file-earmark-pdf"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                        <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                                    </svg></button></td>
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
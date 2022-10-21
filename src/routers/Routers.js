import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../Pages/Login';
import Registrarse from '../Pages/Registrarse';
import Menu from '../Pages/Menu';
import listaObligacionesCubiertas from '../Pages/listaObligacionesCubiertas';
import listaPagosRealizados from '../Pages/listaPagosRealizados'
import listaObligacionesPagar from '../Pages/listaObligacionesPagar'
import PazySalvo from '../Pages/PazySalvo'

function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Menu} />
      <Route exact path="/registrarse" component={Registrarse} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/listaObligacionesCubiertas" component={listaObligacionesCubiertas} />
      <Route exact path = "/listaObligacionesPagar" component={listaObligacionesPagar} />
      <Route exact path = "/listaPagosRealizados" component={listaPagosRealizados} />
      <Route exact path = "/PazySalvo" component={PazySalvo} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
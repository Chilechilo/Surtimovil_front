import React, { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { jwtDecode } from 'jwt-decode';
import './App.css';

import CreateUser from './components/CreateUser';
import CreateOrder from './components/CreateOrder';
import UpdateOrderStatus from './components/UpdateOrderStatus';
import DeleteUser from './components/DeleteUser';
import OrderStatus from './components/OrderStatus';
import ProductCostCalculator from './components/ProductCostCalculator';
import ProductList from './components/ProductList';
import UserTotalCost from './components/UserTotalCost';
import Login from './components/Login';

const httpLink = createHttpLink({
  uri: 'https://surtimovilback-production.up.railway.app/',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [usuario, setUsuario] = useState(null);
  const [vistaActual, setVistaActual] = useState('login');

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    setVistaActual('login');
  };

  const renderContenido = () => {
    if (!usuario) {
      return vistaActual === 'registro' ? (
        <CreateUser isRegistroInicial={true} setVistaActual={setVistaActual} />
      ) : (
        <Login setUsuario={setUsuario} setMostrarRegistro={() => setVistaActual('registro')} />
      );
    }

    return (
      <div className="dashboard-expanded">
        <div className="navbar">
          <button onClick={() => setVistaActual('productos')}>Productos</button>
          <button onClick={() => setVistaActual('ordenes')}>Órdenes</button>
          {usuario.role === 'admin' && (
            <button onClick={() => setVistaActual('crearUsuario')} className="admin-btn">
              Crear Usuario
            </button>
          )}
          <button onClick={() => setVistaActual('costoTotal')}>Costo Total</button>
          <button onClick={() => setVistaActual('costoProducto')}>Costo Producto</button>
          <button onClick={() => setVistaActual('crearOrden')}>Crear Orden</button>
          <button onClick={() => setVistaActual('actualizarOrden')}>Actualizar Orden</button>
          {usuario.role === 'admin' && (
            <button onClick={() => setVistaActual('eliminarUsuario')} className="admin-btn">
              Eliminar Usuario
            </button>
          )}
          <button className="logout-btn" onClick={cerrarSesion}>Cerrar Sesión</button>
        </div>

        <h1>
          Bienvenido, {usuario.name} ({usuario.role})
        </h1>

        {vistaActual === 'productos' && <ProductList />}
        {vistaActual === 'ordenes' && <OrderStatus idUsuario={usuario.id} />}
        {vistaActual === 'crearUsuario' && <CreateUser />}
        {vistaActual === 'costoTotal' && <UserTotalCost idUsuario={usuario.id} />}
        {vistaActual === 'costoProducto' && <ProductCostCalculator />}
        {vistaActual === 'crearOrden' && <CreateOrder idUsuario={usuario.id} />}
        {vistaActual === 'actualizarOrden' && (
          <UpdateOrderStatus idUsuario={usuario.id} />
        )}
        {vistaActual === 'eliminarUsuario' && <DeleteUser />}
      </div>
    );
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">{renderContenido()}</div>
    </ApolloProvider>
  );
}

export default App;

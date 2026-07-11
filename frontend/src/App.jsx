import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/login/Login";

import Dashboard from "./pages/dashboard/Dashboard";

import Libros from "./pages/libros/Libros";
import Alumnos from "./pages/alumnos/Alumnos";
import Docentes from "./pages/docentes/Docentes";
import Termometro from "./pages/termometro/Termometro";

import Prestamos from "./pages/Prestamos/Prestamos";
import Historial from "./pages/Historial/Historial";

function App() {

  const [usuario, setUsuario] = useState(
  JSON.parse(localStorage.getItem("usuario"))
);

useEffect(() => {
  const verificarSesion = () => {
    setUsuario(
      JSON.parse(localStorage.getItem("usuario"))
    );
  };

  window.addEventListener("pageshow", verificarSesion);

  return () => {
    window.removeEventListener("pageshow", verificarSesion);
  };
}, []);

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={
            usuario
              ? (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
              : (
                <Login />
              )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            usuario
              ? (
                <Dashboard />
              )
              : (
                <Navigate
                  to="/"
                  replace
                />
              )
          }
        />

        {/* Libros */}
        <Route
          path="/libros"
          element={
            usuario
              ? (
                <Libros />
              )
              : (
                <Navigate
                  to="/"
                  replace
                />
              )
          }
        />

        {/* Alumnos */}
        <Route
          path="/alumnos"
          element={
            usuario
              ? (
                <Alumnos />
              )
              : (
                <Navigate
                  to="/"
                  replace
                />
              )
          }
        />

        {/* Docentes */}
        <Route
          path="/docentes"
          element={
            usuario
              ? (
                <Docentes />
              )
              : (
                <Navigate
                  to="/"
                  replace
                />
              )
          }
        />

        {/* Termómetro */}
        <Route
          path="/termometro"
          element={
            usuario
              ? (
                <Termometro />
              )
              : (
                <Navigate
                  to="/"
                  replace
                />
              )
          }
        />

        {/* Préstamos */}
        <Route
          path="/prestamos"
          element={
            usuario
              ? (
                <Prestamos />
              )
              : (
                <Navigate
                  to="/"
                  replace
                />
              )
          }
        />

        {/* Historial */}
        <Route
          path="/historial"
          element={
            usuario
              ? (
                <Historial />
              )
              : (
                <Navigate
                  to="/"
                  replace
                />
              )
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
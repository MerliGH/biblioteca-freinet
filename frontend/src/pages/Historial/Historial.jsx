import Layout from "../../components/Layout";
import "./Historial.css";

import { useState, useEffect } from "react";

import CreateHistorial from "./CreateHistorial";
import EditHistorial from "./EditHistorial";
import DeleteHistorial from "./DeleteHistorial";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import api from "../../services/api";

function Historial() {

  const [historial, setHistorial] =
    useState([]);

  const [busqueda, setBusqueda] =
    useState("");

  const [mostrarCreate,
    setMostrarCreate] =
    useState(false);

  const [mostrarEdit,
    setMostrarEdit] =
    useState(false);

  const [mostrarDelete,
    setMostrarDelete] =
    useState(false);

  const [registroSeleccionado,
    setRegistroSeleccionado] =
    useState(null);

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const esDirectora =
    usuario?.rol === "DIRECTORA";

  useEffect(() => {
    obtenerHistorial();
  }, []);

  const formatearFecha = (fecha) => {

    if (!fecha) return "-";

    const [year, month, day] =
      fecha.split("T")[0].split("-");

    return `${day}/${month}/${year}`;

  };

  const obtenerHistorial = async () => {

    try {

      const [
        prestamosResponse,
        usuariosResponse,
        librosResponse,
      ] = await Promise.all([
        api.get("/prestamos/"),
        api.get("/usuarios/"),
        api.get("/libros/"),
      ]);

      const historialPrestamos =
        prestamosResponse.data
          .filter(
            (prestamo) =>
              prestamo.estado ===
              "DEVUELTO"
          )
          .map((prestamo) => {

            const alumno =
              usuariosResponse.data.find(
                (usuario) =>
                  usuario.id_usuario ===
                  prestamo.usuario_id
              );

            const docente =
              usuariosResponse.data.find(
                (usuario) =>
                  usuario.id_usuario ===
                  prestamo.autorizado_por
              );

            const libro =
              librosResponse.data.find(
                (lib) =>
                  lib.id_libro ===
                  prestamo.libro_id
              );

            return {
              ...prestamo,

              nombreAlumno: alumno
                ? `${alumno.nombre} ${alumno.apellido_paterno}`
                : "No encontrado",

              autorizadoPor: docente
                ? `${docente.nombre} ${docente.apellido_paterno}`
                : "No encontrado",

              tituloLibro: libro
                ? libro.titulo
                : "No encontrado",
            };

          });

      setHistorial(
        historialPrestamos
      );

    } catch (error) {

      console.error(
        "Error al obtener historial:",
        error
      );

    }

  };

  const historialFiltrado =
    historial.filter(
      (registro) => {

        const texto =
          busqueda.toLowerCase();

        return (

          (registro.nombreAlumno || "")
            .toLowerCase()
            .includes(texto)

          ||

          (registro.tituloLibro || "")
            .toLowerCase()
            .includes(texto)

          ||

          (registro.estado || "")
            .toLowerCase()
            .includes(texto)

          ||

          (registro.autorizadoPor || "")
            .toLowerCase()
            .includes(texto)

          ||

          formatearFecha(
            registro.fecha_prestamo
          )
            .toLowerCase()
            .includes(texto)

          ||

          formatearFecha(
            registro.fecha_devolucion
          )
            .toLowerCase()
            .includes(texto)
        );

      }
    );

  return (

    <Layout>

      <div className="historial-container">

        <div className="historial-header">

          <h1>
            Historial de Préstamos
          </h1>

          <div className="acciones">

            <input
              type="text"
              placeholder="Buscar..."
              className="buscador"
              value={busqueda}
              onChange={(e) =>
                setBusqueda(
                  e.target.value
                )
              }
            />

            {esDirectora && (

              <button
                className="btn-agregar"
                onClick={() =>
                  setMostrarCreate(true)
                }
              >
                Añadir Historial
              </button>

            )}

          </div>

        </div>

        <table className="tabla-historial">

          <thead>

            <tr>
              <th>Alumno</th>
              <th>Libro</th>
              <th>Fecha préstamo</th>
              <th>Fecha devolución</th>
              <th>Estado</th>
              <th>Autorizado por</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {historialFiltrado.map(
              (registro) => (

                <tr
                  key={
                    registro.id_prestamo
                  }
                >

                  <td>
                    {
                      registro.nombreAlumno
                    }
                  </td>

                  <td>
                    {
                      registro.tituloLibro
                    }
                  </td>

                  <td>

                    <span className="fecha-pill">

                      {formatearFecha(
                        registro.fecha_prestamo
                      )}

                    </span>

                  </td>

                  <td>

                    <span className="fecha-pill">

                      {formatearFecha(
                        registro.fecha_devolucion
                      )}

                    </span>

                  </td>

                  <td>
                    {
                      registro.estado
                    }
                  </td>

                  <td>
                    {
                      registro.autorizadoPor
                    }
                  </td>

                  <td>

                    <div className="acciones-tabla">

                      <button
                        className="btn-editar"
                        onClick={() => {

                          setRegistroSeleccionado(
                            registro
                          );

                          setMostrarEdit(
                            true
                          );

                        }}
                      >
                        <FaRegEdit />
                      </button>

                      {esDirectora && (

                        <button
                          className="btn-eliminar"
                          onClick={() => {

                            setRegistroSeleccionado(
                              registro
                            );

                            setMostrarDelete(
                              true
                            );

                          }}
                        >
                          <RiDeleteBinLine />
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

        {mostrarCreate && (

          <CreateHistorial
            onClose={() =>
              setMostrarCreate(false)
            }
          />

        )}

        {mostrarEdit &&
          registroSeleccionado && (

            <EditHistorial
              historial={
                registroSeleccionado
              }
              onClose={() =>
                setMostrarEdit(false)
              }
            />

          )}

        {mostrarDelete &&
          registroSeleccionado && (

            <DeleteHistorial
              historial={
                registroSeleccionado
              }
              onClose={() =>
                setMostrarDelete(false)
              }
            />

          )}

      </div>

    </Layout>

  );

}

export default Historial;
import "./Prestamos.css";

import { useState, useEffect } from "react";

import Layout from "../../components/Layout";

import CreatePrestamo from "./CreatePrestamo";
import EditPrestamo from "./EditPrestamos";
import DeletePrestamo from "./DeletePrestamo";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import api from "../../services/api";

function Prestamos() {

  const [prestamos, setPrestamos] =
    useState([]);

  const [busqueda,
    setBusqueda] =
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

  const [prestamoSeleccionado,
    setPrestamoSeleccionado] =
    useState(null);

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const esDirectora =
    usuario?.rol === "DIRECTORA";

  useEffect(() => {
    obtenerPrestamos();
  }, []);

  const formatearFecha = (fecha) => {

    if (!fecha) return "-";

    const [year, month, day] =
      fecha.split("T")[0].split("-");

    return `${day}/${month}/${year}`;

  };

  const obtenerPrestamos = async () => {

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

      const prestamosConDatos =
        prestamosResponse.data
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

          })
          .filter(
            (prestamo) =>
              prestamo.estado ===
                "PRESTADO" ||
              prestamo.estado ===
                "VENCIDO"
          );

      setPrestamos(
        prestamosConDatos
      );

    } catch (error) {

      console.error(
        "Error al obtener préstamos:",
        error
      );

    }

  };

  const prestamosFiltrados =
    prestamos.filter(
      (prestamo) => {

        const texto =
          busqueda.toLowerCase();

        return (

          (prestamo.nombreAlumno || "")
            .toLowerCase()
            .includes(texto)

          ||

          (prestamo.tituloLibro || "")
            .toLowerCase()
            .includes(texto)

          ||

          (prestamo.autorizadoPor || "")
            .toLowerCase()
            .includes(texto)

          ||

          formatearFecha(
            prestamo.fecha_prestamo
          )
            .toLowerCase()
            .includes(texto)

          ||

          formatearFecha(
            prestamo.fecha_limite
          )
            .toLowerCase()
            .includes(texto)

          ||

          (prestamo.estado || "")
            .toLowerCase()
            .includes(texto)

        );

      }
    );

  return (

    <Layout>

      <div className="prestamos-container">

        <div className="prestamos-header">

          <h1>
            Préstamos Activos
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

            <button
              className="btn-agregar"
              onClick={() =>
                setMostrarCreate(true)
              }
            >
              Añadir Préstamo
            </button>

          </div>

        </div>

        <table className="tabla-prestamos">

          <thead>

            <tr>
              <th>Nombre del alumno</th>
              <th>Libro</th>
              <th>Autorizado por</th>
              <th>Fecha préstamo</th>
              <th>Fecha límite</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {prestamosFiltrados.map(
              (prestamo) => (

                <tr
                  key={
                    prestamo.id_prestamo
                  }
                >

                  <td>
                    {
                      prestamo.nombreAlumno
                    }
                  </td>

                  <td>
                    {
                      prestamo.tituloLibro
                    }
                  </td>

                  <td>
                    {
                      prestamo.autorizadoPor
                    }
                  </td>

                  <td>

                    <span className="fecha-pill">

                      {formatearFecha(
                        prestamo.fecha_prestamo
                      )}

                    </span>

                  </td>

                  <td>

                    <span className="fecha-pill">

                      {formatearFecha(
                        prestamo.fecha_limite
                      )}

                    </span>

                  </td>

                  <td>
                    {prestamo.estado}
                  </td>

                  <td>

                    <div className="acciones-tabla">

                      <button
                        className="btn-editar"
                        onClick={() => {

                          setPrestamoSeleccionado(
                            prestamo
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

                            setPrestamoSeleccionado(
                              prestamo
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

          <CreatePrestamo
            onClose={() =>
              setMostrarCreate(false)
            }
          />

        )}

        {mostrarEdit &&
          prestamoSeleccionado && (

            <EditPrestamo
              prestamo={
                prestamoSeleccionado
              }
              onClose={() =>
                setMostrarEdit(false)
              }
            />

          )}

        {mostrarDelete &&
          prestamoSeleccionado && (

            <DeletePrestamo
              prestamo={
                prestamoSeleccionado
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

export default Prestamos;
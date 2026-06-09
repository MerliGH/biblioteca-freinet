import Layout from "../../components/Layout";
import "./Alumnos.css";

import { useState, useEffect } from "react";

import CreateAlumno from "./CreateAlumno";
import EditAlumno from "./EditAlumno";
import DeleteAlumno from "./DeleteAlumno";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import api from "../../services/api";

function Alumnos() {

  const [alumnos, setAlumnos] =
    useState([]);

  const [mostrarCreate,
    setMostrarCreate] =
    useState(false);

  const [mostrarEdit,
    setMostrarEdit] =
    useState(false);

  const [mostrarDelete,
    setMostrarDelete] =
    useState(false);

  const [alumnoSeleccionado,
    setAlumnoSeleccionado] =
    useState(null);

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const esDirectora =
    usuario?.rol === "DIRECTORA";

  useEffect(() => {
    obtenerAlumnos();
  }, []);

  const obtenerAlumnos = async () => {

    try {

      const response =
        await api.get("/usuarios/");

      const alumnosFiltrados =
        response.data.filter(
          (usuario) =>
            usuario.rol === "ALUMNO"
        );

      setAlumnos(
        alumnosFiltrados
      );

    } catch (error) {

      console.error(
        "Error al obtener alumnos:",
        error
      );

    }

  };

  return (

    <Layout>

      <div className="alumnos-container">

        <div className="alumnos-header">

          <h1>
            Gestión de Alumnos
          </h1>

          <div className="acciones">

            <input
              type="text"
              placeholder="Buscar..."
              className="buscador"
            />

            {esDirectora && (

              <button
                className="btn-agregar"
                onClick={() =>
                  setMostrarCreate(true)
                }
              >
                Añadir Alumno
              </button>

            )}

          </div>

        </div>

        <table className="tabla-alumnos">

          <thead>

            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Matrícula</th>
              <th>Grupo</th>
              <th>Estado</th>
              <th>Fecha de registro</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {alumnos.map(
              (alumno) => (

                <tr
                  key={
                    alumno.id_usuario
                  }
                >

                  <td>
                    {alumno.nombre}
                  </td>

                  <td>
                    {
                      alumno.apellido_paterno
                    }
                  </td>

                  <td>
                    {alumno.correo}
                  </td>

                  <td>
                    {
                      alumno.matricula
                    }
                  </td>

                  <td>
                    {alumno.grado}
                    {alumno.grupo}
                  </td>

                  <td>

                    {alumno.estado
                      ? "Activo"
                      : "Inactivo"}

                  </td>

                  <td>

                    <span className="fecha-pill">

                      {new Date(
                        alumno.fecha_registro
                      ).toLocaleDateString()}

                    </span>

                  </td>

                  <td>

                    <div className="acciones-tabla">

                      <button
                        className="btn-editar"
                        onClick={() => {

                          setAlumnoSeleccionado(
                            alumno
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

                            setAlumnoSeleccionado(
                              alumno
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

          <CreateAlumno
            onClose={() =>
              setMostrarCreate(false)
            }
          />

        )}

        {mostrarEdit &&
          alumnoSeleccionado && (

            <EditAlumno
              alumno={
                alumnoSeleccionado
              }
              onClose={() =>
                setMostrarEdit(false)
              }
            />

          )}

        {mostrarDelete &&
          alumnoSeleccionado && (

            <DeleteAlumno
              alumno={
                alumnoSeleccionado
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

export default Alumnos;
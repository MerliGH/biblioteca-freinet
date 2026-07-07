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

  const [busqueda,
    setBusqueda] =
    useState("");

    const [gradoFiltro,
  setGradoFiltro] =
  useState("");

const [grupoFiltro,
  setGrupoFiltro] =
  useState("");
const [paginaActual, setPaginaActual] =
  useState(1);

const alumnosPorPagina = 8;


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


    const puedeFiltrar =
  esDirectora ||
  (
    usuario?.rol === "DOCENTE" &&
    usuario?.grado == null &&
    usuario?.grupo == null
  );

  useEffect(() => {

    obtenerAlumnos();

  }, []);

  const obtenerAlumnos = async () => {

    try {

      const response =
        await api.get("/usuarios/");

      let alumnosFiltrados =
        response.data.filter(
          (usuarioItem) =>
            usuarioItem.rol ===
            "ALUMNO"
        );

      // Si es docente y tiene grupo asignado,
      // solo verá los alumnos de su grupo

      if (
        usuario?.rol ===
          "DOCENTE" &&
        usuario?.grado &&
        usuario?.grupo
      ) {

        alumnosFiltrados =
          alumnosFiltrados.filter(
            (alumno) =>
              String(
                alumno.grado
              ) ===
                String(
                  usuario.grado
                ) &&
              String(
                alumno.grupo
              )
                .trim()
                .toUpperCase() ===
              String(
                usuario.grupo
              )
                .trim()
                .toUpperCase()
          );

      }

      

      alumnosFiltrados.sort(
        (a, b) =>
          b.id_usuario -
          a.id_usuario
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

  const alumnosFiltrados =
  alumnos.filter((alumno) => {

    const texto =
      busqueda.toLowerCase();

    const coincideBusqueda = (

      (alumno.nombre || "")
        .toLowerCase()
        .includes(texto)

      ||

      (alumno.apellido_paterno || "")
        .toLowerCase()
        .includes(texto)

      ||

      (alumno.correo || "")
        .toLowerCase()
        .includes(texto)

      ||

      (alumno.matricula || "")
        .toLowerCase()
        .includes(texto)

      ||

      `${alumno.grado || ""}${alumno.grupo || ""}`
        .toLowerCase()
        .includes(texto)

    );

    const coincideGrado =
      gradoFiltro === "" ||
      String(alumno.grado) === gradoFiltro;

    const coincideGrupo =
      grupoFiltro === "" ||
      String(alumno.grupo)
        .trim()
        .toUpperCase() ===
      grupoFiltro;

    return (
      coincideBusqueda &&
      coincideGrado &&
      coincideGrupo
    );

  });

  const indiceUltimo =
  paginaActual * alumnosPorPagina;

const indicePrimero =
  indiceUltimo - alumnosPorPagina;

const alumnosPaginados =
  alumnosFiltrados.slice(
    indicePrimero,
    indiceUltimo
  );

const totalPaginas =
  Math.ceil(
    alumnosFiltrados.length /
    alumnosPorPagina
  );

  return (

    <Layout>

      <div className="alumnos-container">

       <div className="alumnos-header">

  <div>

    <h1>
      Gestión de alumnos
    </h1>

    {puedeFiltrar && (

      <div className="filtros-alumnos">

        
        <select
          value={gradoFiltro}
          onChange={(e) => {
  setGradoFiltro(e.target.value);
  setPaginaActual(1);
}}
        >
          <option value="">Todos los grados</option>
          <option value="1">1°</option>
          <option value="2">2°</option>
          <option value="3">3°</option>
          <option value="4">4°</option>
          <option value="5">5°</option>
          <option value="6">6°</option>
        </select>

        <select
          value={grupoFiltro}
          onChange={(e) => {
  setGrupoFiltro(e.target.value);
  setPaginaActual(1);
}}
        >
          <option value="">Todos los grupos</option>
          <option value="A">Grupo A</option>
          <option value="B">Grupo B</option>
        </select>

      </div>

    )}

  </div>

<div className="acciones">
    <input
          type="text"
          placeholder="Buscar..."
          className="buscador"
          value={busqueda}
          onChange={(e) => {
  setBusqueda(e.target.value);
  setPaginaActual(1);
}}
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

     {alumnosPaginados.map(
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
<div className="paginacion">

  <button
    disabled={paginaActual === 1}
    onClick={() =>
      setPaginaActual(
        paginaActual - 1
      )
    }
  >
    ← Anterior
  </button>

  <span>

    Página {paginaActual} de {totalPaginas || 1}

  </span>

  <button
    disabled={
      paginaActual === totalPaginas ||
      totalPaginas === 0
    }
    onClick={() =>
      setPaginaActual(
        paginaActual + 1
      )
    }
  >
    Siguiente →
  </button>

</div>
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
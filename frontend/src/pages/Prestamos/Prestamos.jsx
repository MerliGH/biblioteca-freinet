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

    const [filtroGrado,
  setFiltroGrado] =
  useState("");

  const [filtroGrupo,
    setFiltroGrupo] =
    useState("");

    const [paginaActual, setPaginaActual] =
  useState(1);

const prestamosPorPagina = 8;



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
  const mostrarFiltros =

  usuario?.rol === "DIRECTORA"

  ||

  (

    usuario?.rol === "DOCENTE"

    &&

    (

      !usuario?.grado

      ||

      !usuario?.grupo

    )

  );

const grados = [

  ...new Set(

    prestamos

      .map(

        (p) => p.gradoAlumno

      )

      .filter(Boolean)

  )

].sort();

const grupos = [

  ...new Set(

    prestamos

      .map(

        (p) => p.grupoAlumno

      )

      .filter(Boolean)

  )

].sort();


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

            nombreAlumno:

              alumno

                ? `${alumno.nombre} ${alumno.apellido_paterno}`

                : "No encontrado",

            autorizadoPor:

              docente

                ? `${docente.nombre} ${docente.apellido_paterno}`

                : "No encontrado",

            tituloLibro:

              libro

                ? libro.titulo

                : "No encontrado",

            gradoAlumno:

              alumno?.grado || "",

            grupoAlumno:

              alumno?.grupo || "",

          };

        })

        .filter(

          (prestamo) =>

            prestamo.estado ===

              "PRESTADO" ||

            prestamo.estado ===

              "VENCIDO"

        );

    let prestamosFiltradosPorGrupo =

      prestamosConDatos;

    if (

      usuario?.rol ===

        "DOCENTE" &&

      usuario?.grado &&

      usuario?.grupo

    ) {

      prestamosFiltradosPorGrupo =

        prestamosConDatos.filter(

          (prestamo) =>

            String(

              prestamo.gradoAlumno

            ) ===

              String(

                usuario.grado

              ) &&

            String(

              prestamo.grupoAlumno

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


    prestamosFiltradosPorGrupo.sort(

      (a, b) =>

        b.id_prestamo -

        a.id_prestamo

    );

    setPrestamos(

      prestamosFiltradosPorGrupo

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

      const coincideBusqueda =

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
          .includes(texto);

      const coincideGrado =

        filtroGrado === ""

        ||

        String(
          prestamo.gradoAlumno
        ) === filtroGrado;

      const coincideGrupo =

        filtroGrupo === ""

        ||

        String(
          prestamo.grupoAlumno
        ) === filtroGrupo;

      return (

        coincideBusqueda

        &&

        coincideGrado

        &&

        coincideGrupo

      );

    }

  );

  const indiceUltimo =
  paginaActual * prestamosPorPagina;

const indicePrimero =
  indiceUltimo - prestamosPorPagina;

const prestamosPaginados =
  prestamosFiltrados.slice(
    indicePrimero,
    indiceUltimo
  );

const totalPaginas =
  Math.ceil(
    prestamosFiltrados.length /
    prestamosPorPagina
  );


  return (

    <Layout>

      <div className="prestamos-container">

        <div className="prestamos-header">

  <div>

    <h1>
      Préstamos activos
    </h1>

    {mostrarFiltros && (

      <div className="filtros-alumnos">

        <select
          value={filtroGrado}
          onChange={(e) => {
            setFiltroGrado(e.target.value);
            setPaginaActual(1);
          }}
        >
          <option value="">Todos los grados</option>

          {grados.map((grado) => (

            <option
              key={grado}
              value={grado}
            >
              {grado}°
            </option>

          ))}

        </select>

        <select
          value={filtroGrupo}
          onChange={(e) => {
            setFiltroGrupo(e.target.value);
            setPaginaActual(1);
          }}
        >
          <option value="">Todos los grupos</option>

          {grupos.map((grupo) => (

            <option
              key={grupo}
              value={grupo}
            >
              {grupo}
            </option>

          ))}

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

    <button
      className="btn-agregar"
      onClick={() => setMostrarCreate(true)}
    >
      Añadir préstamo
    </button>

  </div>

</div>

        <table className="tabla-prestamos">

          <thead>

          <tr>

            <th>Nombre del alumno</th>

            <th>Grupo</th>

            <th>Libro</th>

            <th>Autorizado por</th>

            <th>Fecha préstamo</th>

            <th>Fecha límite</th>

            <th>Estado</th>

            <th>Acciones</th>

          </tr>

          </thead>

          <tbody>
{prestamosPaginados.map(
              (prestamo) => (

                <tr
                  key={
                    prestamo.id_prestamo
                  }
                >

                 <td>

                  {prestamo.nombreAlumno}

                </td>

              <td>

                {prestamo.gradoAlumno &&
                prestamo.grupoAlumno

                  ? `${prestamo.gradoAlumno}° ${prestamo.grupoAlumno}`

                  : "Sin grupo"}

              </td>

              <td>

                {prestamo.tituloLibro}

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
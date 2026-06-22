import Layout from "../../components/Layout";
import "./Docentes.css";

import { useState, useEffect } from "react";

import CreateDocente from "./CreateDocente";
import EditDocente from "./EditDocente";
import DeleteDocente from "./DeleteDocente";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import api from "../../services/api";

function Docentes() {

  const [docentes, setDocentes] =
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

  const [docenteSeleccionado,
    setDocenteSeleccionado] =
    useState(null);

  useEffect(() => {

    obtenerDocentes();

  }, []);

  const obtenerDocentes = async () => {

    try {

      const response =
        await api.get("/usuarios/");

      let docentesFiltrados =
        response.data.filter(
          (usuario) =>
            usuario.rol ===
            "DOCENTE"
        );


      docentesFiltrados.sort(
        (a, b) =>
          b.id_usuario -
          a.id_usuario
      );

      setDocentes(
        docentesFiltrados
      );

    } catch (error) {

      console.error(
        "Error al obtener docentes:",
        error
      );

    }

  };

  const docentesBusqueda =
    docentes.filter(
      (docente) => {

        const texto =
          busqueda.toLowerCase();

        return (

          (docente.nombre || "")
            .toLowerCase()
            .includes(texto)

          ||

          (
            docente.apellido_paterno || ""
          )
            .toLowerCase()
            .includes(texto)

          ||

          (docente.correo || "")
            .toLowerCase()
            .includes(texto)

          ||

          (docente.matricula || "")
            .toLowerCase()
            .includes(texto)

        );

      }
    );

  return (

    <Layout>

      <div className="docentes-container">

        <div className="docentes-header">

          <h1>
            Gestión de Docentes
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
              Añadir Docente
            </button>

          </div>

        </div>

        <table className="tabla-docentes">

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

            {docentesBusqueda.map(
              (docente) => (

                <tr
                  key={
                    docente.id_usuario
                  }
                >

                  <td>

                    {docente.nombre}

                  </td>

                  <td>

                    {
                      docente.apellido_paterno
                    }

                  </td>

                  <td>

                    {docente.correo}

                  </td>

                  <td>

                    {docente.matricula}

                  </td>

                  <td>

                    {docente.grado &&
                    docente.grupo

                      ? `${docente.grado}° ${docente.grupo}`

                      : "Todos los grupos"}

                  </td>

                  <td>

                    {docente.estado

                      ? "Activo"

                      : "Inactivo"}

                  </td>

                  <td>

                    <span className="fecha-pill">

                      {new Date(

                        docente.fecha_registro

                      ).toLocaleDateString()}

                    </span>

                  </td>

                  <td>

                    <div className="acciones-tabla">

                      <button

                        className="btn-editar"

                        onClick={() => {

                          setDocenteSeleccionado(

                            docente

                          );

                          setMostrarEdit(

                            true

                          );

                        }}

                      >

                        <FaRegEdit />

                      </button>

                      <button

                        className="btn-eliminar"

                        onClick={() => {

                          setDocenteSeleccionado(

                            docente

                          );

                          setMostrarDelete(

                            true

                          );

                        }}

                      >

                        <RiDeleteBinLine />

                      </button>

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

        {mostrarCreate && (

          <CreateDocente

            onClose={() =>

              setMostrarCreate(

                false

              )

            }

          />

        )}

        {mostrarEdit &&

          docenteSeleccionado && (

            <EditDocente

              docente={

                docenteSeleccionado

              }

              onClose={() =>

                setMostrarEdit(

                  false

                )

              }

            />

          )}

        {mostrarDelete &&

          docenteSeleccionado && (

            <DeleteDocente

              docente={

                docenteSeleccionado

              }

              onClose={() =>

                setMostrarDelete(

                  false

                )

              }

            />

          )}

      </div>

    </Layout>

  );

}

export default Docentes;
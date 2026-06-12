import Layout from "../../components/Layout";
import "./Libros.css";

import { useState, useEffect } from "react";

import CreateLibro from "./CreateLibro";
import EditLibro from "./EditLibro";
import DeleteLibro from "./DeleteLibro";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import api from "../../services/api";

function Libros() {

  const [libros, setLibros] =
    useState([]);

  const [busqueda,
    setBusqueda] =
    useState("");

  const [clasificacionSeleccionada,
    setClasificacionSeleccionada] =
    useState("TODOS");

  const [mostrarModal,
    setMostrarModal] =
    useState(false);

  const [mostrarEdit,
    setMostrarEdit] =
    useState(false);

  const [mostrarDelete,
    setMostrarDelete] =
    useState(false);

  const [libroSeleccionado,
    setLibroSeleccionado] =
    useState(null);

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const esDirectora =
    usuario?.rol === "DIRECTORA";

  useEffect(() => {
    obtenerLibros();
  }, []);

  const obtenerLibros = async () => {

    try {

      const response =
        await api.get("/libros/");

      setLibros(
        response.data
      );

    } catch (error) {

      console.error(
        "Error al obtener libros:",
        error
      );

    }

  };

  const librosFiltrados =
    libros.filter((libro) => {

      const coincideClasificacion =
        clasificacionSeleccionada ===
        "TODOS"
          ? true
          : String(
              libro.categoria_id
            ) ===
            clasificacionSeleccionada;

      const textoBusqueda =
        busqueda.toLowerCase();

      const nombreCategoria =
        libro.categoria_id === 1
          ? "cuentos"
          : libro.categoria_id === 2
          ? "novela"
          : libro.categoria_id === 3
          ? "infantil"
          : "";

      const coincideBusqueda =

        nombreCategoria
          .toLowerCase()
          .includes(textoBusqueda)

        ||

        (libro.titulo || "")
          .toLowerCase()
          .includes(textoBusqueda)

        ||

        (
          libro.autor_ilustrador || ""
        )
          .toLowerCase()
          .includes(textoBusqueda)

        ||

        (libro.serie || "")
          .toLowerCase()
          .includes(textoBusqueda)

        ||

        (
          libro.procedencia || ""
        )
          .toLowerCase()
          .includes(textoBusqueda)

        ||

        String(
          libro.cantidad_total
        ).includes(
          textoBusqueda
        )

        ||

        (libro.seccion || "")
          .toLowerCase()
          .includes(textoBusqueda);

      return (
        coincideClasificacion &&
        coincideBusqueda
      );

    });

  return (

    <Layout>

      <div className="libros-container">

        <div className="libros-header">

          <div>

            <h1>
              Gestión de Libros
            </h1>

            <select
              className="filtro-clasificacion"
              value={
                clasificacionSeleccionada
              }
              onChange={(e) =>
                setClasificacionSeleccionada(
                  e.target.value
                )
              }
            >

              <option value="TODOS">
                Todas las clasificaciones
              </option>

              <option value="1">
                Cuentos
              </option>

              <option value="2">
                Novela
              </option>

              <option value="3">
                Infantil
              </option>

            </select>

          </div>

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
                  setMostrarModal(
                    true
                  )
                }
              >
                Añadir Libro
              </button>

            )}

          </div>

        </div>

        <table className="tabla-libros">

          <thead>

            <tr>
              <th>Número</th>
              <th>Clasificación</th>
              <th>Título</th>
              <th>Autor e ilustrador</th>
              <th>Serie</th>
              <th>Procedencia</th>
              <th>Cantidad</th>
              <th>Sección</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {librosFiltrados.map(
              (libro) => (

                <tr
                  key={
                    libro.id_libro
                  }
                >

                  <td>
                    {
                      libro.id_libro
                    }
                  </td>

                  <td>
                    {libro.categoria_id === 1
                      ? "Cuentos"
                      : libro.categoria_id === 2
                      ? "Novela"
                      : libro.categoria_id === 3
                      ? "Infantil"
                      : "Sin categoría"}
                  </td>

                  <td>
                    {
                      libro.titulo
                    }
                  </td>

                  <td>
                    {
                      libro.autor_ilustrador
                    }
                  </td>

                  <td>
                    {
                      libro.serie
                    }
                  </td>

                  <td>
                    {
                      libro.procedencia
                    }
                  </td>

                  <td>
                    {
                      libro.cantidad_total
                    }
                  </td>

                  <td>
                    {
                      libro.seccion
                    }
                  </td>

                  <td>

                    <div className="acciones-tabla">

                      <button
                        className="btn-editar"
                        onClick={() => {

                          setLibroSeleccionado(
                            libro
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

                            setLibroSeleccionado(
                              libro
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

        {mostrarModal && (

          <CreateLibro
            onClose={() =>
              setMostrarModal(
                false
              )
            }
          />

        )}

        {mostrarEdit &&
          libroSeleccionado && (

            <EditLibro
              libro={
                libroSeleccionado
              }
              onClose={() =>
                setMostrarEdit(
                  false
                )
              }
            />

          )}

        {mostrarDelete &&
          libroSeleccionado && (

            <DeleteLibro
              libro={
                libroSeleccionado
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

export default Libros;
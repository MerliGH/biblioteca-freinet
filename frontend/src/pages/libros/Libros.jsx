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
  const [libros, setLibros] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarEdit, setMostrarEdit] = useState(false);
  const [mostrarDelete, setMostrarDelete] = useState(false);

  const [libroSeleccionado, setLibroSeleccionado] =
    useState(null);

  useEffect(() => {
    obtenerLibros();
  }, []);

  const obtenerLibros = async () => {
    try {
      const response = await api.get("/libros/");

      setLibros(response.data);
    } catch (error) {
      console.error(
        "Error al obtener libros:",
        error
      );
    }
  };

  return (
    <Layout>
      <div className="libros-container">

        <div className="libros-header">

          <div>
            <h1>Gestión de Libros</h1>
            <p>Ver clasificación ▼</p>
          </div>

          <div className="acciones">

            <input
              type="text"
              placeholder="Buscar..."
              className="buscador"
            />

            <button
              className="btn-agregar"
              onClick={() => setMostrarModal(true)}
            >
              Añadir Libro
            </button>

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

            {libros.map((libro) => (
              <tr key={libro.id_libro}>

                <td>{libro.id_libro}</td>

                <td>{libro.categoria_id}</td>

                <td>{libro.titulo}</td>

                <td>{libro.autor_ilustrador}</td>

                <td>{libro.serie}</td>

                <td>{libro.procedencia}</td>

                <td>{libro.cantidad_total}</td>

                <td>{libro.seccion}</td>

                <td>

                  <div className="acciones-tabla">

                    <button
                      className="btn-editar"
                      onClick={() => {
                        setLibroSeleccionado(libro);
                        setMostrarEdit(true);
                      }}
                    >
                      <FaRegEdit />
                    </button>

                    <button
                      className="btn-eliminar"
                      onClick={() => {
                        setLibroSeleccionado(libro);
                        setMostrarDelete(true);
                      }}
                    >
                      <RiDeleteBinLine />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

        {mostrarModal && (
          <CreateLibro
            onClose={() =>
              setMostrarModal(false)
            }
          />
        )}

        {mostrarEdit &&
          libroSeleccionado && (
            <EditLibro
              libro={libroSeleccionado}
              onClose={() =>
                setMostrarEdit(false)
              }
            />
          )}

        {mostrarDelete &&
          libroSeleccionado && (
            <DeleteLibro
              libro={libroSeleccionado}
              onClose={() =>
                setMostrarDelete(false)
              }
            />
          )}

      </div>
    </Layout>
  );
}

export default Libros;
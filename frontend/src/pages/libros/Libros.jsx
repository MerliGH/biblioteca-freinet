import Layout from "../../components/Layout";
import "./Libros.css";

import { useState } from "react";

import CreateLibro from "./CreateLibro";
import EditLibro from "./EditLibro";
import DeleteLibro from "./DeleteLibro";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

function Libros() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarEdit, setMostrarEdit] = useState(false);
  const [mostrarDelete, setMostrarDelete] = useState(false);

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

            <tr>
              <td>1</td>
              <td>Narrativa Infantil</td>
              <td>Tiny y las alas del corazón</td>
              <td>Yemina Mascareño</td>
              <td>LUDOS</td>
              <td>Compra</td>
              <td>1</td>
              <td>L</td>

              <td>
                <div className="acciones-tabla">

                  <button
                    className="btn-editar"
                    onClick={() => setMostrarEdit(true)}
                  >
                    <FaRegEdit />
                  </button>

                  <button
                    className="btn-eliminar"
                    onClick={() => setMostrarDelete(true)}
                  >
                    <RiDeleteBinLine />
                  </button>

                </div>
              </td>

            </tr>

          </tbody>

        </table>

        {mostrarModal && (
          <CreateLibro
            onClose={() => setMostrarModal(false)}
          />
        )}

        {mostrarEdit && (
          <EditLibro
            onClose={() => setMostrarEdit(false)}
          />
        )}

        {mostrarDelete && (
          <DeleteLibro
            onClose={() => setMostrarDelete(false)}
          />
        )}

      </div>
    </Layout>
  );
}

export default Libros;
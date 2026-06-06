import Layout from "../../components/Layout";
import "./Historial.css";

import { useState } from "react";

import CreateHistorial from "./CreateHistorial";
import EditHistorial from "./EditHistorial";
import DeleteHistorial from "./DeleteHistorial";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

function Historial() {
  const [mostrarCreate, setMostrarCreate] = useState(false);
  const [mostrarEdit, setMostrarEdit] = useState(false);
  const [mostrarDelete, setMostrarDelete] = useState(false);

  return (
    <Layout>
      <div className="historial-container">

        <div className="historial-header">

          <h1>Historial de Préstamos</h1>

          <div className="acciones">

            <input
              type="text"
              placeholder="Buscar..."
              className="buscador"
            />

            <button
              className="btn-agregar"
              onClick={() => setMostrarCreate(true)}
            >
              Añadir Historial
            </button>

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

            <tr>

              <td>María López</td>

              <td>
                Tiny y las alas del corazón
              </td>

              <td>
                <span className="fecha-pill">
                  10/08/2025
                </span>
              </td>

              <td>
                <span className="fecha-pill">
                  15/08/2025
                </span>
              </td>

              <td>Devuelto</td>

              <td>Laura Gómez</td>

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

        {mostrarCreate && (
          <CreateHistorial
            onClose={() => setMostrarCreate(false)}
          />
        )}

        {mostrarEdit && (
          <EditHistorial
            onClose={() => setMostrarEdit(false)}
          />
        )}

        {mostrarDelete && (
          <DeleteHistorial
            onClose={() => setMostrarDelete(false)}
          />
        )}

      </div>
    </Layout>
  );
}

export default Historial;
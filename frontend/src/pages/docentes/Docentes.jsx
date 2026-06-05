import Layout from "../../components/Layout";
import "./Docentes.css";

import { useState } from "react";

import CreateDocente from "./CreateDocente";
import EditDocente from "./EditDocente";
import DeleteDocente from "./DeleteDocente";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

function Docentes() {
  const [mostrarCreate, setMostrarCreate] = useState(false);
  const [mostrarEdit, setMostrarEdit] = useState(false);
  const [mostrarDelete, setMostrarDelete] = useState(false);

  return (
    <Layout>
      <div className="docentes-container">

        <div className="docentes-header">

          <h1>Gestión de Docentes</h1>

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
              <th>Estado</th>
              <th>Fecha de registro</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Laura</td>
              <td>Gómez</td>
              <td>laura.gomez@escuela.edu</td>
              <td>DOC001</td>
              <td>Activo</td>
              <td>10/08/2025</td>

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

            <tr>
              <td>Carlos</td>
              <td>Ramírez</td>
              <td>carlos.ramirez@escuela.edu</td>
              <td>DOC002</td>
              <td>Activo</td>
              <td>11/08/2025</td>

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
          <CreateDocente
            onClose={() => setMostrarCreate(false)}
          />
        )}

        {mostrarEdit && (
          <EditDocente
            onClose={() => setMostrarEdit(false)}
          />
        )}

        {mostrarDelete && (
          <DeleteDocente
            onClose={() => setMostrarDelete(false)}
          />
        )}

      </div>
    </Layout>
  );
}

export default Docentes;
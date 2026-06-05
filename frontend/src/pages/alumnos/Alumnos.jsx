import Layout from "../../components/Layout";
import "./Alumnos.css";

import { useState } from "react";

import CreateAlumno from "./CreateAlumno";
import EditAlumno from "./EditAlumno";
import DeleteAlumno from "./DeleteAlumno";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

function Alumnos() {
  const [mostrarCreate, setMostrarCreate] = useState(false);
  const [mostrarEdit, setMostrarEdit] = useState(false);
  const [mostrarDelete, setMostrarDelete] = useState(false);

  return (
    <Layout>
      <div className="alumnos-container">

        <div className="alumnos-header">

          <h1>Gestión de Alumnos</h1>

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
              Añadir Alumno
            </button>

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

            <tr>
              <td>María</td>
              <td>López</td>
              <td>maria.lopez@escuela.edu</td>
              <td>A2025001</td>
              <td>3A</td>
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

          </tbody>

        </table>

        {mostrarCreate && (
          <CreateAlumno
            onClose={() => setMostrarCreate(false)}
          />
        )}

        {mostrarEdit && (
          <EditAlumno
            onClose={() => setMostrarEdit(false)}
          />
        )}

        {mostrarDelete && (
          <DeleteAlumno
            onClose={() => setMostrarDelete(false)}
          />
        )}

      </div>
    </Layout>
  );
}

export default Alumnos;
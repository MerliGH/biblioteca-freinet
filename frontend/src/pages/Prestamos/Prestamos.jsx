import "./Prestamos.css";

import { useState } from "react";

import Layout from "../../components/Layout";

import CreatePrestamo from "./CreatePrestamo";
import EditPrestamo from "./EditPrestamos";
import DeletePrestamo from "./DeletePrestamo";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

function Prestamos() {
  const [mostrarCreate, setMostrarCreate] = useState(false);
  const [mostrarEdit, setMostrarEdit] = useState(false);
  const [mostrarDelete, setMostrarDelete] = useState(false);

  return (
    <Layout>
      <div className="prestamos-container">

        <div className="prestamos-header">

          <h1>
            Gestión de Libros
            <br />
            Prestamos Activos
          </h1>

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
              Añadir Prestamo
            </button>

          </div>

        </div>

        <table className="tabla-prestamos">

          <thead>

            <tr>
              <th>Nombre del alumno</th>
              <th>Libro</th>
              <th>Autorizado por</th>
              <th>Fecha de préstamo</th>
              <th>Fecha límite</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            <tr>

              <td>Nombre del Alumno</td>

              <td>
                Tiny y las alas
                <br />
                del corazón
              </td>

              <td>Miss Luna</td>

              <td>
                <span className="fecha-pill">
                  10/8/2025
                </span>
              </td>

              <td>
                <span className="fecha-pill">
                  17/8/2025
                </span>
              </td>

              <td>Prestado</td>

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

              <td>Nombre alumno</td>

              <td>Harry Potter</td>

              <td>Miss Mariela</td>

              <td>
                <span className="fecha-pill">
                  12/8/2025
                </span>
              </td>

              <td>
                <span className="fecha-pill">
                  19/8/2025
                </span>
              </td>

              <td>Prestado</td>

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
          <CreatePrestamo
            onClose={() => setMostrarCreate(false)}
          />
        )}

        {mostrarEdit && (
          <EditPrestamo
            onClose={() => setMostrarEdit(false)}
          />
        )}

        {mostrarDelete && (
          <DeletePrestamo
            onClose={() => setMostrarDelete(false)}
          />
        )}

      </div>
    </Layout>
  );
}

export default Prestamos;
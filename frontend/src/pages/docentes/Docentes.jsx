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
  const [docentes, setDocentes] = useState([]);

  const [mostrarCreate, setMostrarCreate] = useState(false);
  const [mostrarEdit, setMostrarEdit] = useState(false);
  const [mostrarDelete, setMostrarDelete] = useState(false);

  useEffect(() => {
    obtenerDocentes();
  }, []);

  const obtenerDocentes = async () => {
    try {
      const response = await api.get("/usuarios/");

      const docentesFiltrados = response.data.filter(
        (usuario) => usuario.rol === "DOCENTE"
      );

      setDocentes(docentesFiltrados);
    } catch (error) {
      console.error("Error al obtener docentes:", error);
    }
  };

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

            {docentes.map((docente) => (
              <tr key={docente.id_usuario}>

                <td>{docente.nombre}</td>

                <td>{docente.apellido_paterno}</td>

                <td>{docente.correo}</td>

                <td>{docente.matricula}</td>

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
            ))}

          </tbody>

        </table>

        {mostrarCreate && (
          <CreateDocente
            onClose={() =>
              setMostrarCreate(false)
            }
          />
        )}

        {mostrarEdit && (
          <EditDocente
            onClose={() =>
              setMostrarEdit(false)
            }
          />
        )}

        {mostrarDelete && (
          <DeleteDocente
            onClose={() =>
              setMostrarDelete(false)
            }
          />
        )}

      </div>
    </Layout>
  );
}

export default Docentes;
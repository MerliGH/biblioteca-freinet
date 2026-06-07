import Layout from "../../components/Layout";
import "./Termometro.css";

import { useState, useEffect } from "react";

import DetailTermometro from "./DetailTermometro";
import MiniTermometro from "./MiniTermometro";

import api from "../../services/api";

function Termometro() {
  const [mostrarDetalle, setMostrarDetalle] =
    useState(false);

  const [alumnoSeleccionado, setAlumnoSeleccionado] =
    useState(null);

  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    obtenerRegistros();
  }, []);

  const obtenerRegistros = async () => {
    try {
      const [termometroRes, usuariosRes] =
        await Promise.all([
          api.get("/termometro/"),
          api.get("/usuarios/"),
        ]);

      const registrosConNombre =
        termometroRes.data.map((registro) => {
          const alumno = usuariosRes.data.find(
            (usuario) =>
              usuario.id_usuario ===
              registro.usuario_id
          );

          return {
            ...registro,
            nombreAlumno: alumno
              ? `${alumno.nombre} ${alumno.apellido_paterno}`
              : "Alumno no encontrado",

            grupo: alumno
              ? `${alumno.grado || ""}${alumno.grupo || ""}`
              : "",
          };
        });

      setRegistros(registrosConNombre);
    } catch (error) {
      console.error(
        "Error al obtener registros:",
        error
      );
    }
  };

  const abrirDetalle = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setMostrarDetalle(true);
  };

  return (
    <Layout>
      <div className="termometro-container">

        <div className="termometro-header">

          <h1>Termómetro escolar</h1>

          <input
            type="text"
            placeholder="Buscar..."
            className="buscador"
          />

        </div>

        <div className="cards-termometro">

          {registros.map((registro) => (
            <div
              key={registro.id_termometro}
              className="card-termometro"
              onClick={() =>
                abrirDetalle(registro)
              }
            >

              <h3>
                {registro.nombreAlumno}
              </h3>

              <p>
                Grupo {registro.grupo}
              </p>

              <div className="contenido-card">

                <MiniTermometro
                  libros={1}
                />

              </div>

              <p className="libros-card">
                Libro #{registro.libro_id}
              </p>

            </div>
          ))}

        </div>

        {mostrarDetalle &&
          alumnoSeleccionado && (
            <DetailTermometro
              alumno={alumnoSeleccionado}
              onClose={() =>
                setMostrarDetalle(false)
              }
            />
          )}

      </div>
    </Layout>
  );
}

export default Termometro;
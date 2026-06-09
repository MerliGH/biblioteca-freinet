import Layout from "../../components/Layout";
import "./Termometro.css";

import { useState, useEffect } from "react";

import DetailTermometro from "./DetailTermometro";
import MiniTermometro from "./MiniTermometro";

import api from "../../services/api";

function Termometro() {

  const [mostrarDetalle,
    setMostrarDetalle] =
    useState(false);

  const [alumnoSeleccionado,
    setAlumnoSeleccionado] =
    useState(null);

  const [registros,
    setRegistros] =
    useState([]);

  useEffect(() => {

    obtenerRegistros();

  }, []);

  const obtenerRegistros = async () => {

    try {

      const [
        termometroRes,
        usuariosRes,
      ] = await Promise.all([
        api.get("/termometro/"),
        api.get("/usuarios/"),
      ]);

      const agrupados = {};

      termometroRes.data.forEach(
        (registro) => {

          const alumno =
            usuariosRes.data.find(
              (usuario) =>
                usuario.id_usuario ===
                registro.usuario_id
            );

          if (!alumno) return;

          if (
            !agrupados[
              alumno.id_usuario
            ]
          ) {

            agrupados[
              alumno.id_usuario
            ] = {

              id_usuario:
                alumno.id_usuario,

              nombreAlumno:
                `${alumno.nombre} ${alumno.apellido_paterno}`,

              grupo:
                `${alumno.grado || ""}${alumno.grupo || ""}`,

              librosLeidos: 0,

              registros: [],

            };

          }

          agrupados[
            alumno.id_usuario
          ].librosLeidos++;

          agrupados[
            alumno.id_usuario
          ].registros.push(
            registro
          );

        }
      );

      setRegistros(
        Object.values(
          agrupados
        )
      );

    } catch (error) {

      console.error(
        "Error al obtener registros:",
        error
      );

    }

  };

  const abrirDetalle = (
    alumno
  ) => {

    setAlumnoSeleccionado(
      alumno
    );

    setMostrarDetalle(
      true
    );

  };

  return (

    <Layout>

      <div className="termometro-container">

        <div className="termometro-header">

          <h1>
            Termómetro escolar
          </h1>

          <input
            type="text"
            placeholder="Buscar..."
            className="buscador"
          />

        </div>

        <div className="cards-termometro">

          {registros.map(
            (registro) => (

              <div
                key={
                  registro.id_usuario
                }
                className="card-termometro"
                onClick={() =>
                  abrirDetalle(
                    registro
                  )
                }
              >

                <h3>
                  {
                    registro.nombreAlumno
                  }
                </h3>

                <p>
                  Grupo {
                    registro.grupo
                  }
                </p>

                <div className="contenido-card">

                  <MiniTermometro
                    libros={
                      registro.librosLeidos
                    }
                  />

                </div>

                <p className="libros-card">

                  {
                    registro.librosLeidos
                  } 

                </p>

              </div>

            )
          )}

        </div>

        {mostrarDetalle &&
          alumnoSeleccionado && (

            <DetailTermometro
              alumno={
                alumnoSeleccionado
              }
              onClose={() =>
                setMostrarDetalle(
                  false
                )
              }
            />

          )}

      </div>

    </Layout>

  );

}

export default Termometro;
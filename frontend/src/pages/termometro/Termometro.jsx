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

  const [busqueda,
    setBusqueda] =
    useState("");

  useEffect(() => {

    obtenerRegistros();

  }, []);

  const obtenerRegistros = async () => {

    try {

      const [
        termometroRes,
        usuariosRes,
        librosRes,
      ] = await Promise.all([
        api.get("/termometro/"),
        api.get("/usuarios/"),
        api.get("/libros/"),
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

          const libro =
            librosRes.data.find(
              (libro) =>
                libro.id_libro ===
                registro.libro_id
            );

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
          ].registros.push({

            ...registro,

            nombreLibro:
              libro?.titulo ||
              "Libro no encontrado",

          });

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

  const registrosFiltrados =
    registros.filter(
      (registro) => {

        const texto =
          busqueda.toLowerCase();

        return (

          registro.nombreAlumno
            .toLowerCase()
            .includes(texto)

          ||

          registro.grupo
            .toLowerCase()
            .includes(texto)

        );

      }
    );

  return (

    <Layout>

      <div className="termometro-container">

        <div className="termometro-header">

          <h1>
            Termómetro escolar
          </h1>

          <input
            type="text"
            placeholder="Buscar alumno o grupo..."
            className="buscador"
            value={busqueda}
            onChange={(e) =>
              setBusqueda(
                e.target.value
              )
            }
          />

        </div>

        <div className="cards-termometro">

          {registrosFiltrados.map(
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

                  {" "}libros

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
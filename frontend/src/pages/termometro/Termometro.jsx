import Layout from "../../components/Layout";
import "./Termometro.css";

import { useState, useEffect } from "react";

import DetailTermometro from "./DetailTermometro";
import MiniTermometro from "./MiniTermometro";
import CrearPRegistro from "./CrearPRegistro";

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

  const [filtroGrado,
  setFiltroGrado] =
  useState("");

  const [filtroGrupo,
    setFiltroGrupo] =
    useState("");

  const [mostrarCreate,
    setMostrarCreate] =
    useState(false);

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
              grado:

                alumno?.grado || "",

              grupoLetra:

                alumno?.grupo || "",

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

      let registrosFiltrados =

        Object.values(

          agrupados

        );

      const usuario =

        JSON.parse(

          localStorage.getItem(

            "usuario"

          )

        );

      if (

        usuario?.rol ===

          "DOCENTE" &&

        usuario?.grado &&

        usuario?.grupo

      ) {

        registrosFiltrados =

          registrosFiltrados.filter(

            (alumno) =>

              String(

                alumno.grupo

              ) ===

              `${usuario.grado}${usuario.grupo}`

          );

      }


      registrosFiltrados.sort(

        (a, b) => {

          const fechaA =

            new Date(

              a.registros[

                a.registros.length - 1

              ]?.fecha_acreditacion

            );

          const fechaB =

            new Date(

              b.registros[

                b.registros.length - 1

              ]?.fecha_acreditacion

            );

          return fechaB - fechaA;

        }

      );

     setRegistros(registrosFiltrados);

if (alumnoSeleccionado) {

  const alumnoActualizado =
    registrosFiltrados.find(
      (registro) =>
        registro.id_usuario ===
        alumnoSeleccionado.id_usuario
    );

  if (alumnoActualizado) {
    setAlumnoSeleccionado(
      alumnoActualizado
    );
  }

}

    } catch (error) {

      console.error(

        "Error al obtener registros:",

        error

      );

    }

  };
  const usuario = JSON.parse(
  localStorage.getItem(
    "usuario"
  )
);
const grados = [

  ...new Set(

    registros

      .map(

        (r) =>

          r.grado

      )

      .filter(Boolean)

  )

].sort();

const grupos = [

  ...new Set(

    registros

      .map(

        (r) =>

          r.grupoLetra

      )

      .filter(Boolean)

  )

].sort();

const mostrarFiltros =

  usuario?.rol === "DIRECTORA"

  ||

  (

    usuario?.rol === "DOCENTE"

    &&

    (

      !usuario?.grado

      ||

      !usuario?.grupo

    )

  );

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

      const coincideBusqueda =

        registro.nombreAlumno

          .toLowerCase()

          .includes(texto)

        ||

        registro.grupo

          .toLowerCase()

          .includes(texto);

      const coincideGrado =

        filtroGrado === ""

        ||

        String(

          registro.grado

        ) === filtroGrado;

      const coincideGrupo =

        filtroGrupo === ""

        ||

        String(

          registro.grupoLetra

        ) === filtroGrupo;

      return (

        coincideBusqueda

        &&

        coincideGrado

        &&

        coincideGrupo

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

        <div className="acciones">

          <div className="barra-filtros">

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

            {mostrarFiltros && (

              <>

                <select

                  className="filtro-select"

                  value={filtroGrado}

                  onChange={(e) =>

                    setFiltroGrado(

                      e.target.value

                    )

                  }

                >

                  <option value="">

                    Todos los grados

                  </option>

                  {grados.map(

                    (grado) => (

                      <option

                        key={grado}

                        value={grado}

                      >

                        {grado}°

                      </option>

                    )

                  )}

                </select>


                <select

                  className="filtro-select"

                  value={filtroGrupo}

                  onChange={(e) =>

                    setFiltroGrupo(

                      e.target.value

                    )

                  }

                >

                  <option value="">

                    Todos los grupos

                  </option>

                  {grupos.map(

                    (grupo) => (

                      <option

                        key={grupo}

                        value={grupo}

                      >

                        {grupo}

                      </option>

                    )

                  )}

                </select>

              </>

            )}

          </div>

          <button

            className="btn-agregar"

            onClick={() =>

              setMostrarCreate(

                true

              )

            }

          >

            Iniciar Termómetro

          </button>

        </div>

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

                  {" "}

                </p>

              </div>

            )

          )}

        </div>

        {mostrarDetalle &&

          alumnoSeleccionado && (

          <DetailTermometro
  alumno={alumnoSeleccionado}
  onClose={() =>
    setMostrarDetalle(false)
  }
  actualizar={obtenerRegistros}
/>

          )}

        {mostrarCreate && (

          <CrearPRegistro

            onClose={() =>

              setMostrarCreate(

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
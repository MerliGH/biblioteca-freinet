import "./CrearPRegistro.css";

import { useState, useEffect } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

import Select from "react-select";

function CrearPRegistro({ onClose }) {

  const [alumnos, setAlumnos] =
    useState([]);

  const [libros, setLibros] =
    useState([]);

  const [formData, setFormData] =
    useState({

      usuario_id: "",

      libro_id: "",

      observaciones:
        "Primer registro",

    });

  useEffect(() => {

    cargarDatos();

  }, []);

  const cargarDatos =
    async () => {

      try {

        const [

          usuariosRes,

          librosRes,

          termometroRes,

        ] = await Promise.all([

          api.get("/usuarios/"),

          api.get("/libros/"),

          api.get("/termometro/"),

        ]);

        const alumnosConTermometro =

          [

            ...new Set(

              termometroRes.data.map(

                (t) =>

                  t.usuario_id

              )

            ),

          ];

        const alumnosSinTermometro =

          usuariosRes.data.filter(

            (u) =>

              u.rol ===

                "ALUMNO" &&

              !alumnosConTermometro.includes(

                u.id_usuario

              )

          );

        setAlumnos(

          alumnosSinTermometro

        );

        setLibros(

          librosRes.data

        );

      } catch (error) {

        console.error(error);

      }

    };

  const handleChange =

    (e) => {

      const {

        name,

        value,

      } = e.target;

      setFormData({

        ...formData,

        [name]: value,

      });

    };

  const handleSubmit =

    async (e) => {

      e.preventDefault();

      try {

        const usuario =

          JSON.parse(

            localStorage.getItem(

              "usuario"

            )

          );

        await api.post(

          "/termometro/",

          {

            usuario_id:

              Number(

                formData.usuario_id

              ),

            libro_id:

              Number(

                formData.libro_id

              ),

            registrado_por:

              usuario.id_usuario,

            fecha_acreditacion:

              new Date()

                .toISOString()

                .split("T")[0],

            observaciones:

              formData.observaciones,

          }

        );

        await Swal.fire({

          icon:

            "success",

          title:

            "Registro creado",

          text:

            "El termómetro fue iniciado correctamente.",

          confirmButtonColor:

            "#173b70",

        });

        window.location.reload();

      } catch (error) {

        console.error(error);

        Swal.fire({

          icon:

            "error",

          title:

            "Error",

          text:

            "No fue posible crear el registro.",

          confirmButtonColor:

            "#173b70",

        });

      }

    };

  const opcionesAlumnos =

    alumnos.map(

      (alumno) => ({

        value:

          alumno.id_usuario,

        label:

          `${alumno.nombre} ${alumno.apellido_paterno}`,

      })

    );

  const opcionesLibros =

    libros.map(

      (libro) => ({

        value:

          libro.id_libro,

        label:

          libro.titulo,

      })

    );

  return (

    <div

      className="modal-overlay"

      onClick={onClose}

    >

      <div

        className="modal-content"

        onClick={(e) =>

          e.stopPropagation()

        }

      >

        <h1>

          Iniciar Termómetro

        </h1>

        <form

          className="termometro-form"

          onSubmit={

            handleSubmit

          }

        >

          <label>

            Alumno:

          </label>

          <Select

            classNamePrefix="biblioteca"

            options={

              opcionesAlumnos

            }

            placeholder="Buscar alumno..."

            isSearchable

            value={

              opcionesAlumnos.find(

                (opcion) =>

                  opcion.value ===

                  Number(

                    formData.usuario_id

                  )

              ) || null

            }

            onChange={(opcion) =>

              setFormData({

                ...formData,

                usuario_id:

                  opcion.value,

              })

            }

            noOptionsMessage={() =>

              "No se encontraron resultados"

            }

          />

          <label>

            Primer libro:

          </label>

          <Select

            classNamePrefix="biblioteca"

            options={

              opcionesLibros

            }

            placeholder="Buscar libro..."

            isSearchable

            value={

              opcionesLibros.find(

                (opcion) =>

                  opcion.value ===

                  Number(

                    formData.libro_id

                  )

              ) || null

            }

            onChange={(opcion) =>

              setFormData({

                ...formData,

                libro_id:

                  opcion.value,

              })

            }

            noOptionsMessage={() =>

              "No se encontraron resultados"

            }

          />

          <label>

            Observaciones:

          </label>

          <input

            type="text"

            name="observaciones"

            value={

              formData.observaciones

            }

            onChange={

              handleChange

            }

          />

          <div

            className="botones-form"

          >

            <button

              type="submit"

              className="btn-guardar"

            >

              Guardar

            </button>

            <button

              type="button"

              className="btn-cancelar"

              onClick={onClose}

            >

              Cancelar

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default CrearPRegistro;
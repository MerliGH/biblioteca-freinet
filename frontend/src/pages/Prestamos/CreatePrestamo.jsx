import "./CreatePrestamo.css";

import { useState, useEffect } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

import Select from "react-select";

function CreatePrestamo({ onClose }) {

  const usuarioLogueado =

    JSON.parse(

      localStorage.getItem(

        "usuario"

      )

    );

  const [alumnos, setAlumnos] =

    useState([]);

  const [libros, setLibros] =

    useState([]);

const [formData, setFormData] =
  useState({

    usuario_id: "",

    libro_id: "",

    autorizado_por: "",

    fecha_limite: "",

  });

  useEffect(() => {

    cargarDatos();

  }, []);

  const cargarDatos = async () => {

    try {

      const [

        usuariosResponse,

        librosResponse,

      ] = await Promise.all([

        api.get("/usuarios/"),

        api.get("/libros/"),

      ]);

      let alumnosFiltrados =

        usuariosResponse.data.filter(

          (u) =>

            u.rol === "ALUMNO"

        );

      if (

        usuarioLogueado?.rol ===

        "DOCENTE" &&

        usuarioLogueado?.grado &&

        usuarioLogueado?.grupo

      ) {

        alumnosFiltrados =

          alumnosFiltrados.filter(

            (alumno) =>

              String(

                alumno.grado

              ) ===

              String(

                usuarioLogueado.grado

              ) &&

              String(

                alumno.grupo

              )

                .trim()

                .toUpperCase() ===

              String(

                usuarioLogueado.grupo

              )

                .trim()

                .toUpperCase()

          );

      }

      setAlumnos(

        alumnosFiltrados

      );

      setLibros(

        librosResponse.data.filter(

          (libro) =>

            libro.cantidad_disponible > 0

        )

      );

    } catch (error) {

      console.error(error);

    }

  };

  const handleChange = (e) => {

    const {

      name,

      value,

    } = e.target;

    setFormData({

      ...formData,

      [name]: value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(

        "/prestamos/",

        {

          usuario_id:

            Number(

              formData.usuario_id

            ),

          libro_id:

            Number(

              formData.libro_id

            ),

          autorizado_por:

            Number(

              usuarioLogueado.id_usuario

            ),

          fecha_limite:
  formData.fecha_limite,

fecha_devolucion:
  null,

estado:
  "PRESTADO",
        }

      );

      await Swal.fire({

        icon: "success",

        title: "¡Préstamo creado!",

        text:

          "El préstamo fue registrado correctamente.",

        confirmButtonColor:

          "#173b70",

      });

      window.location.reload();

    } catch (error) {

      console.error(error);

      Swal.fire({

        icon: "error",

        title: "Error",

        text:

          "No se pudo crear el préstamo.",

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

          `${libro.titulo} (${libro.cantidad_disponible} disponibles)`,

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

          Agregar préstamo

        </h1>

        <form

          className="prestamo-form"

          onSubmit={handleSubmit}

        >

          <label>

            Nombre del Alumno:

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

            onChange={

              (opcion) =>

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

            Libro:

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

            onChange={

              (opcion) =>

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

            Autorizado por:

          </label>

          <input
            type="text"
            value={
              `${usuarioLogueado.nombre ?? ""} ${usuarioLogueado.apellido_paterno ?? ""
                }`.trim()
            }
            disabled
          />

          <label>

            Fecha límite:

          </label>

          <input
  type="date"
  name="fecha_limite"
  value={formData.fecha_limite}
  onChange={handleChange}
  min={new Date().toISOString().split("T")[0]}
  required
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

export default CreatePrestamo;
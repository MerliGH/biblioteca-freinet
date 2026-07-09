import "./CrearPRegistro.css";

import { useState, useEffect } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

import Select from "react-select";

function CrearPRegistro({ onClose }) {

const usuarioLogueado =
  JSON.parse(
    localStorage.getItem("usuario")
  );

  const [alumnos, setAlumnos] =
    useState([]);

    
  const [libros, setLibros] =
    useState([]);
const [todosLosLibros, setTodosLosLibros] =
  useState([]);

  const [formData, setFormData] =
    useState({

      usuario_id: "",

      libro_id: "",

      observaciones:
        "",

    });

    const [prestamos, setPrestamos] =
  useState([]);

const [registrosTermometro, setRegistrosTermometro] =
  useState([]);

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
  prestamosRes,
] = await Promise.all([
  api.get("/usuarios/"),
  api.get("/libros/"),
  api.get("/termometro/"),
  api.get("/prestamos/"),
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
let alumnosFiltrados =
  alumnosSinTermometro;

if (
  usuarioLogueado?.rol === "DOCENTE" &&
  usuarioLogueado?.grado &&
  usuarioLogueado?.grupo
) {

  alumnosFiltrados =
    alumnosFiltrados.filter(
      (alumno) =>
        String(alumno.grado) ===
          String(usuarioLogueado.grado) &&

        String(alumno.grupo)
          .trim()
          .toUpperCase() ===

        String(usuarioLogueado.grupo)
          .trim()
          .toUpperCase()
    );

}
        setAlumnos(

  alumnosFiltrados

);
        setTodosLosLibros(librosRes.data);

setLibros(librosRes.data);
        setPrestamos(
  prestamosRes.data
);

setRegistrosTermometro(
  termometroRes.data
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
console.log(error.response);
console.log(error.response.data);
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

          Iniciar termómetro

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

            onChange={(opcion) => {

  const alumnoId = opcion.value;

  const prestamosDevueltos = prestamos.filter(
    (prestamo) =>
      prestamo.usuario_id === alumnoId &&
      prestamo.estado === "DEVUELTO"
  );

  const librosYaRegistrados =
    registrosTermometro
      .filter(
        (registro) =>
          registro.usuario_id === alumnoId
      )
      .map(
        (registro) =>
          registro.libro_id
      );

  const librosDisponibles =
  todosLosLibros.filter(
      (libro) =>

        prestamosDevueltos.some(
          (prestamo) =>
            prestamo.libro_id ===
            libro.id_libro
        )

        &&

        !librosYaRegistrados.includes(
          libro.id_libro
        )

    );

  setLibros(
    librosDisponibles
  );

  setFormData({

    ...formData,

    usuario_id: alumnoId,

    libro_id: "",

  });

}}

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

        onChange={(opcion) => {
  setFormData((prev) => ({
    ...prev,
    libro_id: opcion.value,
  }));
}}

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
placeholder="Anotaciones..."
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
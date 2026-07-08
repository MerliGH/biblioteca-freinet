import "./CrearPRegistro.css";

import { useState, useEffect } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

import Select from "react-select";

function RegistrarLectura({
  onClose,
  alumno,
  prestamo,
  actualizar,
}) {

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

  //useEffect(() => {

   // cargarDatos();

 // }, []);

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

        setAlumnos(

          alumnosSinTermometro

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

await api.post("/termometro/", {
  usuario_id: alumno.id_usuario,
  libro_id: prestamo.libro_id,
  registrado_por: usuario.id_usuario,
  observaciones: formData.observaciones,
});

        await Swal.fire({

          icon:

            "success",

          title:

            "Lectura creada",

          text:

            "La lectura fue acreditada correctamente.",

          confirmButtonColor:

            "#173b70",

        });

      if (actualizar) {
  await actualizar();
}

await new Promise((resolve) =>
  setTimeout(resolve, 100)
);

onClose();

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

          Acreditar lectura

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

         <label></label>

<input
  type="text"
  value={alumno.nombreAlumno}
  disabled
/>

         <label>Libro:</label>

<input
  type="text"
  value={prestamo.tituloLibro}
  disabled
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

export default RegistrarLectura;
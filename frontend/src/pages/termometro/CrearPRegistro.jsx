import "./CrearPRegistro.css";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/api";

function CrearPRegistro({ onClose }) {

  const [alumnos,
    setAlumnos] =
    useState([]);

  const [libros,
    setLibros] =
    useState([]);

  const [formData,
    setFormData] =
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

          <select
            name="usuario_id"
            value={
              formData.usuario_id
            }
            onChange={
              handleChange
            }
            required
          >

            <option value="">
              Seleccionar alumno
            </option>

            {alumnos.map(
              (alumno) => (

                <option
                  key={
                    alumno.id_usuario
                  }
                  value={
                    alumno.id_usuario
                  }
                >

                  {alumno.nombre}
                  {" "}
                  {
                    alumno.apellido_paterno
                  }

                </option>

              )
            )}

          </select>

          <label>
            Primer libro:
          </label>

          <select
            name="libro_id"
            value={
              formData.libro_id
            }
            onChange={
              handleChange
            }
            required
          >

            <option value="">
              Seleccionar libro
            </option>

            {libros.map(
              (libro) => (

                <option
                  key={
                    libro.id_libro
                  }
                  value={
                    libro.id_libro
                  }
                >

                  {
                    libro.titulo
                  }

                </option>

              )
            )}

          </select>

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

          <div className="botones-form">

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
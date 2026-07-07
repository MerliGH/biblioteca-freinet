import "./EditPrestamo.css";

import { useState, useEffect } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

function EditPrestamo({

  prestamo,

  onClose,

}) {

  const [alumnos, setAlumnos] =
    useState([]);

  const [docentes, setDocentes] =
    useState([]);

  const [libros, setLibros] =
    useState([]);

  const [fechaPrestamo] =
    useState(
      prestamo?.fecha_prestamo
        ?.split("T")[0] || ""
    );

  const [formData, setFormData] =
    useState({

      usuario_id:
        prestamo?.usuario_id || "",

      libro_id:
        prestamo?.libro_id || "",

      autorizado_por:
        prestamo?.autorizado_por || "",

      fecha_limite:
        prestamo?.fecha_limite
          ?.split("T")[0] || "",

      fecha_devolucion:
        prestamo?.fecha_devolucion
          ?.split("T")[0] || "",

      estado:
        prestamo?.estado ||
        "PRESTADO",

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

      setAlumnos(

        usuariosResponse.data.filter(

          (u) =>

            u.rol === "ALUMNO"

        )

      );

      setDocentes(

        usuariosResponse.data.filter(

          (u) =>

            u.rol === "DOCENTE"

            ||

            u.rol === "DIRECTORA"

        )

      );

      setLibros(

        librosResponse.data.filter(

          (libro) =>

            libro.cantidad_disponible > 0

            ||

            libro.id_libro ===

            prestamo.libro_id

        )

      );

    } catch (error) {

      console.error(

        "Error al cargar datos:",

        error

      );

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

      await api.put(

        `/prestamos/${prestamo.id_prestamo}`,

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

              formData.autorizado_por

            ),

          fecha_limite:

            formData.fecha_limite,

          fecha_devolucion:

            formData.fecha_devolucion ||

            null,

          estado:

            formData.estado,

        }

      );

      await Swal.fire({

        icon: "success",

        title:

          "¡Préstamo actualizado!",

        text:

          "Los datos fueron actualizados correctamente.",

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

          "No se pudo actualizar el préstamo.",

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

          Editar préstamo
        </h1>

        <form

          className="prestamo-form"

          onSubmit={handleSubmit}

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

          >

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

                  {alumno.nombre}{" "}

                  {

                    alumno.apellido_paterno

                  }

                </option>

              )

            )}

          </select>

          <label>

            Libro:

          </label>

          <select

            name="libro_id"

            value={

              formData.libro_id

            }

            onChange={

              handleChange

            }

          >

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

                  {libro.titulo}

                  {" ("}

                  {

                    libro.cantidad_disponible

                  }

                  {" disponibles)"}

                </option>

              )

            )}

          </select>

          <label>

            Autorizado por:

          </label>

          <select

            name="autorizado_por"

            value={

              formData.autorizado_por

            }

            onChange={

              handleChange

            }

          >

            {docentes.map(

              (docente) => (

                <option

                  key={

                    docente.id_usuario

                  }

                  value={

                    docente.id_usuario

                  }

                >

                  {docente.nombre}{" "}

                  {

                    docente.apellido_paterno

                  }

                </option>

              )

            )}

          </select>

          <label>

            Fecha de préstamo:

          </label>

          <input

            type="date"

            value={

              fechaPrestamo

            }

            disabled

          />

          <label>

            Fecha límite:

          </label>

          <input

            type="date"

            name="fecha_limite"

            value={

              formData.fecha_limite

            }

            onChange={

              handleChange

            }

          />

          <label>

            Fecha devolución:

          </label>

          <input

            type="date"

            name="fecha_devolucion"

            value={

              formData.fecha_devolucion

            }

            onChange={

              handleChange

            }

          />

          <label>

            Estado:

          </label>

          <select

            name="estado"

            value={

              formData.estado

            }

            onChange={

              handleChange

            }

          >

            <option value="PRESTADO">

              PRESTADO

            </option>

            <option value="DEVUELTO">

              DEVUELTO

            </option>

            <option value="VENCIDO">

              VENCIDO

            </option>

          </select>

          <div

            className="botones-form"

          >

            <button

              type="submit"

              className="btn-guardar"

            >

              Actualizar

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

export default EditPrestamo;
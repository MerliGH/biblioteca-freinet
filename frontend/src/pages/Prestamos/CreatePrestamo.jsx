import "./CreatePrestamo.css";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/api";

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
      fecha_devolucion: "",
      estado: "PRESTADO",
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

const usuarioLogueado =
  JSON.parse(
    localStorage.getItem(
      "usuario"
    )
  );

let alumnosFiltrados =
  usuariosResponse.data.filter(
    (u) =>
      u.rol === "ALUMNO"
  );

// Si es docente con grupo asignado
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
        librosResponse.data
      );

    } catch (error) {

      console.error(error);

    }

  };

  const handleChange = (e) => {

    const { name, value } =
      e.target;

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
          usuario_id: Number(
            formData.usuario_id
          ),

          libro_id: Number(
            formData.libro_id
          ),

          autorizado_por: Number(
            usuarioLogueado.id_usuario
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
        title: "¡Préstamo creado!",
        text: "El préstamo fue registrado correctamente.",
        confirmButtonColor: "#173b70",
      });

      window.location.reload();

    } catch (error) {

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el préstamo.",
        confirmButtonColor: "#173b70",
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
          AGREGAR PRÉSTAMO
        </h1>

        <form
          className="prestamo-form"
          onSubmit={handleSubmit}
        >

          <label>
            Nombre del Alumno:
          </label>

          <select
            name="usuario_id"
            value={
              formData.usuario_id
            }
            onChange={handleChange}
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
                  {alumno.nombre}{" "}
                  {
                    alumno.apellido_paterno
                  }
                </option>
              )
            )}

          </select>

          <label>Libro:</label>

          <select
            name="libro_id"
            value={formData.libro_id}
            onChange={handleChange}
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
                  {libro.titulo}
                </option>
              )
            )}

          </select>

          <label>
            Autorizado por:
          </label>

          <input
            type="text"
            value={`${usuarioLogueado.nombre} ${usuarioLogueado.apellido_paterno || ""}`}
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
            onChange={handleChange}
            required
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
            onChange={handleChange}
          />

          <label>
            Estado:
          </label>

          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
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

export default CreatePrestamo;
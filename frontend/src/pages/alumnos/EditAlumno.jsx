import "./CreateAlumno.css";

import { useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";

function EditAlumno({
  alumno,
  onClose,
}) {

  const [formData, setFormData] =
    useState({
      nombre: alumno?.nombre || "",
      apellido_paterno:
        alumno?.apellido_paterno || "",
      apellido_materno:
        alumno?.apellido_materno || "",
      correo: alumno?.correo || "",
      password: null,
      matricula:
        alumno?.matricula || "",
      rol: "ALUMNO",
      grado: alumno?.grado || "",
      grupo: alumno?.grupo || "",
      estado:
        alumno?.estado ?? true,
    });

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

      await api.put(
  `/usuarios/${alumno.id_usuario}`,
  {
    ...formData,
    password: null,
  }
);

      await Swal.fire({
        icon: "success",
        title: "¡Alumno actualizado!",
        text: "Los datos fueron actualizados correctamente.",
        confirmButtonColor: "#173b70",
      });

      window.location.reload();

    } catch (error) {

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el alumno.",
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

        <h1>Editar alumno</h1>

        <form
          className="alumno-form"
          onSubmit={handleSubmit}
        >

          <label>Nombre:</label>

          <input
            type="text"
            name="nombre"
              required
            value={formData.nombre}
            onChange={handleChange}
          />

          <label>Apellido:</label>

          <input
            type="text"
            name="apellido_paterno"
              required
            value={formData.apellido_paterno}
            onChange={handleChange}
          />

          <label>Apellido Materno:</label>

          <input
            type="text"
            name="apellido_materno"
            value={formData.apellido_materno}
            onChange={handleChange}
          />

          <label>Correo:</label>

          <input
            type="email"
            name="correo"
              required
            value={formData.correo}
            onChange={handleChange}
          />

         

          <label>Matrícula:</label>

          <input
            type="text"
            name="matricula"
              required
            value={formData.matricula}
            onChange={handleChange}
          />

          <label>Grado:</label>

          <select
  name="grado"
  value={formData.grado}
  onChange={handleChange}
>
  <option value="1">1°</option>
  <option value="2">2°</option>
  <option value="3">3°</option>
  <option value="4">4°</option>
  <option value="5">5°</option>
  <option value="6">6°</option>
</select>

          <label>Grupo:</label>

          <select
  name="grupo"
  value={formData.grupo}
  onChange={handleChange}
>
  <option value="A">A</option>
  <option value="B">B</option>

</select>

          <label>Estado:</label>

          <select
            value={
              formData.estado
                ? "Activo"
                : "Inactivo"
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                estado:
                  e.target.value ===
                  "Activo",
              })
            }
          >
            <option value="Activo">
              Activo
            </option>

            <option value="Inactivo">
              Inactivo
            </option>
          </select>

          <div className="botones-form">

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

export default EditAlumno;
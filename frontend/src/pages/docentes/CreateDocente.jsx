import "./CreateDocente.css";

import { useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";

function CreateDocente({ onClose }) {

  const [formData, setFormData] =
    useState({
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      correo: "",
      password: "",
      matricula: "",
      rol: "DOCENTE",
      estado: true,
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

      await api.post(
        "/usuarios/",
        {
          ...formData,
          estado:
            Boolean(
              formData.estado
            ),
        }
      );

      await Swal.fire({
        icon: "success",
        title: "¡Docente creado!",
        text:
          "El docente fue registrado correctamente.",
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
          "No se pudo crear el docente.",
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
          AGREGAR DOCENTE
        </h1>

        <form
          className="docente-form"
          onSubmit={handleSubmit}
        >

          <label>
            Nombre:
          </label>

          <input
            type="text"
            name="nombre"
            value={
              formData.nombre
            }
            onChange={
              handleChange
            }
            placeholder="Ingrese nombre"
          />

          <label>
            Apellido:
          </label>

          <input
            type="text"
            name="apellido_paterno"
            value={
              formData.apellido_paterno
            }
            onChange={
              handleChange
            }
            placeholder="Ingrese apellido"
          />

          <label>
            Apellido Materno:
          </label>

          <input
            type="text"
            name="apellido_materno"
            value={
              formData.apellido_materno
            }
            onChange={
              handleChange
            }
            placeholder="Ingrese apellido materno"
          />

          <label>
            Correo:
          </label>

          <input
            type="email"
            name="correo"
            value={
              formData.correo
            }
            onChange={
              handleChange
            }
            placeholder="correo@ejemplo.com"
          />

          <label>
            Contraseña:
          </label>

          <input
            type="password"
            name="password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            placeholder="********"
          />

          <label>
            Matrícula:
          </label>

          <input
            type="text"
            name="matricula"
            value={
              formData.matricula
            }
            onChange={
              handleChange
            }
            placeholder="DOC001"
          />

          <label>
            Estado:
          </label>

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
                  e.target
                    .value ===
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

export default CreateDocente;
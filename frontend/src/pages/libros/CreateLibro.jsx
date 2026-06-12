import "./CreateLibro.css";

import { useState } from "react";
import api from "../../services/api";

import Swal from "sweetalert2";

function CreateLibro({ onClose }) {

  const [formData, setFormData] = useState({
    categoria_id: "",
    titulo: "",
    autor_ilustrador: "",
    serie: "",
    procedencia: "",
    cantidad_total: 1,
    cantidad_disponible: 1,
    seccion: "",
    estado: true,
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "categoria_id" ||
        name === "cantidad_total" ||
        name === "cantidad_disponible"
          ? Number(value)
          : value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/libros/",
        formData
      );

      await Swal.fire({
        icon: "success",
        title: "¡Libro creado!",
        text: "El libro fue registrado correctamente.",
        confirmButtonColor: "#173b70",
      });

      onClose();

      window.location.reload();

    } catch (error) {

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el libro.",
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

        <h1>AGREGAR LIBRO</h1>

        <form
          className="libro-form"
          onSubmit={handleSubmit}
        >

          <label>Clasificación:</label>

          <select
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
            required
          >

            <option value="">
              Seleccionar clasificación
            </option>

            <option value="1">
              Cuentos
            </option>

            <option value="2">
              Novela
            </option>

            <option value="3">
              Infantil
            </option>

          </select>

          <label>Título:</label>

          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ingrese el título"
            required
          />

          <label>
            Autor e ilustrador:
          </label>

          <input
            type="text"
            name="autor_ilustrador"
            value={formData.autor_ilustrador}
            onChange={handleChange}
            placeholder="Ingrese autor"
          />

          <label>Serie:</label>

          <input
            type="text"
            name="serie"
            value={formData.serie}
            onChange={handleChange}
            placeholder="Serie"
          />

          <label>Procedencia:</label>

          <input
            type="text"
            name="procedencia"
            value={formData.procedencia}
            onChange={handleChange}
            placeholder="Procedencia"
          />

          <label>
            Cantidad en Existencia:
          </label>

          <input
            type="number"
            name="cantidad_total"
            min="1"
            value={formData.cantidad_total}
            onChange={handleChange}
            required
          />

          <label>Sección:</label>

          <input
            type="text"
            name="seccion"
            value={formData.seccion}
            onChange={handleChange}
            placeholder="Ejemplo: L"
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

export default CreateLibro;
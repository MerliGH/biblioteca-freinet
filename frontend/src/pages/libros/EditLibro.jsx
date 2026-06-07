import "./CreateLibro.css";

import { useState } from "react";
import api from "../../services/api";

function EditLibro({ libro, onClose }) {
  const [formData, setFormData] = useState({
    categoria_id: libro?.categoria_id || "",
    titulo: libro?.titulo || "",
    autor_ilustrador: libro?.autor_ilustrador || "",
    serie: libro?.serie || "",
    procedencia: libro?.procedencia || "",
    cantidad_total: libro?.cantidad_total || 1,
    cantidad_disponible:
      libro?.cantidad_disponible || 1,
    seccion: libro?.seccion || "",
    estado: libro?.estado ?? true,
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
      await api.put(
        `/libros/${libro.id_libro}`,
        formData
      );

      alert(
        "Libro actualizado correctamente"
      );

      window.location.reload();

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        "Error al actualizar el libro"
      );
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
        <h1>EDITAR LIBRO</h1>

        <form
          className="libro-form"
          onSubmit={handleSubmit}
        >

          <label>Clasificación:</label>

          <select
            name="categoria_id"
            value={
              formData.categoria_id
            }
            onChange={handleChange}
          >
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
          />

          <label>
            Autor e ilustrador:
          </label>

          <input
            type="text"
            name="autor_ilustrador"
            value={
              formData.autor_ilustrador
            }
            onChange={handleChange}
          />

          <label>Serie:</label>

          <input
            type="text"
            name="serie"
            value={formData.serie}
            onChange={handleChange}
          />

          <label>Procedencia:</label>

          <input
            type="text"
            name="procedencia"
            value={
              formData.procedencia
            }
            onChange={handleChange}
          />

          <label>
            Cantidad en Existencia:
          </label>

          <input
            type="number"
            name="cantidad_total"
            value={
              formData.cantidad_total
            }
            onChange={handleChange}
          />

          <label>Sección:</label>

          <input
            type="text"
            name="seccion"
            value={formData.seccion}
            onChange={handleChange}
          />

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

export default EditLibro;
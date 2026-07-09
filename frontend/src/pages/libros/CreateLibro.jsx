import "./CreateLibro.css";

import { useState } from "react";
import api from "../../services/api";

import Swal from "sweetalert2";
import Select from "react-select";

function CreateLibro({ onClose, categorias }) {

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

const opcionesCategorias = categorias.map((categoria) => ({
  value: categoria.id_categoria,
  label: categoria.nombre,
}));


  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "cantidad_total") {

  const cantidad = Number(value);

  setFormData({
    ...formData,
    cantidad_total: cantidad,
    cantidad_disponible: cantidad,
  });

  return;
}

 

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/libros/",
        {
          ...formData,
          cantidad_disponible: Math.min(
            formData.cantidad_disponible,
            formData.cantidad_total
          ),
        }
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

        <h1>Agregar libro</h1>

        <form
          className="libro-form"
          onSubmit={handleSubmit}
        >

          <label>Clasificación:</label>

          <Select

            options={opcionesCategorias}

            placeholder="Buscar clasificación..."

            isSearchable

            value={
              opcionesCategorias.find(
                (opcion) =>
                  opcion.value === formData.categoria_id
              ) || null
            }

            onChange={(opcion) =>

              setFormData({
                ...formData,
                categoria_id: opcion.value,
              })

            }

            noOptionsMessage={() =>
              "No se encontraron resultados"
            }

          />

          <label>Título:</label>

          <input

            type="text"

            name="titulo"

            value={formData.titulo}

            onChange={handleChange}

            placeholder="Ingrese el título"

            required

          />

          <label>Autor e ilustrador:</label>

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
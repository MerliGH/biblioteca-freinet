import "./CreateLibro.css";

import { useState } from "react";

import api from "../../services/api";

import Swal from "sweetalert2";

import Select from "react-select";

function EditLibro({ libro, onClose }) {

  const [formData, setFormData] = useState({

    categoria_id:
      libro?.categoria_id || "",

    titulo:
      libro?.titulo || "",

    autor_ilustrador:
      libro?.autor_ilustrador || "",

    serie:
      libro?.serie || "",

    procedencia:
      libro?.procedencia || "",

    cantidad_total:
      libro?.cantidad_total || 1,

    cantidad_disponible:
      libro?.cantidad_disponible || 1,

    seccion:
      libro?.seccion || "",

    estado:
      libro?.estado ?? true,

  });

  const opcionesCategorias = [

    {
      value: 1,
      label: "Cuentos",
    },

    {
      value: 2,
      label: "Novela",
    },

    {
      value: 3,
      label: "Infantil",
    },

  ];

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "cantidad_total") {

      const cantidad = Number(value);

      setFormData({

        ...formData,

        cantidad_total: cantidad,

        cantidad_disponible:

          Math.min(

            formData.cantidad_disponible,

            cantidad

          ),

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

      const datosActualizados = {

        ...formData,

        cantidad_disponible:

          Math.min(

            formData.cantidad_disponible,

            formData.cantidad_total

          ),

      };

      await api.put(

        `/libros/${libro.id_libro}`,

        datosActualizados

      );

      await Swal.fire({

        icon: "success",

        title: "¡Libro actualizado!",

        text: "Los cambios fueron guardados correctamente.",

        confirmButtonColor: "#173b70",

      });

      onClose();

      window.location.reload();

    } catch (error) {

      console.error(error);

      Swal.fire({

        icon: "error",

        title: "Error al actualizar",

        text:

          error.response?.data?.detail ||

          "No se pudo actualizar el libro.",

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

        <h1>EDITAR LIBRO</h1>

        <form

          className="libro-form"

          onSubmit={handleSubmit}

        >

          <label>

            Clasificación:

          </label>

          <Select

            classNamePrefix="biblioteca"

            options={opcionesCategorias}

            placeholder="Buscar clasificación..."

            isSearchable

            value={

              opcionesCategorias.find(

                (opcion) =>

                  opcion.value ===

                  formData.categoria_id

              ) || null

            }

            onChange={(opcion) =>

              setFormData({

                ...formData,

                categoria_id:

                  opcion.value,

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

          <label>

            Procedencia:

          </label>

          <input

            type="text"

            name="procedencia"

            value={formData.procedencia}

            onChange={handleChange}

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

          />

          <label>

            Sección:

          </label>

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
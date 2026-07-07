import "./EditDocente.css";

import { useState } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

function EditDocente({
  docente,
  onClose,
}) {

  const [formData, setFormData] =
    useState({

      nombre:
        docente?.nombre || "",

      apellido_paterno:
        docente?.apellido_paterno || "",

      apellido_materno:
        docente?.apellido_materno || "",

      correo:
        docente?.correo || "",

      password:
        docente?.password || "",

      matricula:
        docente?.matricula || "",

      rol: "DOCENTE",

      grado:
        docente?.grado || "",

      grupo:
        docente?.grupo || "",

      estado:
        docente?.estado ?? true,

    });

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
if (
  (formData.grado === "" && formData.grupo !== "") ||
  (formData.grado !== "" && formData.grupo === "")
) {
  Swal.fire({
    icon: "warning",
    title: "Selección inválida",
    text: "Seleccione un grado y un grupo, o deje ambos en 'Todos'.",
    confirmButtonColor: "#173b70",
  });
  return;
}

    try {

    await api.put(
  `/usuarios/${docente.id_usuario}`,
  {
    ...formData,
    grado: formData.grado || null,
    grupo: formData.grupo || null,
  }
);

      await Swal.fire({

        icon: "success",

        title:
          "¡Docente actualizado!",

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
          "No se pudo actualizar el docente.",

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

          Editar docente

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

        <label>Grado:</label>

<select
  name="grado"
  value={formData.grado}
  onChange={handleChange}
>
  <option value="">Todos los grados</option>
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
  <option value="">Todos los grupos</option>
  <option value="A">A</option>
  <option value="B">B</option>
</select>

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

export default EditDocente;
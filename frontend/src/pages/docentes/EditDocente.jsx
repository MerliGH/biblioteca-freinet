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

    try {

      await api.put(

        `/usuarios/${docente.id_usuario}`,

        formData

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

          EDITAR DOCENTE

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

            Grado:

          </label>

          <input

            type="text"

            name="grado"

            value={

              formData.grado

            }

            onChange={

              handleChange

            }

            placeholder="Ejemplo: 3"

          />

          <label>

            Grupo:

          </label>

          <input

            type="text"

            name="grupo"

            value={

              formData.grupo

            }

            onChange={

              handleChange

            }

            placeholder="Ejemplo: A"

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
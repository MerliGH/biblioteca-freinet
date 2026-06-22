import { useState } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

import "./CreateCategoria.css";

function EditCategoria({

  categoria,

  onClose

}) {

  const [nombre,
    setNombre] =
    useState(

      categoria.nombre

    );

  const [descripcion,
    setDescripcion] =
    useState(

      categoria.descripcion || ""

    );

  const editarCategoria =
    async (e) => {

    e.preventDefault();

    try {

      await api.put(

        `/categorias/${categoria.id_categoria}`,

        {

          nombre,

          descripcion,

          estado:

            categoria.estado

        }

      );

      await Swal.fire({

        icon:"success",

        title:"Clasificación actualizada",

        text:"La categoría se actualizó correctamente.",

        confirmButtonColor:"#173b70"

      });

      onClose();

      window.location.reload();

    } catch (error) {

      console.error(

        "Error al editar clasificación:",

        error

      );

      Swal.fire({

        icon:"error",

        title:"Error",

        text:"No se pudo actualizar la clasificación.",

        confirmButtonColor:"#173b70"

      });

    }

  };

  return (

    <div className="modal-overlay">

      <div className="modal-content">

        <h2>

          Editar clasificación

        </h2>

        <form

          onSubmit={

            editarCategoria

          }

        >

          <div className="grupo-input">

            <label>

              Nombre

            </label>

            <input

              type="text"

              value={nombre}

              onChange={(e) =>

                setNombre(

                  e.target.value

                )

              }

              required

            />

          </div>

          <div className="grupo-input">

            <label>

              Descripción

            </label>

            <textarea

              value={descripcion}

              onChange={(e) =>

                setDescripcion(

                  e.target.value

                )

              }

            />

          </div>

          <div className="botones-modal">

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

export default EditCategoria;
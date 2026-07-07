import { useState } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

import "./CreateCategoria.css";

function CreateCategoria({ onClose }) {

  const [nombre,
    setNombre] =
    useState("");

  const [descripcion,
    setDescripcion] =
    useState("");

  const guardarCategoria =
    async (e) => {

    e.preventDefault();

    try {

      await api.post(

        "/categorias/",

        {

          nombre,

          descripcion,

          estado: true,

        }

      );

      await Swal.fire({

        icon:"success",

        title:"Clasificación agregada",

        text:"La clasificación se registró correctamente.",

        confirmButtonColor:"#173b70"

      });

      onClose();

      window.location.reload();

    } catch (error) {

      console.error(

        "Error al crear clasificación:",

        error

      );

      Swal.fire({

        icon:"error",

        title:"Error",

        text:"No se pudo registrar la clasificación.",

        confirmButtonColor:"#173b70"

      });

    }

  };

  return (

    <div className="modal-overlay">

      <div className="modal-content">

        <h2>

          Nueva clasificación

        </h2>

        <form

          onSubmit={

            guardarCategoria

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

export default CreateCategoria;
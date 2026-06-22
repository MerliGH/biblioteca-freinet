import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

import EditCategoria from "./EditCategoria";

import "./AdministrarCategorias.css";

function AdministrarCategorias({
  categorias,
  onClose,
  onActualizar
}) {

  const [mostrarEdit,
    setMostrarEdit] =
    useState(false);

  const [categoriaSeleccionada,
    setCategoriaSeleccionada] =
    useState(null);

  return (

    <div className="modal-overlay">

      <div className="modal-categorias">

        <div className="header-categorias">

          <h2>

            Administrar clasificaciones

          </h2>

          <button
            className="cerrar"
            onClick={onClose}
          >

            ✕

          </button>

        </div>

        <div className="lista-categorias">

          {categorias.map((categoria) => (

            <div
              key={categoria.id_categoria}
              className="categoria-item"
            >

              <span>

                {categoria.nombre}

              </span>

              <button
                className="btn-editar"
                onClick={() => {

                  setCategoriaSeleccionada(
                    categoria
                  );

                  setMostrarEdit(
                    true
                  );

                }}
              >

                <FaRegEdit />

              </button>

            </div>

          ))}

        </div>

      </div>

      {mostrarEdit &&

        categoriaSeleccionada && (

          <EditCategoria

            categoria={
              categoriaSeleccionada
            }

            onClose={() => {

              setMostrarEdit(
                false
              );

              onActualizar();

            }}

          />

      )}

    </div>

  );

}

export default AdministrarCategorias;
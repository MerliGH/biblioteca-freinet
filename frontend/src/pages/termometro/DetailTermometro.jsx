import "./DetailTermometro.css";

import { useState } from "react";

import RegistrosAlumno from "./RegistrosAlumno";
import TermometroVisual from "./TermometroVisual";

function DetailTermometro({
  alumno,
  onClose,
}) {
  const [mostrarRegistros, setMostrarRegistros] =
    useState(false);

  const libros = alumno.libros;

  let nivel = "Verde";
  let faltan = 0;

  if (libros >= 26) {
    nivel = "Platino";
    faltan = 0;
  }

  else if (libros >= 25) {
    nivel = "Dorado";
    faltan = 1;
  }

  else if (libros >= 20) {
    nivel = "Rojo";
    faltan = 25 - libros;
  }

  else if (libros >= 15) {
    nivel = "Amarillo";
    faltan = 20 - libros;
  }

  else if (libros >= 5) {
    nivel = "Verde";
    faltan = 15 - libros;
  }

  return (
    <>
      <div
        className="modal-overlay"
        onClick={onClose}
      >
        <div
          className="detalle-modal"
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <h1>
            {alumno.nombre} {alumno.grupo}
          </h1>

          <div className="detalle-body">

            <div className="termometro-info">

              <TermometroVisual
                libros={libros}
              />

              <p className="total-libros">
                {libros} de 26 libros
              </p>

            </div>

            <div className="info-alumno">

              <h2>
                Nivel {nivel}
              </h2>

              <p>
                Faltan {faltan} libros para el
                siguiente nivel
              </p>

              <p>
                <strong>
                  Último libro:
                </strong>

                <br />

                {alumno.ultimoLibro}
              </p>

              <p>
                <strong>
                  Fecha:
                </strong>

                {" "}
                {alumno.fecha}
              </p>

            </div>

          </div>

          <div className="botones-detalle">

            <button
              className="btn-ver-registros"
              onClick={() =>
                setMostrarRegistros(true)
              }
            >
              Ver registros
            </button>

            <button
              className="btn-cancelar"
              onClick={onClose}
            >
              Cerrar
            </button>

          </div>

        </div>
      </div>

      {mostrarRegistros && (
        <RegistrosAlumno
          alumno={alumno}
          onClose={() =>
            setMostrarRegistros(false)
          }
        />
      )}
    </>
  );
}

export default DetailTermometro;
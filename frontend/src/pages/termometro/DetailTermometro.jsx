import "./DetailTermometro.css";

import { useState } from "react";

import RegistrosAlumno from "./RegistrosAlumno";
import TermometroVisual from "./TermometroVisual";

function DetailTermometro({
  alumno,
  onClose,
}) {

  const [mostrarRegistros,
    setMostrarRegistros] =
    useState(false);

  const libros =
    alumno.librosLeidos || 0;

  let nivel = "Sin nivel";
  let faltan = 0;

  if (libros >= 26) {

    nivel = "Platino";

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

  else {

    nivel = "Sin nivel";
    faltan = 5 - libros;

  }

  const ultimoRegistro =
    alumno.registros?.[
      alumno.registros.length - 1
    ];

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

            {alumno.nombreAlumno}

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

              {nivel === "Platino" ? (

                <p className="nivel-maximo">

                  🏆 ¡Nivel máximo alcanzado!

                </p>

              ) : (

                <p>

                  Faltan {faltan} libro
                  {faltan !== 1 ? "s" : ""}
                  para el siguiente nivel

                </p>

              )}

              <p>

                <strong>
                  Grupo:
                </strong>

                <br />

                {alumno.grupo}

              </p>

              <p>

                <strong>
                  Último registro:
                </strong>

                <br />

                {ultimoRegistro
                  ? new Date(
                      ultimoRegistro.fecha_acreditacion
                    ).toLocaleDateString()
                  : "Sin registros"}

              </p>

              <p>

                <strong>
                  Lecturas acreditadas:
                </strong>

                {" "}

                {libros}

              </p>

            </div>

          </div>

          <div className="botones-detalle">

            <button
              className="btn-ver-registros"
              onClick={() =>
                setMostrarRegistros(
                  true
                )
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
            setMostrarRegistros(
              false
            )
          }
        />

      )}

    </>

  );

}

export default DetailTermometro;
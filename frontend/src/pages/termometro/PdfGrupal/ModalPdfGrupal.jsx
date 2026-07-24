import "./ModalPdfGrupal.css";

import { useState } from "react";
import {
  FaFilePdf,
  FaTimes
} from "react-icons/fa";

import {
  generarPDFGrupal
} from "./PdfGrupal";


function ModalPdfGrupal({
  alumnos,
  onClose,
}) {

  const [busqueda, setBusqueda] =
    useState("");


  // =====================================================
  // OBTENER GRUPOS ÚNICOS
  // =====================================================
  //
  // En Termómetro los grupos ya llegan completos:
  //
  // 3A
  // 3B
  // 4A
  //
  // Por eso NO concatenamos grado + grupo.
  // =====================================================

  const gruposUnicos = [

    ...new Set(

      alumnos
        .map(
          (alumno) =>
            String(
              alumno.grupo || ""
            )
              .trim()
              .toUpperCase()
        )
        .filter(
          (grupo) =>
            grupo !== ""
        )

    )

  ];


  // =====================================================
  // ORDENAR GRUPOS
  // =====================================================

  gruposUnicos.sort(
    (a, b) =>
      a.localeCompare(
        b,
        "es",
        {
          numeric: true
        }
      )
  );


  // =====================================================
  // FILTRAR POR BÚSQUEDA
  // =====================================================

  const gruposFiltrados =
    gruposUnicos.filter(
      (grupo) =>

        grupo
          .toLowerCase()
          .includes(
            busqueda
              .trim()
              .toLowerCase()
          )

    );


  return (

    <div className="modal-overlay">

      <div className="modal-pdf">


        {/* ============================================= */}
        {/* ENCABEZADO */}
        {/* ============================================= */}

        <div className="modal-header">

          <h2>
            Generar reporte grupal
          </h2>


          <button
            type="button"
            className="btn-cerrar"
            onClick={onClose}
          >

            <FaTimes />

          </button>

        </div>


        {/* ============================================= */}
        {/* BUSCADOR */}
        {/* ============================================= */}

        <input
          type="text"
          className="buscador-pdf"
          placeholder="Buscar grupo..."
          value={busqueda}

          onChange={(e) =>
            setBusqueda(
              e.target.value
            )
          }
        />


        {/* ============================================= */}
        {/* TABLA */}
        {/* ============================================= */}

        <table className="tabla-pdf">

          <thead>

            <tr>

              <th>
                Grupo
              </th>

              <th>
                Total alumnos
              </th>

              <th>
                PDF
              </th>

            </tr>

          </thead>


          <tbody>

            {gruposFiltrados.map(
              (grupo) => {


                // =====================================
                // ALUMNOS DE ESTE GRUPO
                // =====================================

                const alumnosGrupo =
                  alumnos.filter(
                    (alumno) =>

                      String(
                        alumno.grupo || ""
                      )
                        .trim()
                        .toUpperCase()

                      ===

                      grupo

                  );


                return (

                  <tr
                    key={grupo}
                  >


                    {/* GRUPO */}

                    <td>

                      {grupo}

                    </td>


                    {/* TOTAL ALUMNOS */}

                    <td>

                      {
                        alumnosGrupo.length
                      }

                    </td>


                    {/* DESCARGAR PDF */}

                    <td>

                      <button
                        type="button"
                        className="btn-descargar"

                        title={
                          `Descargar reporte del grupo ${grupo}`
                        }

                        onClick={() =>
                          generarPDFGrupal(
                            grupo,
                            alumnosGrupo
                          )
                        }
                      >

                        <FaFilePdf />

                      </button>

                    </td>

                  </tr>

                );

              }
            )}

          </tbody>

        </table>


        {/* ============================================= */}
        {/* SIN RESULTADOS */}
        {/* ============================================= */}

        {
          gruposFiltrados.length === 0
          &&

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#777"
            }}
          >

            No se encontraron grupos.

          </p>
        }

      </div>

    </div>

  );

}


export default ModalPdfGrupal;
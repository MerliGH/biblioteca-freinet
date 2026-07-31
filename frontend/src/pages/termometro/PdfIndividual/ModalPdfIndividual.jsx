import "./ModalPdfIndividual.css";

import { useState } from "react";
import { FaFilePdf, FaTimes } from "react-icons/fa";

// IMPORTAMOS LA FUNCIÓN QUE GENERA EL PDF
import { generarPDF } from "../PdfIndividual/PdfIndividual";


function ModalPdfIndividual({
  alumnos,
  onClose,
}) {

  const [busqueda, setBusqueda] = useState("");


  // ==============================
  // FILTRAR ALUMNOS
  // ==============================

  const alumnosFiltrados = alumnos.filter((alumno) => {

    const texto = busqueda.toLowerCase();

    return (
      alumno.nombreAlumno
        .toLowerCase()
        .includes(texto) ||

      alumno.grupo
        .toLowerCase()
        .includes(texto)
    );

  });


  return (

    <div className="modal-overlay">

      <div className="modal-pdf">


        {/* ============================== */}
        {/* ENCABEZADO DEL MODAL */}
        {/* ============================== */}

        <div className="modal-header">

          <h2>
            Generar reporte individual
          </h2>

          <button
            type="button"
            className="btn-cerrar"
            onClick={onClose}
          >
            <FaTimes />
          </button>

        </div>


        {/* ============================== */}
        {/* BUSCADOR */}
        {/* ============================== */}

        <input
          type="text"
          placeholder="Buscar alumno..."
          className="buscador-pdf"
          value={busqueda}

          onChange={(e) =>
            setBusqueda(
              e.target.value
            )
          }
        />


        {/* ============================== */}
        {/* TABLA DE ALUMNOS */}
        {/* ============================== */}

        <table className="tabla-pdf">

          <thead>

            <tr>

              <th>
                Alumno
              </th>

              <th>
                Grupo
              </th>

              <th>
                PDF
              </th>

            </tr>

          </thead>


          <tbody>

            {alumnosFiltrados.map(
              (alumno) => (

                <tr
                  key={
                    alumno.id_usuario
                  }
                >

                  {/* NOMBRE DEL ALUMNO */}

                  <td>
                    {
                      alumno.nombreAlumno
                    }
                  </td>


                  {/* GRUPO */}

                  <td>
                    {
                      alumno.grupo
                    }
                  </td>


                  {/* BOTÓN DESCARGAR PDF */}

                  <td>

                    <button
                      type="button"
                      className="btn-descargar"

                      title={
                        `Descargar reporte de ${alumno.nombreAlumno}`
                      }

                      onClick={() =>
                        generarPDF(alumno)
                      }
                    >

                      <FaFilePdf />

                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}


export default ModalPdfIndividual;
import "./RegistrosAlumno.css";

function RegistrosAlumno({
  alumno,
  onClose,
}) {

  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="registros-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <h2>

          Registros de {
            alumno.nombreAlumno
          }

        </h2>

        <table className="tabla-registros">

          <thead>

            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Observaciones</th>
            </tr>

          </thead>

          <tbody>

            {alumno.registros &&
            alumno.registros.length > 0 ? (

              alumno.registros.map(
                (
                  registro,
                  index
                ) => (

                  <tr
                    key={
                      registro.id_termometro
                    }
                  >

                    <td>
                      {index + 1}
                    </td>

                    <td>

                      {new Date(
                        registro.fecha_acreditacion
                      ).toLocaleDateString()}

                    </td>

                    <td>

                      {
                        registro.observaciones ||
                        "-"
                      }

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="3"
                  style={{
                    textAlign:
                      "center",
                  }}
                >

                  No existen registros

                </td>

              </tr>

            )}

          </tbody>

        </table>

        <button
          className="btn-cancelar"
          onClick={onClose}
        >
          Cerrar
        </button>

      </div>

    </div>

  );

}

export default RegistrosAlumno;
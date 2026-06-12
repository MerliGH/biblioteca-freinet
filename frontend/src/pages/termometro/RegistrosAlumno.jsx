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
          Libros de {alumno.nombreAlumno}
        </h2>

        <table className="tabla-registros">

          <thead>

            <tr>

              <th>#</th>

              <th>Libro</th>

              <th>Estado</th>

              <th>Fecha</th>

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
                      registro.id_termometro ||
                      registro.libro_id
                    }
                  >

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {registro.nombreLibro}
                    </td>

                    <td>
                      {registro.estado
                        ? "✅ Acreditado"
                        : "⏳ Pendiente"}
                    </td>

                    <td>
                      {registro.fecha_acreditacion
                        ? new Date(
                            registro.fecha_acreditacion
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="4"
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
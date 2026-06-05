import "./RegistrosAlumno.css";

function RegistrosAlumno({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="registros-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <h2>
          Registros de María López 3A
        </h2>

        <table className="tabla-registros">

          <thead>
            <tr>
              <th>#</th>
              <th>Libro</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>1</td>
              <td>El Principito</td>
              <td>10/01/2026</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Matilda</td>
              <td>15/01/2026</td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                Harry Potter y la Piedra Filosofal
              </td>
              <td>20/01/2026</td>
            </tr>

            <tr>
              <td>18</td>
              <td>Diario de Greg</td>
              <td>15/05/2026</td>
            </tr>

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
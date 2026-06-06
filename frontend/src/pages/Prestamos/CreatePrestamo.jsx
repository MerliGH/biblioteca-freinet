import "./CreatePrestamo.css";

function CreatePrestamo({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>AGREGAR PRESTAMO</h1>

        <form className="prestamo-form">

          <label>Nombre del Alumno:</label>
          <select>
            <option>Nombre Alumno</option>
          </select>

          <label>Libro:</label>
          <select>
            <option>
              Tiny y las alas del corazón
            </option>
          </select>

          <label>Autorizado por:</label>
          <select>
            <option>Nombre del docente</option>
          </select>

          <label>Fecha de préstamo:</label>
          <input type="date" />

          <label>Fecha límite:</label>
          <input type="date" />

          <label>Fecha de devolución:</label>
          <input type="date" />

          <label>Estado:</label>
          <select>
            <option>Prestado</option>
            <option>Devuelto</option>
          </select>

          <div className="botones-form">

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

export default CreatePrestamo;
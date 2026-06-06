import "./CreateHistorial.css";

function CreateHistorial({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>AGREGAR HISTORIAL</h1>

        <form className="docente-form">

          <label>Alumno:</label>
          <input
            type="text"
            placeholder="Nombre del alumno"
          />

          <label>Libro:</label>
          <input
            type="text"
            placeholder="Nombre del libro"
          />

          <label>Fecha préstamo:</label>
          <input type="date" />

          <label>Fecha devolución:</label>
          <input type="date" />

          <label>Estado:</label>

          <select>
            <option>Devuelto</option>
            <option>Pendiente</option>
          </select>

          <label>Autorizado por:</label>
          <input
            type="text"
            placeholder="Nombre del docente"
          />

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

export default CreateHistorial;
import "./EditHistorial.css";

function EditHistorial({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        <h1>EDITAR HISTORIAL</h1>

        <form className="docente-form">

          <label>Alumno:</label>
          <input defaultValue="María López" />

          <label>Libro:</label>
          <input
            defaultValue="Tiny y las alas del corazón"
          />

          <label>Fecha préstamo:</label>
          <input defaultValue="10/08/2025" />

          <label>Fecha devolución:</label>
          <input defaultValue="15/08/2025" />

          <label>Estado:</label>

          <select defaultValue="Devuelto">
            <option>Devuelto</option>
            <option>Pendiente</option>
          </select>

          <label>Autorizado por:</label>
          <input defaultValue="Laura Gómez" />

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

export default EditHistorial;
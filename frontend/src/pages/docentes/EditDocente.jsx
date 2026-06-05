import "./EditDocente.css";

function EditDocente({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        <h1>EDITAR DOCENTE</h1>

        <form className="docente-form">

          <label>Nombre:</label>
          <input defaultValue="Laura" />

          <label>Apellido:</label>
          <input defaultValue="Gómez" />

          <label>Correo:</label>
          <input defaultValue="laura.gomez@escuela.edu" />

          <label>Matrícula:</label>
          <input defaultValue="DOC001" />

          <label>Estado:</label>

          <select defaultValue="Activo">
            <option>Activo</option>
            <option>Inactivo</option>
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

export default EditDocente;
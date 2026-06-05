import "./CreateAlumno.css";
function EditAlumno({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        <h1>EDITAR ALUMNO</h1>

        <form className="libro-form">

          <label>Nombre:</label>
          <input
            type="text"
            defaultValue="María"
          />

          <label>Apellido:</label>
          <input
            type="text"
            defaultValue="López"
          />

          <label>Correo:</label>
          <input
            type="email"
            defaultValue="maria.lopez@escuela.edu"
          />

          <label>Matrícula:</label>
          <input
            type="text"
            defaultValue="A2025001"
          />

          <label>Grupo:</label>
          <input
            type="text"
            defaultValue="3A"
          />

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

export default EditAlumno;
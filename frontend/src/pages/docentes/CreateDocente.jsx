import "./CreateDocente.css";

function CreateDocente({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>AGREGAR DOCENTE</h1>

        <form className="docente-form">

          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Ingrese nombre"
          />

          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Ingrese apellido"
          />

          <label>Correo:</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
          />

          <label>Matrícula:</label>
          <input
            type="text"
            placeholder="DOC001"
          />

          <label>Estado:</label>
          <select>
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

export default CreateDocente;
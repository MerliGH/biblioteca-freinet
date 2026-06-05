import "./DeleteAlumno.css";
function DeleteAlumno({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="delete-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <p>
          ¿Estás seguro de que deseas eliminar
          al alumno "María López"?
        </p>

        <div className="botones-delete">

          <button className="btn-eliminar-confirm">
            Eliminar
          </button>

          <button
            className="btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteAlumno;
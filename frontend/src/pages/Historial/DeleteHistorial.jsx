import "./DeleteHistorial.css";

function DeleteHistorial({ onClose }) {
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
          este registro del historial?
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

export default DeleteHistorial;
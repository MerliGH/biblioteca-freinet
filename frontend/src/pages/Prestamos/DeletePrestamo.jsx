import "./DeletePrestamo.css";

function DeletePrestamo({ onClose }) {
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
          el préstamo del libro
          "Tiny y las alas del corazón"?
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

export default DeletePrestamo;
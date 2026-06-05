import "./DeleteLibro.css";

function DeleteLibro({ onClose }) {
  return (
    <div
      className="delete-overlay"
      onClick={onClose}
    >
      <div
        className="delete-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>
          ¿Deseas eliminar el libro
          <br />
          "Tiny y las alas del corazón"?
        </h2>

        <div className="delete-buttons">

          <button className="btn-delete">
            Eliminar
          </button>

          <button
            className="btn-cancel"
            onClick={onClose}
          >
            Cancelar
          </button>

        </div>
      </div>
    </div>
  );
}

export default DeleteLibro;
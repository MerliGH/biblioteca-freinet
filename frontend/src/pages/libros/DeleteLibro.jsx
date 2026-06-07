import "./DeleteLibro.css";

import api from "../../services/api";

function DeleteLibro({
  libro,
  onClose,
}) {

  const eliminarLibro = async () => {
    try {

      await api.delete(
        `/libros/${libro.id_libro}`
      );

      alert(
        "Libro eliminado correctamente"
      );

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert(
        "Error al eliminar el libro"
      );

    }
  };

  return (
    <div
      className="delete-overlay"
      onClick={onClose}
    >
      <div
        className="delete-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <h2>
          ¿Deseas eliminar el libro?
          <br />
          "{libro?.titulo}"
        </h2>

        <div className="delete-buttons">

          <button
            className="btn-delete"
            onClick={eliminarLibro}
          >
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
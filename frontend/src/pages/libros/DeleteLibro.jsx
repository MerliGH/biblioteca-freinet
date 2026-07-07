import "./DeleteLibro.css";

import api from "../../services/api";

import Swal from "sweetalert2";

function DeleteLibro({
  libro,
  onClose,
}) {

  const eliminarLibro = async () => {

    try {

      await api.delete(
        `/libros/${libro.id_libro}`
      );

      await Swal.fire({
        icon: "success",
        title: "¡Libro eliminado!",
        text: "El libro fue eliminado correctamente.",
        confirmButtonColor: "#173b70",
      });

      window.location.reload();

    } catch (error) {

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el libro.",
        confirmButtonColor: "#173b70",
      });

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
  <strong>"{libro?.titulo}"</strong>
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
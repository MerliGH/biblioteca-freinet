import "./DeleteDocente.css";

import api from "../../services/api";
import Swal from "sweetalert2";

function DeleteDocente({
  docente,
  onClose,
}) {

  const eliminarDocente = async () => {

    try {

      await api.delete(
        `/usuarios/${docente.id_usuario}`
      );

      await Swal.fire({
        icon: "success",
        title: "¡Docente eliminado!",
        text: "El docente fue eliminado correctamente.",
        confirmButtonColor: "#173b70",
      });

      window.location.reload();

    } catch (error) {

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el docente.",
        confirmButtonColor: "#173b70",
      });

    }

  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="delete-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <p>
          ¿Estás seguro de que deseas eliminar al docente?
          <br />
          <strong>
            {docente?.nombre}{" "}
            {docente?.apellido_paterno}
          </strong>
        </p>

        <div className="botones-delete">

          <button
            className="btn-eliminar-confirm"
            onClick={eliminarDocente}
          >
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

export default DeleteDocente;
import "./DeleteAlumno.css";

import api from "../../services/api";
import Swal from "sweetalert2";

function DeleteAlumno({
  alumno,
  onClose,
}) {

  const eliminarAlumno = async () => {

    try {

      await api.delete(
        `/usuarios/${alumno.id_usuario}`
      );

      await Swal.fire({
        icon: "success",
        title: "¡Alumno eliminado!",
        text: "El alumno fue eliminado correctamente.",
        confirmButtonColor: "#173b70",
      });

      window.location.reload();

    } catch (error) {

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el alumno.",
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
          ¿Estás seguro de que deseas
          eliminar al alumno?
          <br />
          <strong>
            {alumno?.nombre}{" "}
            {alumno?.apellido_paterno}
          </strong>
        </p>

        <div className="botones-delete">

          <button
            className="btn-eliminar-confirm"
            onClick={eliminarAlumno}
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

export default DeleteAlumno;
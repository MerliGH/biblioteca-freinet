import "./DeletePrestamo.css";
import Swal from "sweetalert2";
import api from "../../services/api";

function DeletePrestamo({
  prestamo,
  onClose,
}) {

  const eliminarPrestamo =
    async () => {

      try {

        await api.delete(
          `/prestamos/${prestamo.id_prestamo}`
        );

        alert(
          "Préstamo eliminado correctamente"
        );

        window.location.reload();

      }  catch (error) {

  console.error(error);

  Swal.fire({
    icon: "warning",
    title: "Operación no permitida",
    text:
      error.response?.data?.detail ||
      "No se pudo eliminar el préstamo.",
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

          ¿Deseas eliminar el préstamo
          del libro?

          <br />

          <strong>
            {
              prestamo?.tituloLibro
            }
          </strong>

        </p>

        <div className="botones-delete">

          <button
            className="btn-eliminar-confirm"
            onClick={
              eliminarPrestamo
            }
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

export default DeletePrestamo;
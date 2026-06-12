import Swal from "sweetalert2";

export const alertaExito = (mensaje) => {
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: mensaje,
    confirmButtonColor: "#173b70",
  });
};

export const alertaError = (mensaje) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
    confirmButtonColor: "#173b70",
  });
};

export const alertaAdvertencia = (mensaje) => {
  Swal.fire({
    icon: "warning",
    title: "Atención",
    text: mensaje,
    confirmButtonColor: "#173b70",
  });
};

export const confirmarEliminar = async (
  mensaje = "¿Deseas eliminar este registro?"
) => {
  return Swal.fire({
    title: "¿Estás seguro?",
    text: mensaje,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#173b70",
    cancelButtonColor: "#8dc63f",
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
  });
};

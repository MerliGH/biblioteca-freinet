import "./EditHistorial.css";

import { useState } from "react";
import api from "../../services/api";

function EditHistorial({
  historial,
  onClose,
}) {

  const [fechaLimite,
    setFechaLimite] =
    useState(
      historial.fecha_limite
        ?.split("T")[0] || ""
    );

  const [fechaDevolucion,
    setFechaDevolucion] =
    useState(
      historial.fecha_devolucion
        ?.split("T")[0] || ""
    );

  const [estado,
    setEstado] =
    useState(
      historial.estado || ""
    );

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.put(
        `/prestamos/${historial.id_prestamo}`,
        {
          usuario_id:
            historial.usuario_id,

          libro_id:
            historial.libro_id,

          autorizado_por:
            historial.autorizado_por,

          fecha_limite:
            fechaLimite,

          fecha_devolucion:
            fechaDevolucion,

          estado:
            estado,
        }
      );

      alert(
        "Historial actualizado correctamente"
      );

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert(
        "Error al actualizar historial"
      );

    }

  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <h1>
          EDITAR HISTORIAL
        </h1>

        <form
          className="docente-form"
          onSubmit={handleSubmit}
        >

          <label>
            Alumno:
          </label>

          <input
            value={
              historial.nombreAlumno
            }
            disabled
          />

          <label>
            Libro:
          </label>

          <input
            value={
              historial.tituloLibro
            }
            disabled
          />

          <label>
            Fecha límite:
          </label>

          <input
            type="date"
            value={fechaLimite}
            onChange={(e) =>
              setFechaLimite(
                e.target.value
              )
            }
          />

          <label>
            Fecha devolución:
          </label>

          <input
            type="date"
            value={
              fechaDevolucion
            }
            onChange={(e) =>
              setFechaDevolucion(
                e.target.value
              )
            }
          />

          <label>
            Estado:
          </label>

          <select
            value={estado}
            onChange={(e) =>
              setEstado(
                e.target.value
              )
            }
          >

            <option value="PRESTADO">
              PRESTADO
            </option>

            <option value="DEVUELTO">
              DEVUELTO
            </option>

            <option value="VENCIDO">
              VENCIDO
            </option>

          </select>

          <label>
            Autorizado por:
          </label>

          <input
            value={
              historial.autorizadoPor
            }
            disabled
          />

          <div className="botones-form">

            <button
              type="submit"
              className="btn-guardar"
            >
              Guardar
            </button>

            <button
              type="button"
              className="btn-cancelar"
              onClick={onClose}
            >
              Cancelar
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditHistorial;
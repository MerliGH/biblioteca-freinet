import "./EditPrestamo.css";

function EditPrestamos({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>EDITAR PRÉSTAMO</h1>

        <form className="prestamo-form">

          <label>Nombre del Alumno:</label>
          <select defaultValue="María López">
            <option>María López</option>
            <option>Mateo Gutiérrez</option>
            <option>Sofía Pérez</option>
          </select>

          <label>Libro:</label>
          <select defaultValue="Tiny y las alas del corazón">
            <option>
              Tiny y las alas del corazón
            </option>

            <option>
              Harry Potter
            </option>

            <option>
              El Principito
            </option>
          </select>

          <label>Autorizado por:</label>
          <select defaultValue="Miss Luna">
            <option>Miss Luna</option>
            <option>Miss Mariela</option>
          </select>

          <label>Fecha de préstamo:</label>
          <input
            type="text"
            defaultValue="10/08/2025"
          />

          <label>Fecha límite:</label>
          <input
            type="text"
            defaultValue="17/08/2025"
          />

          <label>Fecha de devolución:</label>
          <input
            type="text"
            placeholder="Pendiente"
          />

          <label>Estado:</label>
          <select defaultValue="Prestado">
            <option>Prestado</option>
            <option>Devuelto</option>
          </select>

          <div className="botones-form">

            <button
              type="submit"
              className="btn-guardar"
            >
              Actualizar
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

export default EditPrestamos;
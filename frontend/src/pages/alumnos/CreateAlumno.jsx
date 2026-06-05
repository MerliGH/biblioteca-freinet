import "./CreateAlumno.css";

function CreateAlumno({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>AGREGAR ALUMNO</h1>

        <form className="alumno-form">

          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Ingrese nombre"
          />

          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Ingrese apellido"
          />

          <label>Correo:</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
          />

          <label>Matrícula:</label>
          <input
            type="text"
            placeholder="A2025001"
          />

          <label>Grupo:</label>
          <input
            type="text"
            placeholder="Ejemplo: 3A"
          />

          <label>Estado:</label>
          <select>
            <option value="">Seleccionar estado</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

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

export default CreateAlumno;
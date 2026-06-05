import "./CreateLibro.css";

function CreateLibro({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>AGREGAR LIBRO</h1>

        <form className="libro-form">

          <label>Clasificación:</label>
          <select>
            <option>Seleccionar clasificación</option>
          </select>

          <label>Título:</label>
          <input
            type="text"
            placeholder="Ingrese el título"
          />

          <label>Autor e ilustrador:</label>
          <input
            type="text"
            placeholder="Ingrese autor"
          />

          <label>Serie:</label>
          <select>
            <option>Seleccionar serie</option>
          </select>

          <label>Procedencia:</label>
          <select>
            <option>Seleccionar procedencia</option>
          </select>

          <label>Cantidad en Existencia:</label>
          <input
            type="number"
            min="1"
          />

          <label>Sección:</label>
          <input
            type="text"
            placeholder="Ejemplo: L"
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

export default CreateLibro;
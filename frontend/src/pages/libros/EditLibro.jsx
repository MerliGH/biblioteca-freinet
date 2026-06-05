import "./CreateLibro.css";

function EditLibro({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>EDITAR LIBRO</h1>

        <form className="libro-form">

          <label>Clasificación:</label>
          <select defaultValue="Narrativa Infantil">
            <option>Narrativa Infantil</option>
            <option>Cuentos</option>
            <option>Novela</option>
          </select>

          <label>Título:</label>
          <input
            type="text"
            defaultValue="Tiny y las alas del corazón"
          />

          <label>Autor e ilustrador:</label>
          <input
            type="text"
            defaultValue="Yemina Mascareño"
          />

          <label>Serie:</label>
          <select defaultValue="LUDOS">
            <option>LUDOS</option>
          </select>

          <label>Procedencia:</label>
          <select defaultValue="Compra">
            <option>Compra</option>
            <option>Donación</option>
          </select>

          <label>Cantidad en Existencia:</label>
          <input
            type="number"
            defaultValue="1"
          />

          <label>Sección:</label>
          <input
            type="text"
            defaultValue="L"
          />

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

export default EditLibro;
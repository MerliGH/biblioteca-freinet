import "./TermometroVisual.css";

function obtenerNivel(libros) {
  if (libros >= 26) {
    return {
      nivel: "Platino",
      color: "#D9D9D9",
    };
  }

  if (libros >= 25) {
    return {
      nivel: "Dorado",
      color: "#F4C542",
    };
  }

  if (libros >= 20) {
    return {
      nivel: "Rojo",
      color: "#E53935",
    };
  }

  if (libros >= 15) {
    return {
      nivel: "Amarillo",
      color: "#FFD54F",
    };
  }

  if (libros >= 5) {
    return {
      nivel: "Verde",
      color: "#8DC63F",
    };
  }

  return {
    nivel: "Inicial",
    color: "#BDBDBD",
  };
}

function TermometroVisual({ libros }) {
  const { color } = obtenerNivel(libros);

  const porcentaje = Math.min(
    (libros / 26) * 100,
    100
  );

  return (
    <div className="termometro">

      <div className="termometro-tubo">

        <div
          className="termometro-relleno"
          style={{
            height: `${porcentaje}%`,
            backgroundColor: color,
          }}
        />

      </div>

      <div
        className="termometro-bulbo"
        style={{
          backgroundColor: color,
        }}
      />

    </div>
  );
}

export default TermometroVisual;
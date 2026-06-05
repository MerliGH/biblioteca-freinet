import "./MiniTermometro.css";

function obtenerColor(libros) {
  if (libros >= 26) return "#D9D9D9"; // Platino
  if (libros >= 25) return "#F4C542"; // Dorado
  if (libros >= 20) return "#E53935"; // Rojo
  if (libros >= 15) return "#FFD54F"; // Amarillo
  if (libros >= 5) return "#8DC63F"; // Verde

  return "#BDBDBD";
}

function MiniTermometro({ libros }) {
  const color = obtenerColor(libros);

  const porcentaje = Math.min(
    (libros / 26) * 100,
    100
  );

  return (
    <div className="mini-termometro">

      <div className="mini-tubo">

        <div
          className="mini-relleno"
          style={{
            height: `${porcentaje}%`,
            backgroundColor: color,
          }}
        />

      </div>

      <div
        className="mini-bulbo"
        style={{
          backgroundColor: color,
        }}
      />

    </div>
  );
}

export default MiniTermometro;
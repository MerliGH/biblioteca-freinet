import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import api from "../../../services/api";


// =====================================================
// FORMATEAR FECHA
// =====================================================

const formatearFecha = (fecha) => {

  if (!fecha) {
    return "-";
  }

  const [year, month, day] =
    fecha.split("T")[0].split("-");

  return `${day}/${month}/${year}`;

};


// =====================================================
// GENERAR PDF
// =====================================================

export const generarPDF = async (alumno) => {

  try {

    // =================================================
    // OBTENER DATOS REALES
    // =====================================================

    const [
      prestamosResponse,
      librosResponse
    ] = await Promise.all([

      api.get("/prestamos/"),
      api.get("/libros/")

    ]);


    const prestamos =
      prestamosResponse.data;

    const libros =
      librosResponse.data;


    // =================================================
    // FILTRAR PRÉSTAMOS DEL ALUMNO
    // =====================================================

    const prestamosAlumno =
      prestamos.filter(
        (prestamo) =>

          Number(prestamo.usuario_id) ===
          Number(alumno.id_usuario)

      );


    // =================================================
    // RELACIONAR PRÉSTAMO CON LIBRO
    // =====================================================

    const prestamosConLibro =
      prestamosAlumno.map(
        (prestamo) => {

          const libro =
            libros.find(
              (libro) =>

                Number(libro.id_libro) ===
                Number(prestamo.libro_id)

            );


          return {

            ...prestamo,

            tituloLibro:
              libro
                ? libro.titulo
                : "Libro no encontrado"

          };

        }
      );


    // =================================================
    // RESUMEN
    // =====================================================

    const totalPrestamos =
      prestamosConLibro.length;


    const devueltos =
      prestamosConLibro.filter(
        (prestamo) =>

          prestamo.estado
            ?.trim()
            .toUpperCase() ===
          "DEVUELTO"

      ).length;


    const activos =
      prestamosConLibro.filter(
        (prestamo) =>

          prestamo.estado
            ?.trim()
            .toUpperCase() ===
          "PRESTADO"

      ).length;


    const vencidos =
      prestamosConLibro.filter(
        (prestamo) =>

          prestamo.estado
            ?.trim()
            .toUpperCase() ===
          "VENCIDO"

      ).length;


    // =================================================
    // CREAR PDF
    // =====================================================

    const doc =
      new jsPDF();


    // =================================================
    // PALETA BLANCO Y NEGRO
    // =====================================================

    const negro = [
      30,
      30,
      30
    ];

    const grisOscuro = [
      70,
      70,
      70
    ];

    const gris = [
      120,
      120,
      120
    ];

    const grisMedio = [
      180,
      180,
      180
    ];

    const grisClaro = [
      242,
      242,
      242
    ];

    const grisMuyClaro = [
      248,
      248,
      248
    ];

    const blanco = [
      255,
      255,
      255
    ];


    // =================================================
    // LÍNEA SUPERIOR
    // =====================================================

    doc.setFillColor(
      ...negro
    );

    doc.rect(
      0,
      0,
      210,
      3,
      "F"
    );


    // =================================================
    // ENCABEZADO
    // =====================================================

    doc.setTextColor(
      ...negro
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(17);


    doc.text(
      "INSTITUTO CÉLESTIN FREINET",
      20,
      22
    );


    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(10);


    doc.text(
      "Biblioteca Escolar",
      20,
      30
    );


    // =================================================
    // TEXTO DERECHO
    // =====================================================

    doc.setTextColor(
      ...grisOscuro
    );

    doc.setFontSize(8);


    doc.text(
      "Sistema de control de biblioteca escolar",
      190,
      23,
      {
        align: "right"
      }
    );


    // =================================================
    // LÍNEA DEL ENCABEZADO
    // =====================================================

    doc.setDrawColor(
      ...grisMedio
    );

    doc.setLineWidth(0.3);


    doc.line(
      20,
      39,
      190,
      39
    );


    // =================================================
    // TÍTULO
    // =====================================================

    doc.setTextColor(
      ...negro
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(16);


    doc.text(
      "Reporte individual de préstamos",
      20,
      54
    );


    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setTextColor(
      ...grisOscuro
    );

    doc.setFontSize(9);


    doc.text(
      "Historial y estado de los préstamos del alumno",
      20,
      61
    );


    // =================================================
    // TARJETA INFORMACIÓN DEL ALUMNO
    // =====================================================

    doc.setFillColor(
      ...grisMuyClaro
    );

    doc.setDrawColor(
      ...grisMedio
    );

    doc.setLineWidth(0.25);


    doc.roundedRect(
      20,
      70,
      170,
      32,
      2,
      2,
      "FD"
    );


    // =================================================
    // ALUMNO
    // =====================================================

    doc.setTextColor(
      ...grisOscuro
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(8);


    doc.text(
      "ALUMNO",
      27,
      80
    );


    doc.setTextColor(
      ...negro
    );

    doc.setFontSize(11);


    doc.text(
      alumno.nombreAlumno ||
      "Sin nombre",
      27,
      89
    );


    // =================================================
    // GRUPO
    // =====================================================

    doc.setTextColor(
      ...grisOscuro
    );

    doc.setFontSize(8);


    doc.text(
      "GRUPO",
      125,
      80
    );


    doc.setTextColor(
      ...negro
    );

    doc.setFontSize(11);


    doc.text(
      alumno.grupo ||
      "Sin grupo",
      125,
      89
    );


    // =================================================
    // FECHA
    // =====================================================

    const fechaGeneracion =
      new Date()
        .toLocaleDateString(
          "es-MX"
        );


    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setTextColor(
      ...grisOscuro
    );

    doc.setFontSize(7);


    doc.text(
      `Fecha de generación: ${fechaGeneracion}`,
      27,
      97
    );


    // =================================================
    // RESUMEN
    // =====================================================

    doc.setTextColor(
      ...negro
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(13);


    doc.text(
      "Resumen",
      20,
      118
    );


    // =================================================
    // FUNCIÓN PARA TARJETAS
    // =====================================================

    const crearTarjeta = (
      x,
      numero,
      titulo
    ) => {

      // Fondo blanco
      doc.setFillColor(
        ...blanco
      );

      // Borde
      doc.setDrawColor(
        ...grisMedio
      );

      doc.setLineWidth(
        0.3
      );


      doc.roundedRect(
        x,
        126,
        38,
        29,
        2,
        2,
        "FD"
      );


      // Número
      doc.setTextColor(
        ...negro
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(
        17
      );


      doc.text(
        String(numero),
        x + 19,
        139,
        {
          align: "center"
        }
      );


      // Línea pequeña
      doc.setDrawColor(
        ...grisMedio
      );


      doc.line(
        x + 8,
        144,
        x + 30,
        144
      );


      // Texto
      doc.setTextColor(
        ...grisOscuro
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(
        7
      );


      doc.text(
        titulo,
        x + 19,
        151,
        {
          align: "center"
        }
      );

    };


    // =================================================
    // TARJETAS DEL RESUMEN
    // =====================================================

    crearTarjeta(
      20,
      totalPrestamos,
      "TOTAL"
    );


    crearTarjeta(
      64,
      devueltos,
      "DEVUELTOS"
    );


    crearTarjeta(
      108,
      activos,
      "ACTIVOS"
    );


    crearTarjeta(
      152,
      vencidos,
      "VENCIDOS"
    );


    // =================================================
    // HISTORIAL
    // =====================================================

    doc.setTextColor(
      ...negro
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(13);


    doc.text(
      "Historial de préstamos",
      20,
      174
    );


    // =================================================
    // CREAR FILAS
    // =====================================================

    let filas = [];


    if (
      prestamosConLibro.length > 0
    ) {

      filas =
        prestamosConLibro.map(
          (prestamo) => [

            prestamo.tituloLibro,

            formatearFecha(
              prestamo.fecha_prestamo
            ),

            formatearFecha(
              prestamo.fecha_devolucion
            ),

            prestamo.estado || "-"

          ]
        );

    } else {

      filas = [

        [
          "Sin préstamos registrados",
          "-",
          "-",
          "-"
        ]

      ];

    }


    // =================================================
    // TABLA
    // =====================================================

    autoTable(
      doc,
      {

        startY: 181,


        head: [[

          "Libro",

          "Fecha préstamo",

          "Fecha devolución",

          "Estado"

        ]],


        body:
          filas,


        margin: {

          left: 20,

          right: 20,

          bottom: 25

        },


        styles: {

          font:
            "helvetica",

          fontSize:
            8,

          cellPadding:
            4,

          textColor:
            negro,

          lineColor:
            grisMedio,

          lineWidth:
            0.15,

          valign:
            "middle"

        },


        // =================================================
        // ENCABEZADO NEGRO
        // =====================================================

        headStyles: {

          fillColor:
            negro,

          textColor:
            blanco,

          fontStyle:
            "bold",

          halign:
            "center",

          lineColor:
            negro

        },


        // =================================================
        // FILAS ALTERNADAS
        // =====================================================

        alternateRowStyles: {

          fillColor:
            grisMuyClaro

        },


        // =================================================
        // COLUMNAS
        // =====================================================

        columnStyles: {

          0: {

            halign:
              "left",

            cellWidth:
              60

          },


          1: {

            halign:
              "center",

            cellWidth:
              37

          },


          2: {

            halign:
              "center",

            cellWidth:
              40

          },


          3: {

            halign:
              "center",

            cellWidth:
              33,

            fontStyle:
              "bold"

          }

        },


        // =================================================
        // ESTILOS DE ESTADOS
        // =====================================================

        didParseCell: (data) => {

          if (
            data.section === "body" &&
            data.column.index === 3
          ) {

            const estado =
              String(
                data.cell.raw
              )
                .trim()
                .toUpperCase();


            // =============================================
            // DEVUELTO
            // =============================================

            if (
              estado === "DEVUELTO"
            ) {

              data.cell.styles.fillColor =
                [
                  250,
                  250,
                  250
                ];

              data.cell.styles.textColor =
                [
                  60,
                  60,
                  60
                ];

            }


            // =============================================
            // PRESTADO
            // =============================================

            if (
              estado === "PRESTADO"
            ) {

              data.cell.styles.fillColor =
                [
                  235,
                  235,
                  235
                ];

              data.cell.styles.textColor =
                [
                  30,
                  30,
                  30
                ];

            }


            // =============================================
            // VENCIDO
            // =============================================

            if (
              estado === "VENCIDO"
            ) {

              data.cell.styles.fillColor =
                [
                  215,
                  215,
                  215
                ];

              data.cell.styles.textColor =
                [
                  0,
                  0,
                  0
                ];

              data.cell.styles.fontStyle =
                "bold";

            }

          }

        }

      }
    );


    // =================================================
    // PIE DE PÁGINA
    // =====================================================

    const numeroPaginas =
      doc.getNumberOfPages();


    for (
      let pagina = 1;
      pagina <= numeroPaginas;
      pagina++
    ) {

      doc.setPage(
        pagina
      );


      // Línea
      doc.setDrawColor(
        ...grisMedio
      );

      doc.setLineWidth(
        0.2
      );


      doc.line(
        20,
        275,
        190,
        275
      );


      // =================================================
      // TEXTO IZQUIERDO
      // =====================================================

      doc.setTextColor(
        ...grisOscuro
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(
        7
      );


      doc.text(
        "Instituto Célestin Freinet · Biblioteca Escolar",
        20,
        283
      );


      // =================================================
      // NÚMERO DE PÁGINA
      // =====================================================

      doc.text(
        `Página ${pagina} de ${numeroPaginas}`,
        190,
        283,
        {
          align: "right"
        }
      );

    }


    // =================================================
    // NOMBRE DEL ARCHIVO
    // =====================================================

    const nombreArchivo =
      (
        alumno.nombreAlumno ||
        "Alumno"
      )
        .trim()

        .replace(
          /\s+/g,
          "_"
        )

        .replace(
          /[^a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ]/g,
          ""
        );


    // =================================================
    // DESCARGAR
    // =====================================================

    doc.save(
      `Reporte_${nombreArchivo}.pdf`
    );


  } catch (error) {

    console.error(
      "Error al generar el PDF:",
      error
    );


    alert(
      `No se pudo generar el reporte: ${
        error.response?.data?.detail ||
        error.message
      }`
    );

  }

};
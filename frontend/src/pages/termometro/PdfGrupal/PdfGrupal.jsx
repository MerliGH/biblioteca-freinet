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

  const fechaLimpia =
    String(fecha).split("T")[0];

  const partes =
    fechaLimpia.split("-");

  if (partes.length !== 3) {
    return fechaLimpia;
  }

  const [
    year,
    month,
    day
  ] = partes;

  return `${day}/${month}/${year}`;

};


// =====================================================
// GENERAR PDF GRUPAL
// =====================================================

export const generarPDFGrupal = async (
  grupo,
  alumnosGrupo
) => {

  try {

    // =================================================
    // VALIDAR DATOS RECIBIDOS
    // =====================================================

    if (!grupo) {

      throw new Error(
        "No se recibió el grupo."
      );

    }


    if (!Array.isArray(alumnosGrupo)) {

      console.error(
        "alumnosGrupo recibido:",
        alumnosGrupo
      );

      throw new Error(
        "No se recibió correctamente la lista de alumnos."
      );

    }


    // =================================================
    // GRUPO
    // =====================================================

    const nombreGrupo =
      String(grupo)
        .trim()
        .toUpperCase();


    console.log(
      "Grupo:",
      nombreGrupo
    );


    console.log(
      "Alumnos del grupo:",
      alumnosGrupo
    );


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
    // VALIDAR API
    // =====================================================

    if (!Array.isArray(prestamos)) {

      throw new Error(
        "La API de préstamos no devolvió una lista."
      );

    }


    if (!Array.isArray(libros)) {

      throw new Error(
        "La API de libros no devolvió una lista."
      );

    }


    // =================================================
    // IDS DE LOS ALUMNOS DEL GRUPO
    // =====================================================

    const idsAlumnos =
      alumnosGrupo
        .map(
          (alumno) =>
            Number(
              alumno.id_usuario
            )
        )
        .filter(
          (id) =>
            !Number.isNaN(id)
        );


    console.log(
      "IDs alumnos:",
      idsAlumnos
    );


    // =================================================
    // FILTRAR PRÉSTAMOS DEL GRUPO
    // =====================================================

    const prestamosGrupo =
      prestamos.filter(
        (prestamo) =>

          idsAlumnos.includes(
            Number(
              prestamo.usuario_id
            )
          )

      );


    console.log(
      "Préstamos del grupo:",
      prestamosGrupo
    );


    // =================================================
    // AGREGAR DATOS DEL ALUMNO Y LIBRO
    // =====================================================

    const prestamosConDatos =
      prestamosGrupo.map(
        (prestamo) => {

          // =============================================
          // BUSCAR ALUMNO
          // =============================================

          const alumno =
            alumnosGrupo.find(
              (alumno) =>

                Number(
                  alumno.id_usuario
                ) ===

                Number(
                  prestamo.usuario_id
                )

            );


          // =============================================
          // BUSCAR LIBRO
          // =============================================

          const libro =
            libros.find(
              (libro) =>

                Number(
                  libro.id_libro
                ) ===

                Number(
                  prestamo.libro_id
                )

            );


          // =============================================
          // NOMBRE DEL ALUMNO
          // =============================================

          let nombreAlumno =
            "Alumno no encontrado";


          if (alumno) {

            // Si Termómetro ya construyó nombreAlumno
            if (alumno.nombreAlumno) {

              nombreAlumno =
                alumno.nombreAlumno;

            }

            // Si vienen los datos originales de la API
            else {

              nombreAlumno = [

                alumno.nombre,

                alumno.apellido_paterno,

                alumno.apellido_materno

              ]
                .filter(Boolean)
                .join(" ")
                .trim();

            }

          }


          return {

            ...prestamo,

            nombreAlumno,

            tituloLibro:
              libro
                ? libro.titulo
                : "Libro no encontrado"

          };

        }
      );


    // =================================================
    // ORDENAR POR NOMBRE
    // =====================================================

    prestamosConDatos.sort(
      (a, b) =>

        a.nombreAlumno.localeCompare(
          b.nombreAlumno,
          "es"
        )

    );


    // =================================================
    // RESUMEN
    // =====================================================

    const totalAlumnos =
      alumnosGrupo.length;


    const totalPrestamos =
      prestamosConDatos.length;


    const devueltos =
      prestamosConDatos.filter(
        (prestamo) =>

          String(
            prestamo.estado || ""
          )
            .trim()
            .toUpperCase() ===
          "DEVUELTO"

      ).length;


    const activos =
      prestamosConDatos.filter(
        (prestamo) =>

          String(
            prestamo.estado || ""
          )
            .trim()
            .toUpperCase() ===
          "PRESTADO"

      ).length;


    const vencidos =
      prestamosConDatos.filter(
        (prestamo) =>

          String(
            prestamo.estado || ""
          )
            .trim()
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


    const grisMedio = [
      180,
      180,
      180
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


    doc.setFontSize(
      17
    );


    doc.text(
      "INSTITUTO CÉLESTIN FREINET",
      20,
      22
    );


    doc.setFont(
      "helvetica",
      "normal"
    );


    doc.setFontSize(
      10
    );


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


    doc.setFontSize(
      8
    );


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


    doc.setLineWidth(
      0.3
    );


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


    doc.setFontSize(
      16
    );


    doc.text(
      "Reporte grupal de préstamos",
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


    doc.setFontSize(
      9
    );


    doc.text(
      "Resumen e historial de préstamos del grupo",
      20,
      61
    );


    // =================================================
    // INFORMACIÓN DEL GRUPO
    // =====================================================

    doc.setFillColor(
      ...grisMuyClaro
    );


    doc.setDrawColor(
      ...grisMedio
    );


    doc.setLineWidth(
      0.25
    );


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
    // GRUPO
    // =====================================================

    doc.setTextColor(
      ...grisOscuro
    );


    doc.setFont(
      "helvetica",
      "bold"
    );


    doc.setFontSize(
      8
    );


    doc.text(
      "GRUPO",
      27,
      80
    );


    doc.setTextColor(
      ...negro
    );


    doc.setFontSize(
      12
    );


    doc.text(
      nombreGrupo,
      27,
      90
    );


    // =================================================
    // TOTAL ALUMNOS
    // =====================================================

    doc.setTextColor(
      ...grisOscuro
    );


    doc.setFontSize(
      8
    );


    doc.text(
      "TOTAL DE ALUMNOS",
      125,
      80
    );


    doc.setTextColor(
      ...negro
    );


    doc.setFontSize(
      12
    );


    doc.text(
      String(
        totalAlumnos
      ),
      125,
      90
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


    doc.setFontSize(
      7
    );


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


    doc.setFontSize(
      13
    );


    doc.text(
      "Resumen",
      20,
      118
    );


    // =================================================
    // CREAR TARJETAS
    // =====================================================

    const crearTarjeta = (
      x,
      numero,
      titulo
    ) => {

      // Fondo
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
        String(
          numero
        ),
        x + 19,
        139,
        {
          align: "center"
        }
      );


      // Línea interna
      doc.setDrawColor(
        ...grisMedio
      );


      doc.line(
        x + 8,
        144,
        x + 30,
        144
      );


      // Título
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
      "PRÉSTAMOS"
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


    doc.setFontSize(
      13
    );


    doc.text(
      "Historial de préstamos",
      20,
      174
    );


    // =================================================
    // FILAS DE LA TABLA
    // =====================================================

    let filas = [];


    if (
      prestamosConDatos.length > 0
    ) {

      filas =
        prestamosConDatos.map(
          (prestamo) => [

            prestamo.nombreAlumno,

            prestamo.tituloLibro,

            formatearFecha(
              prestamo.fecha_prestamo
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

        startY:
          181,


        head: [[

          "Alumno",

          "Libro",

          "Fecha préstamo",

          "Estado"

        ]],


        body:
          filas,


        margin: {

          left:
            20,

          right:
            20,

          bottom:
            25

        },


        styles: {

          font:
            "helvetica",

          fontSize:
            8,

          cellPadding:
            3.5,

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
        // ENCABEZADO
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
              50

          },


          1: {

            halign:
              "left",

            cellWidth:
              50

          },


          2: {

            halign:
              "center",

            cellWidth:
              38

          },


          3: {

            halign:
              "center",

            cellWidth:
              32,

            fontStyle:
              "bold"

          }

        },


        // =================================================
        // ESTADOS
        // =====================================================

        didParseCell: (
          data
        ) => {

          if (

            data.section ===
              "body"

            &&

            data.column.index ===
              3

          ) {

            const estado =
              String(
                data.cell.raw
              )
                .trim()
                .toUpperCase();


            // DEVUELTO
            if (
              estado ===
              "DEVUELTO"
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


            // PRESTADO
            if (
              estado ===
              "PRESTADO"
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


            // VENCIDO
            if (
              estado ===
              "VENCIDO"
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
      `Reporte_Grupo_${nombreGrupo}`
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
      `${nombreArchivo}.pdf`
    );


  } catch (error) {

    console.error(
      "Error al generar el PDF grupal:",
      error
    );


    alert(
      `No se pudo generar el reporte grupal: ${
        error.response?.data?.detail ||
        error.message
      }`
    );

  }

};
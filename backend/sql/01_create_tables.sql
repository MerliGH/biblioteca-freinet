-- TABLAS VERSION 1

-- TABLA CATEGORIAS

CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA USUARIOS

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),

    correo VARCHAR(150) UNIQUE,
    password VARCHAR(255),

    matricula VARCHAR(30) UNIQUE,

    rol VARCHAR(20) NOT NULL
        CHECK (rol IN ('DIRECTORA', 'DOCENTE', 'ALUMNO')),

    grado VARCHAR(10),
    grupo VARCHAR(10),

    estado BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA LIBROS

CREATE TABLE libros (
    id_libro SERIAL PRIMARY KEY,

    categoria_id INTEGER NOT NULL,

    titulo VARCHAR(255) NOT NULL,
    autor_ilustrador VARCHAR(255),

    serie VARCHAR(100),
    procedencia VARCHAR(100),

    cantidad_total INTEGER NOT NULL DEFAULT 0,
    cantidad_disponible INTEGER NOT NULL DEFAULT 0,

    seccion VARCHAR(50),

    estado BOOLEAN DEFAULT TRUE,

    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_libros_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id_categoria)
);

-- TABLA PRESTAMOS

CREATE TABLE prestamos (
    id_prestamo SERIAL PRIMARY KEY,

    usuario_id INTEGER NOT NULL,
    libro_id INTEGER NOT NULL,
    autorizado_por INTEGER NOT NULL,

    fecha_prestamo DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_limite DATE NOT NULL,
    fecha_devolucion DATE,

    estado VARCHAR(20) NOT NULL DEFAULT 'PRESTADO'
        CHECK (estado IN ('PRESTADO', 'DEVUELTO', 'VENCIDO')),

    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_prestamo_alumno
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id_usuario),

    CONSTRAINT fk_prestamo_libro
        FOREIGN KEY (libro_id)
        REFERENCES libros(id_libro),

    CONSTRAINT fk_prestamo_autorizado
        FOREIGN KEY (autorizado_por)
        REFERENCES usuarios(id_usuario)
);

-- TABLA TERMOMETRO

CREATE TABLE termometro (
    id_termometro SERIAL PRIMARY KEY,

    usuario_id INTEGER NOT NULL,
    libro_id INTEGER NOT NULL,
    registrado_por INTEGER NOT NULL,

    fecha_acreditacion DATE NOT NULL DEFAULT CURRENT_DATE,
    observaciones TEXT,

    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_termometro_alumno
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id_usuario),

    CONSTRAINT fk_termometro_libro
        FOREIGN KEY (libro_id)
        REFERENCES libros(id_libro),

    CONSTRAINT fk_termometro_registrado_por
        FOREIGN KEY (registrado_por)
        REFERENCES usuarios(id_usuario)
);
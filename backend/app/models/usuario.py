from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    apellido_paterno = Column(String(100), nullable=False)
    apellido_materno = Column(String(100), nullable=True)

    correo = Column(String(150), unique=True, nullable=True)
    password = Column(String(255), nullable=True)

    matricula = Column(String(30), unique=True, nullable=True)
    rol = Column(String(20), nullable=False)

    grado = Column(String(10), nullable=True)
    grupo = Column(String(10), nullable=True)

    estado = Column(Boolean, default=True)
    fecha_registro = Column(DateTime, server_default=func.now())
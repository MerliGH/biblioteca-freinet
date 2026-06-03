from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Libro(Base):
    __tablename__ = "libros"

    id_libro = Column(Integer, primary_key=True, index=True)
    categoria_id = Column(Integer, ForeignKey("categorias.id_categoria"), nullable=False)

    titulo = Column(String(150), nullable=False)
    autor_ilustrador = Column(String(150), nullable=True)
    serie = Column(String(100), nullable=True)
    procedencia = Column(String(100), nullable=True)

    cantidad_total = Column(Integer, default=1)
    cantidad_disponible = Column(Integer, default=1)

    seccion = Column(String(100), nullable=True)
    estado = Column(Boolean, default=True)
    fecha_registro = Column(DateTime, server_default=func.now())
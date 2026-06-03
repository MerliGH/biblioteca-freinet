from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.database import Base


class Categoria(Base):
    __tablename__ = "categorias"

    id_categoria = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False, unique=True)
    descripcion = Column(Text, nullable=True)
    estado = Column(Boolean, default=True)
    fecha_registro = Column(DateTime, server_default=func.now())
    
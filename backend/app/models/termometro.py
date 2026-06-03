from sqlalchemy import Column, Integer, Text, DateTime, Boolean, ForeignKey, Date
from sqlalchemy.sql import func

from app.database import Base


class Termometro(Base):
    __tablename__ = "termometro"

    id_termometro = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)
    libro_id = Column(Integer, ForeignKey("libros.id_libro"), nullable=False)
    registrado_por = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)

    fecha_acreditacion = Column(Date, nullable=False)
    observaciones = Column(Text, nullable=True)

    estado = Column(Boolean, default=True)
    fecha_registro = Column(DateTime, server_default=func.now())
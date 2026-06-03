from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Prestamo(Base):
    __tablename__ = "prestamos"

    id_prestamo = Column(Integer, primary_key=True, index=True)

    usuario_id = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)
    libro_id = Column(Integer, ForeignKey("libros.id_libro"), nullable=False)
    autorizado_por = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)

    fecha_prestamo = Column(Date, server_default=func.current_date())
    fecha_limite = Column(Date, nullable=False)
    fecha_devolucion = Column(Date, nullable=True)

    estado = Column(String(20), default="Prestado")
    fecha_registro = Column(DateTime, server_default=func.now())
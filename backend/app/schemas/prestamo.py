from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class PrestamoBase(BaseModel):
    usuario_id: int
    libro_id: int
    autorizado_por: int
    fecha_limite: date
    fecha_devolucion: Optional[date] = None
    estado: str = "Prestado"


class PrestamoCreate(PrestamoBase):
    pass


class PrestamoUpdate(PrestamoBase):
    pass


class PrestamoResponse(PrestamoBase):
    id_prestamo: int
    fecha_prestamo: date
    fecha_registro: datetime

    class Config:
        from_attributes = True
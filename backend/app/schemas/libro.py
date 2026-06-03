from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class LibroBase(BaseModel):
    categoria_id: int
    titulo: str
    autor_ilustrador: Optional[str] = None
    serie: Optional[str] = None
    procedencia: Optional[str] = None
    cantidad_total: int = 1
    cantidad_disponible: int = 1
    seccion: Optional[str] = None
    estado: Optional[bool] = True


class LibroCreate(LibroBase):
    pass


class LibroUpdate(LibroBase):
    pass


class LibroResponse(LibroBase):
    id_libro: int
    fecha_registro: datetime

    class Config:
        from_attributes = True
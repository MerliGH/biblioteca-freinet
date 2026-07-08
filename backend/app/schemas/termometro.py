from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class TermometroBase(BaseModel):
    usuario_id: int
    libro_id: int
    registrado_por: int
    fecha_acreditacion: Optional[date] = None
    observaciones: Optional[str] = None


class TermometroCreate(TermometroBase):
    pass


class TermometroUpdate(BaseModel):
    fecha_acreditacion: Optional[date] = None
    observaciones: Optional[str] = None
    estado: Optional[bool] = None


class TermometroResponse(TermometroBase):
    id_termometro: int
    estado: bool
    fecha_registro: datetime

    class Config:
        from_attributes = True
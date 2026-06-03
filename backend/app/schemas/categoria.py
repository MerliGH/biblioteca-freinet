from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CategoriaBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    estado: Optional[bool] = True


class CategoriaCreate(CategoriaBase):
    pass


class CategoriaUpdate(CategoriaBase):
    pass


class CategoriaResponse(CategoriaBase):
    id_categoria: int
    fecha_registro: datetime

    class Config:
        from_attributes = True
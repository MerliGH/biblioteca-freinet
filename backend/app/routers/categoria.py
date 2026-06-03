from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.categoria import Categoria
from app.schemas.categoria import (
    CategoriaCreate,
    CategoriaUpdate,
    CategoriaResponse
)


router = APIRouter(
    prefix="/categorias",
    tags=["Categorias"]
)


@router.get("/", response_model=List[CategoriaResponse])
def listar_categorias(db: Session = Depends(get_db)):
    categorias = db.query(Categoria).all()
    return categorias


@router.post("/", response_model=CategoriaResponse)
def crear_categoria(categoria: CategoriaCreate, db: Session = Depends(get_db)):
    nueva_categoria = Categoria(**categoria.model_dump())
    db.add(nueva_categoria)
    db.commit()
    db.refresh(nueva_categoria)
    return nueva_categoria


@router.get("/{id_categoria}", response_model=CategoriaResponse)
def obtener_categoria(id_categoria: int, db: Session = Depends(get_db)):
    categoria = db.query(Categoria).filter(
        Categoria.id_categoria == id_categoria
    ).first()

    if not categoria:
        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    return categoria


@router.put("/{id_categoria}", response_model=CategoriaResponse)
def actualizar_categoria(
    id_categoria: int,
    datos: CategoriaUpdate,
    db: Session = Depends(get_db)
):
    categoria = db.query(Categoria).filter(
        Categoria.id_categoria == id_categoria
    ).first()

    if not categoria:
        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    for campo, valor in datos.model_dump().items():
        setattr(categoria, campo, valor)

    db.commit()
    db.refresh(categoria)

    return categoria


@router.delete("/{id_categoria}")
def eliminar_categoria(id_categoria: int, db: Session = Depends(get_db)):
    categoria = db.query(Categoria).filter(
        Categoria.id_categoria == id_categoria
    ).first()

    if not categoria:
        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    categoria.estado = False
    db.commit()
    db.refresh(categoria)

    return {"mensaje": "Categoría desactivada correctamente"}
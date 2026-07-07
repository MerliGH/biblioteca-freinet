from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.categoria import Categoria
from app.models.libro import Libro
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
    categorias = (
        db.query(Categoria)
        .filter(Categoria.estado == True)
        .all()
    )
    return categorias

@router.post("/", response_model=CategoriaResponse)
def crear_categoria(categoria: CategoriaCreate, db: Session = Depends(get_db)):

    categoria_existente = db.query(Categoria).filter(
        Categoria.nombre == categoria.nombre
    ).first()

    if categoria_existente:
        raise HTTPException(
            status_code=400,
            detail="La categoría ya existe"
        )

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

    categoria_existente = db.query(Categoria).filter(
        Categoria.nombre == datos.nombre,
        Categoria.id_categoria != id_categoria
    ).first()

    if categoria_existente:
        raise HTTPException(
            status_code=400,
            detail="Ya existe otra categoría con ese nombre"
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

    libro_activo = db.query(Libro).filter(
        Libro.categoria_id == id_categoria,
        Libro.estado == True
    ).first()

    if libro_activo:
        raise HTTPException(
            status_code=400,
            detail="No se puede desactivar una categoría con libros activos"
        )

    categoria.estado = False

    db.commit()
    db.refresh(categoria)

    return {
        "mensaje": "Categoría desactivada correctamente"
    }
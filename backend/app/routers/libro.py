from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.libro import Libro
from app.models.categoria import Categoria
from app.schemas.libro import LibroCreate, LibroUpdate, LibroResponse


router = APIRouter(
    prefix="/libros",
    tags=["Libros"]
)

@router.get("/", response_model=List[LibroResponse])
def obtener_libros(db: Session = Depends(get_db)):
    libros = db.query(Libro).filter(Libro.estado == True).all()
    return libros

@router.get("/{id_libro}", response_model=LibroResponse)
def obtener_libro(id_libro: int, db: Session = Depends(get_db)):
    libro = db.query(Libro).filter(
        Libro.id_libro == id_libro,
        Libro.estado == True
    ).first()

    if not libro:
        raise HTTPException(
            status_code=404,
            detail="Libro no encontrado"
        )

    return libro

@router.post("/", response_model=LibroResponse)
def crear_libro(libro: LibroCreate, db: Session = Depends(get_db)):

    categoria = db.query(Categoria).filter(
        Categoria.id_categoria == libro.categoria_id,
        Categoria.estado == True
    ).first()

    if not categoria:
        raise HTTPException(
            status_code=400,
            detail="La categoría no existe"
        )

    nuevo_libro = Libro(**libro.model_dump())

    db.add(nuevo_libro)
    db.commit()
    db.refresh(nuevo_libro)

    return nuevo_libro

@router.put("/{id_libro}", response_model=LibroResponse)
def actualizar_libro(
    id_libro: int,
    datos: LibroUpdate,
    db: Session = Depends(get_db)
):

    libro = db.query(Libro).filter(
        Libro.id_libro == id_libro,
        Libro.estado == True
    ).first()

    if not libro:
        raise HTTPException(
            status_code=404,
            detail="Libro no encontrado"
        )

    categoria = db.query(Categoria).filter(
        Categoria.id_categoria == datos.categoria_id,
        Categoria.estado == True
    ).first()

    if not categoria:
        raise HTTPException(
            status_code=400,
            detail="La categoría no existe"
        )

    for campo, valor in datos.model_dump().items():
        setattr(libro, campo, valor)

    db.commit()
    db.refresh(libro)

    return libro

@router.delete("/{id_libro}")
def eliminar_libro(
    id_libro: int,
    db: Session = Depends(get_db)
):

    libro = db.query(Libro).filter(
        Libro.id_libro == id_libro,
        Libro.estado == True
    ).first()

    if not libro:
        raise HTTPException(
            status_code=404,
            detail="Libro no encontrado"
        )

    libro.estado = False

    db.commit()

    return {
        "mensaje": "Libro eliminado correctamente"
    }
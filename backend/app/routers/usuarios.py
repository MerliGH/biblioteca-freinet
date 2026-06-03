from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.usuario import Usuario
from app.models.prestamo import Prestamo
from app.schemas.usuario import (
    UsuarioCreate,
    UsuarioResponse,
    UsuarioUpdate
)


router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)


@router.get("/", response_model=List[UsuarioResponse])
def listar_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).filter(Usuario.estado == True).all()
    return usuarios


@router.post("/", response_model=UsuarioResponse)
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):

    correo_existente = db.query(Usuario).filter(
        Usuario.correo == usuario.correo
    ).first()

    if correo_existente:
        raise HTTPException(
            status_code=400,
            detail="El correo ya está registrado"
        )

    nuevo_usuario = Usuario(**usuario.model_dump())

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return nuevo_usuario


@router.get("/{id_usuario}", response_model=UsuarioResponse)
def obtener_usuario(id_usuario: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario,
        Usuario.estado == True
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    return usuario


@router.put("/{id_usuario}", response_model=UsuarioResponse)
def actualizar_usuario(
    id_usuario: int,
    datos: UsuarioUpdate,
    db: Session = Depends(get_db)
):
    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario,
        Usuario.estado == True
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    correo_existente = db.query(Usuario).filter(
        Usuario.correo == datos.correo,
        Usuario.id_usuario != id_usuario
    ).first()

    if correo_existente:
        raise HTTPException(
            status_code=400,
            detail="El correo ya está registrado por otro usuario"
        )

    for campo, valor in datos.model_dump().items():
        setattr(usuario, campo, valor)

    db.commit()
    db.refresh(usuario)

    return usuario


@router.delete("/{id_usuario}")
def eliminar_usuario(id_usuario: int, db: Session = Depends(get_db)):

    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario,
        Usuario.estado == True
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    prestamo_pendiente = db.query(Prestamo).filter(
        Prestamo.usuario_id == id_usuario,
        Prestamo.estado.in_(["PRESTADO", "VENCIDO"])
    ).first()

    if prestamo_pendiente:
        raise HTTPException(
            status_code=400,
            detail="No se puede desactivar un usuario con préstamos activos o vencidos"
        )

    usuario.estado = False

    db.commit()

    return {
        "mensaje": "Usuario desactivado correctamente"
    }
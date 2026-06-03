from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import date

from app.database import get_db
from app.models.termometro import Termometro
from app.models.usuario import Usuario
from app.models.libro import Libro
from app.models.prestamo import Prestamo
from app.schemas.termometro import (
    TermometroCreate,
    TermometroUpdate,
    TermometroResponse
)


router = APIRouter(
    prefix="/termometro",
    tags=["Termometro"]
)


@router.get("/", response_model=List[TermometroResponse])
def listar_registros(db: Session = Depends(get_db)):
    registros = db.query(Termometro).filter(
        Termometro.estado == True
    ).all()

    return registros


@router.get("/{id_termometro}", response_model=TermometroResponse)
def obtener_registro(id_termometro: int, db: Session = Depends(get_db)):
    registro = db.query(Termometro).filter(
        Termometro.id_termometro == id_termometro
    ).first()

    if not registro:
        raise HTTPException(
            status_code=404,
            detail="Registro de termómetro no encontrado"
        )

    return registro


@router.post("/", response_model=TermometroResponse)
def crear_registro(registro: TermometroCreate, db: Session = Depends(get_db)):
    alumno = db.query(Usuario).filter(
        Usuario.id_usuario == registro.usuario_id,
        Usuario.estado == True,
        Usuario.rol == "ALUMNO"
    ).first()

    if not alumno:
        raise HTTPException(
            status_code=404,
            detail="El alumno no existe, está inactivo o no tiene rol de alumno"
        )

    libro = db.query(Libro).filter(
        Libro.id_libro == registro.libro_id,
        Libro.estado == True
    ).first()

    if not libro:
        raise HTTPException(
            status_code=404,
            detail="El libro no existe o está inactivo"
        )

    docente = db.query(Usuario).filter(
        Usuario.id_usuario == registro.registrado_por,
        Usuario.estado == True,
        Usuario.rol.in_(["DOCENTE", "DIRECTORA"])
    ).first()

    if not docente:
        raise HTTPException(
            status_code=404,
            detail="El usuario que registra no existe, está inactivo o no tiene permiso"
        )

    if registro.fecha_acreditacion > date.today():
        raise HTTPException(
            status_code=400,
            detail="La fecha de acreditación no puede ser futura"
        )

    prestamo_devuelto = db.query(Prestamo).filter(
        Prestamo.usuario_id == registro.usuario_id,
        Prestamo.libro_id == registro.libro_id,
        Prestamo.estado == "DEVUELTO"
    ).first()

    if not prestamo_devuelto:
        raise HTTPException(
            status_code=400,
            detail="No se puede registrar en termómetro porque no existe un préstamo devuelto de este libro para este alumno"
        )

    registro_existente = db.query(Termometro).filter(
        Termometro.usuario_id == registro.usuario_id,
        Termometro.libro_id == registro.libro_id,
        Termometro.estado == True
    ).first()

    if registro_existente:
        raise HTTPException(
            status_code=400,
            detail="Este libro ya fue registrado en el termómetro para este alumno"
        )

    nuevo_registro = Termometro(**registro.model_dump())

    db.add(nuevo_registro)
    db.commit()
    db.refresh(nuevo_registro)

    return nuevo_registro


@router.put("/{id_termometro}", response_model=TermometroResponse)
def actualizar_registro(
    id_termometro: int,
    datos: TermometroUpdate,
    db: Session = Depends(get_db)
):
    registro = db.query(Termometro).filter(
        Termometro.id_termometro == id_termometro
    ).first()

    if not registro:
        raise HTTPException(
            status_code=404,
            detail="Registro de termómetro no encontrado"
        )

    datos_actualizados = datos.model_dump(exclude_unset=True)

    if "fecha_acreditacion" in datos_actualizados:
        if datos_actualizados["fecha_acreditacion"] > date.today():
            raise HTTPException(
                status_code=400,
                detail="La fecha de acreditación no puede ser futura"
            )

    for campo, valor in datos_actualizados.items():
        setattr(registro, campo, valor)

    db.commit()
    db.refresh(registro)

    return registro


@router.delete("/{id_termometro}", response_model=TermometroResponse)
def eliminar_registro(id_termometro: int, db: Session = Depends(get_db)):
    registro = db.query(Termometro).filter(
        Termometro.id_termometro == id_termometro
    ).first()

    if not registro:
        raise HTTPException(
            status_code=404,
            detail="Registro de termómetro no encontrado"
        )

    registro.estado = False

    db.commit()
    db.refresh(registro)

    return registro
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import date
from app.database import get_db
from app.models.prestamo import Prestamo
from app.models.usuario import Usuario
from app.models.libro import Libro
from app.schemas.prestamo import PrestamoCreate, PrestamoUpdate, PrestamoResponse



router = APIRouter(
    prefix="/prestamos",
    tags=["Prestamos"]
)


@router.get("/", response_model=List[PrestamoResponse])
def listar_prestamos(db: Session = Depends(get_db)):

    prestamos = db.query(Prestamo).all()

    hoy = date.today()
    cambios = False

    for prestamo in prestamos:
        if (
            prestamo.estado == "PRESTADO"
            and prestamo.fecha_limite < hoy
        ):
            prestamo.estado = "VENCIDO"
            cambios = True

    if cambios:
        db.commit()

    return prestamos

@router.get("/{id_prestamo}", response_model=PrestamoResponse)
def obtener_prestamo(id_prestamo: int, db: Session = Depends(get_db)):
    prestamo = db.query(Prestamo).filter(
        Prestamo.id_prestamo == id_prestamo
    ).first()

    if not prestamo:
        raise HTTPException(
            status_code=404,
            detail="Préstamo no encontrado"
        )

    return prestamo


@router.post("/", response_model=PrestamoResponse)
def crear_prestamo(prestamo: PrestamoCreate, db: Session = Depends(get_db)):
    print(prestamo)

    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == prestamo.usuario_id,
        Usuario.estado == True
    ).first()

    if not usuario:
        raise HTTPException(status_code=400, detail="El usuario no existe")

    autorizador = db.query(Usuario).filter(
        Usuario.id_usuario == prestamo.autorizado_por,
        Usuario.estado == True
    ).first()

    if not autorizador:
        raise HTTPException(status_code=400, detail="El usuario autorizador no existe")

    libro = db.query(Libro).filter(
        Libro.id_libro == prestamo.libro_id,
        Libro.estado == True
    ).first()

    if not libro:
        raise HTTPException(status_code=400, detail="El libro no existe")


    

    if libro.cantidad_disponible <= 0:
        raise HTTPException(status_code=400, detail="No hay ejemplares disponibles")

    

    nuevo_prestamo = Prestamo(**prestamo.model_dump())
    libro.cantidad_disponible -= 1

    db.add(nuevo_prestamo)
    db.commit()
    db.refresh(nuevo_prestamo)

    return nuevo_prestamo


@router.put("/{id_prestamo}", response_model=PrestamoResponse)
def actualizar_prestamo(
    id_prestamo: int,
    datos: PrestamoUpdate,
    db: Session = Depends(get_db)
):
    prestamo = db.query(Prestamo).filter(
        Prestamo.id_prestamo == id_prestamo
    ).first()

    if not prestamo:
        raise HTTPException(status_code=404, detail="Préstamo no encontrado")

    if datos.usuario_id != prestamo.usuario_id:
        raise HTTPException(
            status_code=400,
            detail="No se puede cambiar el usuario de un préstamo existente"
        )

    if datos.libro_id != prestamo.libro_id:
        raise HTTPException(
            status_code=400,
            detail="No se puede cambiar el libro de un préstamo existente"
        )

    if datos.autorizado_por != prestamo.autorizado_por:
        raise HTTPException(
            status_code=400,
            detail="No se puede cambiar el autorizador de un préstamo existente"
        )

    libro = db.query(Libro).filter(
        Libro.id_libro == prestamo.libro_id
    ).first()

    if not libro:
        raise HTTPException(status_code=400, detail="El libro no existe")


    # Validaciones de fecha de devolución
    if datos.estado == "DEVUELTO" and datos.fecha_devolucion is None:
        raise HTTPException(
            status_code=400,
            detail="Debe registrar la fecha de devolución para marcar el préstamo como DEVUELTO"
        )

    if datos.estado != "DEVUELTO" and datos.fecha_devolucion is not None:
        raise HTTPException(
            status_code=400,
            detail="Solo un préstamo DEVUELTO puede tener fecha de devolución"
        )





    if (
    prestamo.estado in ["PRESTADO", "VENCIDO"]
    and datos.estado == "DEVUELTO"
        ):
            libro.cantidad_disponible += 1

    for campo, valor in datos.model_dump().items():
        setattr(prestamo, campo, valor)

    db.commit()
    db.refresh(prestamo)

    return prestamo


@router.delete("/{id_prestamo}")
def eliminar_prestamo(id_prestamo: int):
    raise HTTPException(
        status_code=405,
       detail="Los préstamos no se eliminan; deben marcarse como Devuelto. Si la fecha límite vence sin devolución, el sistema los cambiará automáticamente a Vencido."
    )
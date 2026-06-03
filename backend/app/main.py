from fastapi import FastAPI
from app.routers import usuarios

app = FastAPI(
    title="API Biblioteca Freinet",
    description="Backend para el sistema de control de biblioteca escolar",
    version="1.0.0"
)

app.include_router(usuarios.router)


@app.get("/")
def inicio():
    return {"mensaje": "API Biblioteca Freinet funcionando"}
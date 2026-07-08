from fastapi import FastAPI
from app.routers import usuarios, categoria, libro, prestamo, termometro, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="API Biblioteca Freinet",
    description="Backend para el sistema de control de biblioteca escolar",
    version="1.0.0"
)

app.include_router(usuarios.router)
app.include_router(categoria.router)
app.include_router(libro.router)
app.include_router(prestamo.router)
app.include_router(termometro.router)
app.include_router(auth.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://biblioteca-icf.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def inicio():
    return {"mensaje": "API Biblioteca Freinet funcionando"}
from pydantic import BaseModel


class LoginRequest(BaseModel):
    correo: str
    password: str


class LoginResponse(BaseModel):
    id_usuario: int
    nombre: str
    correo: str
    rol: str
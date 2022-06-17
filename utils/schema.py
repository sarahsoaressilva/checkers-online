from typing import Union
from pydantic import BaseModel

# Modelagem da Tabela.
class UserBase(BaseModel):
    username: str
    email: str

# Base para criação.
class UserCreate(UserBase):
    password: str

# Base para leitura.
class User(UserBase):
    user_id: int
    
    class Config:
        orm_mode = True # Ler os dados mesmo que não seja um dicionário.

from typing import Union, Optional
from pydantic import BaseModel

# Modelagem da Tabela.
class User(BaseModel):
    user_id: Optional[int]
    username: Optional[str]
    email: str
    password: str

# Modelagem da Tabela Tabuleiro.
class Tabuleiro(BaseModel):
    tab_id: Optional[int]
    nome: str
    descricao: str
    valor: float
    img: str
    plano_id: Optional[int]

# Modelagem para Compras
class Compra(BaseModel):
    compra_id: Optional[int]
    user_id: int
    item_id: int
    tipo: int



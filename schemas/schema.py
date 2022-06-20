from typing import Union, Optional
from pydantic import BaseModel

# Modelagem da Tabela.


class User(BaseModel):
    user_id: Optional[int]
    username: Optional[str]
    email: str
    password: str

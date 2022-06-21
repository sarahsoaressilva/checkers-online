from fastapi import APIRouter, Request
from .db import con
from models.model import tabuleiros
from schemas.schema import Tabuleiro

loja = APIRouter()

# Receberá um JSON com as informações sobre o tabuleiro.
@loja.post("/compra")
async def compraTabuleiro(tab: Tabuleiro):
    pass

# Pega todos os tabuleiros e devolve como uma lista de JSONs.
@loja.get("/tabuleiros")
async def getTabuleiros():
    result = con.execute( tabuleiros.select() ).fetchall();
    
    # print( type(result) );
    


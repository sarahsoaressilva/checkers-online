from fastapi import APIRouter, Request
from .db import con
from models.model import tabuleiros, compras
from schemas.schema import Tabuleiro, Compra

loja = APIRouter()

# Receberá um JSON com as informações sobre o tabuleiro.
@loja.post("/compraTabuleiro")
async def compraTabuleiro(compraTab: Compra):

    novoTab = {
        "user_id": compraTab.user_id,
        "item_id": compraTab.item_id,
        "tipo": compraTab.tipo
    }

    # print(new_user);
    # Query de Insert na Tabela.
    result = con.execute( compras.insert().values( novoTab ) )

    print(result)  # Responde um cursor como sucesso.
    return con.execute( compras.select().where(compras.c.user_id == result.lastrowid)).first()  

# Pega todos os tabuleiros e devolve como uma lista de JSONs.
@loja.get("/tabuleiros")
async def getTabuleiros():
    result = con.execute( tabuleiros.select() ).fetchall();
    # print( type(result) ); # list
    return result;


   
    


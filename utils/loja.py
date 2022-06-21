from fastapi import APIRouter, Request

from .db import con
from models.model import tabuleiros, compras, imagensFundo #Tabelas
from schemas.schema import Tabuleiro, Compra, ImagensFundo #Modelos/Classes
import utils.user
import json


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

# Função de compra de imagens.
@loja.post("/compraImagensFundo")
async def compraImagem(compraImg: Compra):

    novaImg = {
        "user_id": compraImg.user_id,
        "item_id": compraImg.item_id,
        "tipo": compraImg.tipo
    }

    # print(new_user);
    # Query de Insert na Tabela.
    result = con.execute( compras.insert().values( novaImg ) )

    print(result)  # Responde um cursor como sucesso.
    return con.execute( compras.select().where(compras.c.user_id == result.lastrowid)).first() 

# Pega todos os tabuleiros e devolve como uma lista de JSONs.
@loja.get("/tabuleiros")
async def getTabuleiros():
    result = con.execute( tabuleiros.select() ).fetchall();
    # print( type(result) ); # list
    return result;

@loja.get("/imagensFundo")
async def getImagensFundo():
    result = con.execute( imagensFundo.select() ).fetchall();
    # print( type(result) ); # list
    return result;

@loja.get("/meusTabuleiros")
async def getMeusTabuleiros():
    
    #url = app.url_path_for('userid');
    #player = RedirectResponse(url=url);

    print("Print aux em loja.py")
    print(utils.user.aux)

    playerId = utils.user.aux;

    meusTabuleiros = con.execute( compras.select().where(compras.c.user_id == playerId )  
    ).fetchall();

    # print(meusTabuleiros);

    aux = list(meusTabuleiros);
    listaTabuleiros = [];
    
    # print(meusTabuleiros);

    for compra, userid, itemid, tipo in aux:
        if( tipo == 1):
            listaTabuleiros.append(itemid);
            print( itemid );
    
    print(listaTabuleiros);

    novaListaTabuleiros = [];
    
    indice = 0;
    for item in listaTabuleiros:
        result = con.execute( tabuleiros.select().where(
            tabuleiros.c.tab_id == item ) 
        ).first();
        print(result);
        novaListaTabuleiros.append( str(result) );
    
    print(novaListaTabuleiros);

    print(json.dumps(novaListaTabuleiros) );
    #return json.dumps(novaListaTabuleiros);


    


    
    # print( type(result) ); # list
    #print(result);

   
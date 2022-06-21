from fastapi import APIRouter, Request
from .db import con
from models.model import users
from schemas.schema import User

user = APIRouter()

player = 'valorDefault';

@user.post("/login")
async def login(user: User):
    # print(user)
    email = user.email
    password = user.password

    if (email == "" or password == ""):
        return False
    else:
        return pesquisaUser(email, password)

    #    return templates.TemplateResponse("board.html", {"request": request})

# Login do usuário (de acordo com ID)
# Erro ao por no navegador. Entra em conflito com o /cadastrar.
'''
@user.get("/{user_id}")
def get_users(user_id: int):
    print(user_id)
    return con.execute( users.select().where(users.c.user_id == user_id) ).first();

  # return con.execute( users.select() ).fetchall();
'''

# Criar usuarios


@user.post("/cadastro")
def create_users(user: User):

    # Substituir depois pelo form do HTML
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": user.password
    }

    # print(new_user);
    # Query de Insert na Tabela.
    result = con.execute(users.insert().values(new_user))
    print(result)  # Responde um cursor como sucesso.
    return con.execute(users.select().where(users.c.user_id == result.lastrowid)).first()

@user.get("/userid")
def getUsername():
    print(player);
    return player;

# Pesquisa de usuário para o login
def pesquisaUser(email: str, passwrd: str):

    result = con.execute(
        users.select().where(
            users.c.email == email and users.c.password == passwrd)
    ).first()

    # Seleciona as informações do usuário.
    userInfo = con.execute(
        users.select(users.c.user_id).where(
            users.c.email == email and users.c.password == passwrd)
    ).first();

    # Printa Id do usuário.
    print(userInfo[0]);

    global player
    player = userInfo[0];
  
    if (result):
        return True
    else:
        return False

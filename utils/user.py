from fastapi import APIRouter, Request
from sympy import false
from .db import con 
from models.model import users
from schemas.schema import User 

user = APIRouter()

@user.post("/login")
async def login(user: User):

    return User.email, User.password;
    #username = request.form['username'];
    #password = request.form['password'];

    #if ( pesquisaUser(username, password) ):
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
    };

    # print(new_user); 
    # Query de Insert na Tabela.
    result = con.execute( users.insert().values(new_user) );
    print(result); # Responde um cursor como sucesso.
    return con.execute( users.select().where(users.c.user_id == result.lastrowid) ).first()



# Pesquisa de usuário para o login
def pesquisaUser(email: str, passwrd: str): 
    
    result = con.execute( 
        users.select().where(
            users.c.email == email and users.c.password == passwrd) 
        ).first()
    
    if (result):
        return True
    else:
        return False
from sqlalchemy.orm import Session

# Erro ao importar
from . import model
from . import schema

# Leitura de usuário por ID.
def get_user(db: Session, user_id: int):
    return db.query(model.User).filter(model.User.id == user_id).first()

# Leitura de usuário por email.
def get_user_by_email(db: Session, email: str):
    return db.query(model.User).filter(model.User.email == email).first()


# Leitura dos 100 usuarios.
def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(model.User).offset(skip).limit(limit).all()

# Criação de usuário.
def create_user(db: Session, user: schema.UserCreate):
    password = user.password 

    db_user = model.User(email=user.email, hashed_password=password)
    db.add(db_user)

    db.commit() # Salva no BD.
    db.refresh(db_user) # Recarrega o bd com as novas infos.

    return db_user




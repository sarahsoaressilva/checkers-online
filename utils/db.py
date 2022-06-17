from importlib_metadata import metadata
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql://b83571dc6d5fc4:90ed83fc@us-cdbr-east-05.cleardb.net/heroku_8e53453ac7a4cef"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

# A instância/classe SessionLocal é uma sessão com o Database. 
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Recebe uma classe. Usado como herança para os outros modelos.
Base = declarative_base()

from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://b83571dc6d5fc4:90ed83fc@us-cdbr-east-05.cleardb.net/heroku_8e53453ac7a4cef"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

meta = MetaData()

con = engine.connect()



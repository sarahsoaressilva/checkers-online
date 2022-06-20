from tokenize import String
from sqlalchemy import Table, Column, true
from sqlalchemy.sql.sqltypes import Integer, String
from utils.db import meta, engine

users = Table("users", meta, 
Column("user_id", Integer, primary_key=True), 
Column("username", String(255) ),
Column("email", String(255) ),
Column("password", String(255) )
)

# Conectar MySQL
meta.create_all(engine)
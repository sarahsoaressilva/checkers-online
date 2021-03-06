from tokenize import String
from sqlalchemy import Table, Column, true
from sqlalchemy.sql.sqltypes import Integer, String, Float
from utils.db import meta, engine

users = Table("users", meta, 
Column("user_id", Integer, primary_key=True), 
Column("username", String(255) ),
Column("email", String(255) ),
Column("password", String(255) )
)

tabuleiros = Table("tabuleiro", meta,
Column("tab_id", Integer, primary_key=True),
Column("nome", String(255) ),
Column("descricao", String(255) ),
Column("valor", Float ),
Column("img", String(300) ),
Column("plano_id", Integer )
)

imagensFundo = Table("imagens_fundo", meta,
Column("fundo_id", Integer, primary_key=True),
Column("nome", String(255) ),
Column("descricao", String(255) ),
Column("valor", Float ),
Column("img", String(300) ),
Column("plano_id", Integer )
)


compras = Table("compra_user", meta,
Column("compra_id", Integer, primary_key=True),
Column("user_id", Integer ),
Column("item_id", Integer ),
Column("tipo", Integer ),
)

# Conectar MySQL
meta.create_all(engine)
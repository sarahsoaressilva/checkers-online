from tables import Col
import db
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

 
class User(db.Base):
    # Nome da tabela a ser modelada.
    __tablename__ = "users"

    # Modelagem das colunas.
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    # Conexão entre as chaves estrangeiras.
    #items = relationship("Item", back_populates="owner")


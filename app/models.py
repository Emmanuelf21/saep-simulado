from sqlalchemy import Column, Integer, String, Date
from .database import Base

class Livros(Base):
    __tablename__ = "livros"

    id = Column(Integer, primary_key=True, index=True)
    nome_livro = Column(String(100), nullable=False)
    autor = Column(String(100), nullable=False)
    categoria = Column(String(50), nullable=False)
    disponibilidade = Column(String(50), nullable=False, default='Disponível')
    aluno = Column(String(200), nullable=True)
    data = Column(Date, nullable=True)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    senha = Column(String, nullable=False)

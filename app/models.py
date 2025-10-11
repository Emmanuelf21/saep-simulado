from sqlalchemy import Column, Integer, String, Date
from .database import Base

class Livros(Base):
    __tablename__ = "livros"

    id = Column(Integer, primary_key=True, index=True)
    nome_livro = Column(String(100), nullable=False)
    autor = Column(String(100), nullable=False)
    categoria = Column(String(50), nullable=False)
    disponibilidade = Column(String(50), nullable=False)
    aluno = Column(String(200), nullable=False)
    data = Column(Date, nullable=False)

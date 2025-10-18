# app/schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import date

class LivroUpdate(BaseModel):
    nome_livro: str
    autor: str
    categoria: str
    disponibilidade: str
    aluno: Optional[str] = None
    data: Optional[date] = None  # ou datetime.date se for usar data real
    
class LivroCreate(BaseModel):
    nome_livro: str
    autor: str
    categoria: str
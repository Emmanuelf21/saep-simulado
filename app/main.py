from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import select
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from .database import SessionLocal, engine, Base
from .crud import get_users, create_user, create_livro, get_livros
from .schemas import LivroUpdate
from .models import Livros
from .schemas import LivroCreate

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Criar as tabelas no banco
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Dependency para injetar o banco na rota
async def get_db():
    async with SessionLocal() as session:
        yield session

@app.get("/users/")
async def read_users(db: AsyncSession = Depends(get_db)):
    return await get_users(db)

@app.post("/users/")
async def add_user(name: str, email: str, senha:str, db:AsyncSession = Depends(get_db)):
    return await create_user(db, name, email, senha)

@app.get("/livros/")
async def read_livros(db: AsyncSession = Depends(get_db)):
    return await get_livros(db)

# @app.post("/livros/")
# async def add_livro(nome_livro:str, autor: str, categoria: str, db: AsyncSession = Depends(get_db)):
#     return await create_livro(db, nome_livro, autor, categoria)
@app.post("/livros/")
async def add_livro(livro: LivroCreate, db: AsyncSession = Depends(get_db)):
    return await create_livro(db, livro.nome_livro, livro.autor, livro.categoria)

@app.put("/livros/{id}")
async def atualizar_livro(id: int, livro: LivroUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Livros).where(Livros.id == id))
    livro_db = result.scalars().first()

    if not livro_db:
        raise HTTPException(status_code=404, detail="Livro não encontrado")

    # Atualiza os campos recebidos
    for campo, valor in livro.dict().items():
        setattr(livro_db, campo, valor)

    await db.commit()
    await db.refresh(livro_db)

    return livro_db

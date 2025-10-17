from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from .models import User, Livros

async def get_users(db: AsyncSession):
    result = await db.execute(select(User))
    return result.scalars().all()

async def create_user(db: AsyncSession, name: str, email: str, senha:str):
    new_user = User(name=name, email=email, senha=senha)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

async def get_livros(db:AsyncSession):
    result = await db.execute(select(Livros))
    return result.scalars().all()

async def create_livro(db: AsyncSession, nome_livro: str, autor: str, categoria: str):
    new_livro = Livros(nome_livro=nome_livro, autor=autor, categoria=categoria)
    db.add(new_livro)
    await db.commit()
    await db.refresh(new_livro)
    return new_livro
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models, database  # Import relativo ao diretório "app"

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "API rodando com SQL Server"}

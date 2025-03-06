from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat, image, payments

app = FastAPI()

# Konfiguracja CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # W produkcji należy ograniczyć do konkretnych domen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(image.router)
app.include_router(payments.router)

@app.get("/")
def home():
    return {"message": "AI Platform działa poprawnie!"}

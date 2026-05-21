from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database import Base, engine
from routes.products import router as products_router
from routes.categories import router as categories_router
from routes.auth import router as auth_router
from routes.uploads import router as uploads_router
from routes.finance import router as finance_router
from routes.settings import router as settings_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(finance_router, prefix="/finance", tags=["finance"])
app.include_router(uploads_router, prefix="/api/uploads", tags=["uploads"])
app.include_router(products_router, prefix="/products", tags=["products"])
app.include_router(categories_router, prefix="/categories", tags=["categories"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(settings_router, prefix="/settings", tags=["settings"])

@app.get("/")
def root():
    return {"message": "Sinar Baru backend is running"}
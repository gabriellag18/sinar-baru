from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Sinar Baru backend is running"}

@app.get("/products")
def get_products():
    return [
        {"id": 1, "name": "Kantong Plastik", "category": "Plastik"},
        {"id": 2, "name": "Mika Makanan", "category": "Kemasan"},
        {"id": 3, "name": "Dus / Box", "category": "Kemasan"},
    ]
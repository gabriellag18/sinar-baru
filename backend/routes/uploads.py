import os
import uuid
from fastapi import APIRouter, UploadFile, File

router = APIRouter()

UPLOAD_DIR = "uploads/products"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/product-image")
async def upload_product_image(file: UploadFile = File(...)):
    extension = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "image_url": f"/uploads/products/{filename}"
    }

@router.post("/category-image")
async def upload_category_image(file: UploadFile = File(...)):
    extension = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {"image_url": f"/uploads/products/{filename}"}
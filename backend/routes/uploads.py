import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from supabase import create_client

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
BUCKET = os.getenv("SUPABASE_BUCKET", "product-images")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


async def upload_to_supabase(file: UploadFile, folder: str):
    extension = file.filename.split(".")[-1]
    filename = f"{folder}/{uuid.uuid4()}.{extension}"

    file_bytes = await file.read()

    try:
        supabase.storage.from_(BUCKET).upload(
            filename,
            file_bytes,
            {
                "content-type": file.content_type,
                "upsert": "false",
            },
        )

        return supabase.storage.from_(BUCKET).get_public_url(filename)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/product-image")
async def upload_product_image(file: UploadFile = File(...)):
    image_url = await upload_to_supabase(file, "products")
    return {"image_url": image_url}


@router.post("/category-image")
async def upload_category_image(file: UploadFile = File(...)):
    image_url = await upload_to_supabase(file, "categories")
    return {"image_url": image_url}
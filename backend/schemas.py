from pydantic import BaseModel
from datetime import date


class TransactionCreate(BaseModel):
    date: date
    type: str
    action: str
    amount: float
    category: str | None = None
    description: str | None = None


class TransactionOut(TransactionCreate):
    id: int

    class Config:
        from_attributes = True


class CategoryOut(BaseModel):
    id: int
    name: str
    description: str | None = None
    image_url: str | None = None

    class Config:
        from_attributes = True


class CategoryCreate(BaseModel):
    name: str
    description: str | None = None
    image_url: str | None = None

class ProductOut(BaseModel):
    id: int
    name: str
    price: str
    description: str | None = None
    image_url: str | None = None
    is_featured: bool
    categories: list[CategoryOut]

    class Config:
        from_attributes = True


class ProductCreate(BaseModel):
    name: str
    price: str
    description: str | None = None
    image_url: str | None = None
    is_featured: bool = True
    category_ids: list[int]


class ProductUpdate(BaseModel):
    name: str
    price: str
    description: str | None = None
    image_url: str | None = None
    is_featured: bool = True
    category_ids: list[int]
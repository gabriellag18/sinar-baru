from pydantic import BaseModel


class CategoryOut(BaseModel):
    id: int
    name: str
    description: str | None = None

    class Config:
        from_attributes = True


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
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
    category: CategoryOut

    class Config:
        from_attributes = True
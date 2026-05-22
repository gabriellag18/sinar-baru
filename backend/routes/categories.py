from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session, joinedload

from database import SessionLocal
from models import Category
from auth import get_current_admin

router = APIRouter()


class CategoryCreate(BaseModel):
    name: str
    description: str | None = None
    image_url: str | None = None


class CategoryUpdate(BaseModel):
    name: str
    description: str | None = None
    image_url: str | None = None


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_categories(db: Session = Depends(get_db)):
    return (
        db.query(Category)
        .options(joinedload(Category.products))
        .order_by(Category.id)
        .all()
    )


@router.post("/")
def create_category(data: CategoryCreate, db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    category = Category(
        name=data.name,
        description=data.description,
        image_url=data.image_url,
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


@router.put("/{category_id}")
def update_category(
    category_id: int,
    data: CategoryUpdate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    category = db.query(Category).filter(Category.id == category_id).first()

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    category.name = data.name
    category.description = data.description
    category.image_url = data.image_url

    db.commit()
    db.refresh(category)

    return category


@router.delete("/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    category = db.query(Category).filter(Category.id == category_id).first()

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    db.delete(category)
    db.commit()

    return {"message": "Category deleted"}
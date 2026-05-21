from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload

from database import SessionLocal
from models import Product
from schemas import ProductOut

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[ProductOut])
def get_products(db: Session = Depends(get_db)):
    return (
        db.query(Product)
        .options(joinedload(Product.category))
        .order_by(Product.id)
        .all()
    )


@router.get("/featured", response_model=list[ProductOut])
def get_featured_products(db: Session = Depends(get_db)):
    return (
        db.query(Product)
        .options(joinedload(Product.category))
        .filter(Product.is_featured == True)
        .order_by(Product.id)
        .all()
    )
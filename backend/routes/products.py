from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from database import SessionLocal
from models import Category, Product
from schemas import ProductCreate, ProductOut, ProductUpdate

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
        .options(joinedload(Product.categories))
        .order_by(Product.id)
        .all()
    )


@router.get("/featured", response_model=list[ProductOut])
def get_featured_products(db: Session = Depends(get_db)):
    return (
        db.query(Product)
        .options(joinedload(Product.categories))
        .filter(Product.is_featured == True)
        .order_by(Product.id)
        .all()
    )


@router.post("/", response_model=ProductOut)
def create_product(data: ProductCreate, db: Session = Depends(get_db)):
    categories = (
        db.query(Category)
        .filter(Category.id.in_(data.category_ids))
        .all()
    )

    if len(categories) != len(data.category_ids):
        raise HTTPException(status_code=400, detail="Invalid category id")

    product = Product(
        name=data.name,
        price=data.price,
        description=data.description,
        image_url=data.image_url,
        is_featured=data.is_featured,
        categories=categories,
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


@router.put("/{product_id}", response_model=ProductOut)
def update_product(
    product_id: int,
    data: ProductUpdate,
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    categories = (
        db.query(Category)
        .filter(Category.id.in_(data.category_ids))
        .all()
    )

    if len(categories) != len(data.category_ids):
        raise HTTPException(status_code=400, detail="Invalid category id")

    product.name = data.name
    product.price = data.price
    product.description = data.description
    product.image_url = data.image_url
    product.is_featured = data.is_featured
    product.categories = categories

    db.commit()
    db.refresh(product)

    return product


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()

    return {"message": "Product deleted"}
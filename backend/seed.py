from database import Base, engine, SessionLocal
from models import Category, Product

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

db = SessionLocal()

categories = [
    Category(name="Kantong Plastik"),
    Category(name="Mika Makanan"),
]

db.add_all(categories)
db.commit()

category_map = {
    category.name: category
    for category in categories
}

products = [
    Product(
        name="Sedotan Warna",
        price="Rp 7.500 / pack",
        categories=[
            category_map["Mika Makanan"],
            category_map["Kantong Plastik"],
        ],
    )
]

db.add_all(products)
db.commit()

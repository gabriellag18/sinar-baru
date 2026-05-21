from database import Base, engine, SessionLocal
from models import Category, Product

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

db = SessionLocal()

categories = [
    Category(name="Kantong Plastik"),
    Category(name="Mika Makanan"),
    Category(name="Mika 1"),
    Category(name="Mika 2"),
    Category(name="Mika 3"),
    Category(name="Mika 4"),

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
    ),
    Product(
        name="Sedotan 1",
        price="Rp 7.500 / pack",
        categories=[
            category_map["Mika Makanan"],
            category_map["Kantong Plastik"],
        ],
    ),
    Product(
        name="Sedotan 2",
        price="Rp 7.500 / pack",
        categories=[
            category_map["Mika Makanan"],
            category_map["Kantong Plastik"],
        ],
    ),
    Product(
        name="Sedotan 3",
        price="Rp 7.500 / pack",
        categories=[
            category_map["Mika Makanan"],
            category_map["Kantong Plastik"],
        ],
    ),
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

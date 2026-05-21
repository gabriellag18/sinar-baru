from database import Base, engine, SessionLocal
from models import Product

Base.metadata.create_all(bind=engine)

db = SessionLocal()

products = [
    Product(name="Gelas Plastik 16 oz", category="Gelas Plastik", price="Rp 125 / pcs", image_url="/products/gelas-plastik.png"),
    Product(name="Styrofoam Makanan Kotak", category="Styrofoam", price="Rp 550 / pack", image_url="/products/styrofoam.png"),
    Product(name="Sedotan Warna", category="Sedotan", price="Rp 7.500 / pack", image_url="/products/sedotan.png"),
    Product(name="Kantong Plastik HD 24x40", category="Kantong Plastik", price="Rp 18.000 / pack", image_url="/products/kantong-plastik.png"),
]

db.query(Product).delete()
db.add_all(products)
db.commit()
db.close()

print("Seed done")
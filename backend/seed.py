from database import Base, engine, SessionLocal
from models import Category, Product

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

db = SessionLocal()

categories = [
    Category(name="Kantong Plastik", description="Berbagai ukuran kantong plastik."),
    Category(name="Plastik Kemasan", description="Kemasan plastik untuk usaha."),
    Category(name="Mika Makanan", description="Mika dan box makanan."),
    Category(name="Dus & Box", description="Dus dan box untuk kemasan."),
    Category(name="Sedotan & Sendok", description="Perlengkapan makan sekali pakai."),
    Category(name="Perlengkapan Toko", description="Kebutuhan toko lainnya."),
]

db.add_all(categories)
db.commit()

category_map = {category.name: category for category in db.query(Category).all()}

products = [
    Product(
        name="Gelas Plastik 16 oz",
        price="Rp 125 / pcs",
        description="Gelas plastik untuk minuman dingin.",
        image_url=None,
        is_featured=True,
        category_id=category_map["Plastik Kemasan"].id,
    ),
    Product(
        name="Styrofoam Makanan Kotak",
        price="Rp 550 / pack",
        description="Kotak makanan praktis untuk usaha kuliner.",
        image_url=None,
        is_featured=True,
        category_id=category_map["Mika Makanan"].id,
    ),
    Product(
        name="Sedotan Warna",
        price="Rp 7.500 / pack",
        description="Sedotan warna-warni untuk minuman.",
        image_url=None,
        is_featured=True,
        category_id=category_map["Sedotan & Sendok"].id,
    ),
    Product(
        name="Kantong Plastik HD 24x40",
        price="Rp 18.000 / pack",
        description="Kantong plastik HD berbagai ukuran.",
        image_url=None,
        is_featured=True,
        category_id=category_map["Kantong Plastik"].id,
    ),
]

db.add_all(products)
db.commit()
db.close()

print("Seed done")
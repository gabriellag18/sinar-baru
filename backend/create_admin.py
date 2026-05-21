from database import Base, engine, SessionLocal
from models import Admin
from auth import hash_password

Base.metadata.create_all(bind=engine)

db = SessionLocal()

username = "admin"
password = "admin123"

existing = db.query(Admin).filter(Admin.username == username).first()

if existing:
    print("Admin already exists")
else:
    admin = Admin(username=username, hashed_password=hash_password(password))
    db.add(admin)
    db.commit()
    print("Admin created")

db.close()
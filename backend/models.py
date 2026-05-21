from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table, Text, Date, Float
from sqlalchemy.orm import relationship

from database import Base


product_categories = Table(
    "product_categories",
    Base.metadata,
    Column("product_id", ForeignKey("products.id"), primary_key=True),
    Column("category_id", ForeignKey("categories.id"), primary_key=True),
)

class SiteSetting(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, nullable=False, unique=True)
    value = Column(String, nullable=False)
    
class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    type = Column(String, nullable=False)  # income / expense
    action = Column(String, nullable=False)  # buy / sell / other
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=True)
    description = Column(Text, nullable=True)

class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    
class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    products = relationship(
        "Product",
        secondary=product_categories,
        back_populates="categories",
    )


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    is_featured = Column(Boolean, default=True)

    categories = relationship(
        "Category",
        secondary=product_categories,
        back_populates="products",
    )
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Transaction
from schemas import TransactionCreate, TransactionOut

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/transactions", response_model=list[TransactionOut])
def get_transactions(db: Session = Depends(get_db)):
    return db.query(Transaction).order_by(Transaction.date.desc()).all()


@router.post("/transactions", response_model=TransactionOut)
def create_transaction(data: TransactionCreate, db: Session = Depends(get_db)):
    transaction = Transaction(**data.model_dump())
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction


@router.delete("/transactions/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()

    if transaction:
      db.delete(transaction)
      db.commit()

    return {"message": "Transaction deleted"}
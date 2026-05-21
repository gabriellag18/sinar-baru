from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import SessionLocal
from models import SiteSetting

router = APIRouter()


class SettingUpdate(BaseModel):
    value: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/{key}")
def get_setting(key: str, db: Session = Depends(get_db)):
    setting = db.query(SiteSetting).filter(SiteSetting.key == key).first()

    if not setting:
        return {"key": key, "value": ""}

    return setting


@router.put("/{key}")
def update_setting(key: str, data: SettingUpdate, db: Session = Depends(get_db)):
    setting = db.query(SiteSetting).filter(SiteSetting.key == key).first()

    if setting:
        setting.value = data.value
    else:
        setting = SiteSetting(key=key, value=data.value)
        db.add(setting)

    db.commit()
    db.refresh(setting)

    return setting
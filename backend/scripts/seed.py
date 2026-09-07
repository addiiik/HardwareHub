import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

from core.database import SessionLocal, engine
from core.security import hash_password
from core.config import IS_DEMO
from models.base_models import (
    Base,
    User,
    HardwareItem,
    Note,
    Rental,
    Repair,
    StatusEnum,
    RoleEnum,
)
from .seed_data import SEED_ITEMS

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    if db.query(HardwareItem).first():
        db.close()
        return

    if IS_DEMO:
        for item_data in SEED_ITEMS:
            item = HardwareItem(
                id=item_data["id"],
                serial_number=item_data["serialNumber"],
                name=item_data["name"],
                brand=item_data.get("brand"),
                category=item_data["category"],
                purchase_date=item_data.get("purchaseDate"),
                status=item_data["status"],
                rentable=item_data.get("rentable", True)
            )
            db.add(item)
            db.flush()

            if item_data["status"] == StatusEnum.IN_REPAIR:
                db.add(Repair(item_id=item.id))

        db.commit()
        print("DB seeded for DEMO mode with 200 items.")

    else:
        admin_user = User(
            first_name="Admin",
            last_name="User",
            email="admin@company.com",
            password=hash_password("admincompanyhub"),
            role=RoleEnum.ADMIN
        )
        john_doe = User(
            first_name="John",
            last_name="Doe",
            email="j.doe@company.com",
            password=hash_password("johndoeuser"),
            role=RoleEnum.EMPLOYEE
        )
        db.add(admin_user)
        db.add(john_doe)
        db.commit()

        for item_data in SEED_ITEMS[:50]:
            item = HardwareItem(
                id=item_data["id"],
                serial_number=item_data["serialNumber"],
                name=item_data["name"],
                brand=item_data.get("brand"),
                category=item_data["category"],
                purchase_date=item_data.get("purchaseDate"),
                status=item_data["status"],
                rentable=item_data.get("rentable", True)
            )
            db.add(item)
            db.flush()

            if item_data["status"] == StatusEnum.IN_USE:
                db.add(Rental(user_id=john_doe.id, item_id=item.id))
            elif item_data["status"] == StatusEnum.IN_REPAIR:
                db.add(Repair(item_id=item.id))

        db.commit()
        print("DB seeded for STANDARD mode.")

    db.close()

if __name__ == "__main__":
    seed_database()
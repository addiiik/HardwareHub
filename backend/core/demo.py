from faker import Faker
from sqlalchemy.orm import Session
from fastapi import Response
import models
from core.security import create_access_token, hash_password
from core.config import COOKIE_DOMAIN, COOKIE_SAMESITE, COOKIE_SECURE

fake = Faker()

def create_demo_user(role: str, response: Response, db: Session):
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = f"{first_name.lower()}.{last_name.lower()}@company.com"

    user = models.User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hash_password(fake.password()),
        role=role,
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": str(user.role)
        },
        is_indefinite=True
    )

    INDEFINITE_AGE = 315360000

    response.set_cookie(
        key="access_token",
        value=f"Bearer {token}",
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        domain=COOKIE_DOMAIN,
        max_age=INDEFINITE_AGE
    )

    return user
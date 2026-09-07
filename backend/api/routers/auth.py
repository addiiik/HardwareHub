from fastapi import APIRouter, Depends, HTTPException, Response
from pydantic import BaseModel
from sqlalchemy.orm import Session
import models
import schemas
from core.database import get_db
from core.security import verify_password, create_access_token
from core.config import COOKIE_DOMAIN, COOKIE_SAMESITE, COOKIE_SECURE, IS_DEMO
from core.demo import create_demo_user
from api.deps import get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])

class DemoLoginRequest(BaseModel):
    role: str

@router.post("/login", response_model=schemas.UserResponse)
def login(
    credentials: schemas.LoginRequest,
    response: Response,
    db: Session = Depends(get_db)
):
    if IS_DEMO:
        raise HTTPException(
            status_code=403,
            detail="Standard authentication is disabled in Demo mode."
        )

    user = (
        db.query(models.User)
        .filter(models.User.email == credentials.email)
        .first()
    )

    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
        
    if not user.is_active:
        raise HTTPException(
            status_code=401,
            detail="Account is deactivated"
        )

    token = create_access_token({
        "sub": str(user.id),
        "email": user.email,
        "role": str(user.role)
    })

    response.set_cookie(
        key="access_token",
        value=f"Bearer {token}",
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        domain=COOKIE_DOMAIN,
        max_age=86400
    )

    return user

@router.post("/demo-login", response_model=schemas.UserResponse)
def demo_login(
    payload: DemoLoginRequest,
    response: Response,
    db: Session = Depends(get_db)
):
    if not IS_DEMO:
        raise HTTPException(
            status_code=403,
            detail="Demo login endpoint is disabled."
        )
    
    if payload.role not in ["EMPLOYEE", "ADMIN"]:
        raise HTTPException(status_code=400, detail="Invalid role specified.")

    return create_demo_user(payload.role, response, db)

@router.get("/me", response_model=schemas.UserResponse)
def me(user=Depends(get_current_user)):
    return user

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        domain=COOKIE_DOMAIN
    )
    return {"message": "Logged out"}
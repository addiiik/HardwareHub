from sqlalchemy.orm import Session
from models.base_models import User, Notification, RoleEnum

def notify_admins(db: Session, title: str, content: str):
    """Dynamically fetches the current admins and sends them a notification."""
    current_admins = db.query(User).filter(User.role == RoleEnum.ADMIN).all()
    
    for admin in current_admins:
        db.add(Notification(
            user_id=admin.id,
            title=title,
            content=content
        ))
    db.commit()
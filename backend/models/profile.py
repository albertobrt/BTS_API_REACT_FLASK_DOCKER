from extensions import db
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class UserProfile(db.Model):
    __tablename__ = 'user_profiles'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)

    first_name = Column(String(50))
    last_name = Column(String(50))
    bio = Column(String(500))
    address = Column(String(200))
    phone_number = Column(String(20))

    user = relationship("User", back_populates="profile")

from sqlalchemy import Column, Date, DateTime, Integer, Float, Enum
from sqlalchemy.orm import relationship

from database import Base


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    total_price = Column(Float, nullable=False)
    created_at = Column(Date, default=Date)
    state = Column(Enum("pending", "closed", "cancelled"), default="pending")
    items = relationship("SaleItem", back_populates="sale", cascade="all, delete-orphan")

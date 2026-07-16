from .Database import Base
from sqlalchemy import Column, Integer, String, ForeignKey

class Userss(Base):
    __tablename__ = "Userss"

    Id = Column(Integer, primary_key = True, nullable = False)
    Name = Column(String, nullable = False)
    Email = Column(String, nullable=False)
    Password = Column(String, nullable = False)
    Phone_Number = Column(String)


class Postss(Base):
    __tablename__ = "Postss"

    Id = Column(Integer, primary_key=True, nullable = False)
    Title = Column(String, nullable = False)
    Content = Column(String, nullable = True)
    Upload_File = Column(String, nullable = True)
    Owner_Id = Column(Integer, ForeignKey("Userss.Id", ondelete="CASCADE", onupdate="CASCADE"), nullable = False)

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PersonBase(BaseModel):
    name: str
    email: str
    age: Optional[int] = None
    skills: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None


class PersonCreate(PersonBase):
    pass


class PersonUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    age: Optional[int] = None
    skills: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None


class Person(PersonBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 

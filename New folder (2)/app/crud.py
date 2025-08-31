from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from typing import List, Optional
from datetime import datetime
from . import models, schemas

def create_person(db: Session, person: schemas.PersonCreate) -> models.Person:
    db_person = models.Person(
        name=person.name,
        email=person.email,
        age=person.age,
        skills=person.skills,
        description=person.description,
        location=person.location
    )
    db.add(db_person)
    db.commit()
    db.refresh(db_person)
    return db_person

def get_all_people(db: Session) -> List[models.Person]:
    return db.query(models.Person).all()

def get_person(db: Session, person_id: int) -> Optional[models.Person]:
    return db.query(models.Person).filter(models.Person.id == person_id).first()

def update_person(db: Session, person_id: int, person_update: schemas.PersonUpdate) -> Optional[models.Person]:
    db_person = get_person(db, person_id)
    if not db_person:
        return None
    
    update_data = person_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_person, field, value)
    
    db_person.updated_at = func.now()
    db.commit()
    db.refresh(db_person)
    return db_person

def delete_person(db: Session, person_id: int) -> bool:
    db_person = get_person(db, person_id)
    if not db_person:
        return False
    
    db.delete(db_person)
    db.commit()
    return True

def search_people(db: Session, query: str) -> List[models.Person]:
    query_lower = query.lower()
    return db.query(models.Person).filter(
        or_(
            models.Person.name.ilike(f"%{query_lower}%"),
            models.Person.skills.ilike(f"%{query_lower}%"),
            models.Person.description.ilike(f"%{query_lower}%"),
            models.Person.location.ilike(f"%{query_lower}%")
        )
    ).all()

def create_sample_people(db: Session):
    sample_people = [
        {
            "name": "John Doe",
            "email": "john@example.com",
            "age": 30,
            "skills": "Python, JavaScript, React",
            "description": "Full-stack developer with 5 years experience",
            "location": "New York"
        },
        {
            "name": "Jane Smith",
            "email": "jane@example.com",
            "age": 28,
            "skills": "Python, Data Science, Machine Learning",
            "description": "Data scientist specializing in ML algorithms",
            "location": "San Francisco"
        }
    ]
    
    for person_data in sample_people:
        db_person = models.Person(**person_data)
        db.add(db_person)
    
    db.commit()

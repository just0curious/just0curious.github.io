from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = "sqlite:///./people_api.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    try:
        print("Starting database initialization...")
        
        from . import models
        print("Models imported successfully")

        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully")

        db = SessionLocal()
        try:
            from .models import Person
            people_count = db.query(Person).count()
            
            if people_count == 0:
                from .crud import create_sample_people
                create_sample_people(db)
                print(f"Database initialized with sample data")
            else:
                print(f"Database already has {people_count} people")
        except Exception as e:
            print(f"Error during sample data creation: {e}")
        finally:
            db.close()
            
        print("Database initialization completed successfully")
        
    except Exception as e:
        print(f"Error during database initialization: {e}")
        raise e 
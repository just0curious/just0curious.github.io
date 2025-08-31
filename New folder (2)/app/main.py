from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timezone
import os


from . import crud, models, schemas
from .database import get_db, init_db

app = FastAPI(
    title="People Manager API",
    description="Simple people profile management system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.on_event("startup")
async def startup_event():
    try:
        print("Starting application...")
        init_db()
        print("Application started successfully!")
    except Exception as e:
        print(f"Failed to start application: {e}")

@app.get("/health")
async def health_check():
    try:
        db = next(get_db())
        
        from sqlalchemy import text
        db.execute(text("SELECT 1"))
        db.close()
        return {"status": "healthy", "database": "connected", "timestamp": datetime.now(timezone.utc)}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e), "timestamp": datetime.now(timezone.utc)}

@app.post("/people", response_model=schemas.Person)
async def create_person(person: schemas.PersonCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_person(db=db, person=person)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create person: {str(e)}")

@app.get("/people", response_model=List[schemas.Person])
async def get_all_people(db: Session = Depends(get_db)):
    try:
        return crud.get_all_people(db=db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch people: {str(e)}")

@app.get("/people/{person_id}", response_model=schemas.Person)
async def get_person(person_id: int, db: Session = Depends(get_db)):
    try:
        person = crud.get_person(db=db, person_id=person_id)
        if not person:
            raise HTTPException(status_code=404, detail="Person not found")
        return person
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch person: {str(e)}")

@app.put("/people/{person_id}", response_model=schemas.Person)
async def update_person(person_id: int, person_update: schemas.PersonUpdate, db: Session = Depends(get_db)):
    try:
        person = crud.update_person(db=db, person_id=person_id, person_update=person_update)
        if not person:
            raise HTTPException(status_code=404, detail="Person not found")
        return person
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update person: {str(e)}")

@app.delete("/people/{person_id}")
async def delete_person(person_id: int, db: Session = Depends(get_db)):
    try:
        success = crud.delete_person(db=db, person_id=person_id)
        if not success:
            raise HTTPException(status_code=404, detail="Person not found")
        return {"message": "Person deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete person: {str(e)}")

@app.get("/search")
async def search_people(q: str = Query(..., description="Search query"), db: Session = Depends(get_db)):
    try:
        if not q.strip():
            raise HTTPException(status_code=400, detail="Search query cannot be empty")
        
        results = crud.search_people(db=db, query=q)
        return results
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@app.get("/")
async def root():
    return {"message": "People Profile API is running. Visit /static/index.html for the frontend."} 
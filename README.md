# just0curious.github.io
# People Manager

People Manager: is a responsive, browser-based application for managing individual profiles. It allows users to add, edit, search, and delete profiles using a clean and simple interface. The app works both as a standalone frontend (using browser local storage) or connected to a FastAPI backend for persistent storage.

## Live Demo

- URL: https://just0curious-github-io.vercel.app/
- Mode: Demo (frontend only, local storage)

## Features

- Create, edit, and delete individual profiles
- Search across name, skills, bio, and more
- Mobile-friendly responsive design
- Local storage support (no backend required)
- Optional backend integration with FastAPI

## Technology Stack

- **Frontend: HTML, CSS, JavaScript (no frameworks)
- **Backend: FastAPI (Python), SQLite
- **Deployment: Vercel, GitHub Pages ready

# Project Structure

├──just0curious.github.io/
 ├── New Folder(2)/
   ├── root/ # Frontend files
   │ ├── index.html
   │ ├── script.js
   │ └── config.js
   ├── app/ # Backend
   │ ├── main.py
   │ ├── models.py
   │ ├── schemas.py
   │ ├── crud.py
   │ └── database.py
   ├── people_api.db # SQLite database 
 └── README.md




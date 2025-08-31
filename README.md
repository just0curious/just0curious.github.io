# just0curious.github.io
People Manager

People Manager is a modern, responsive web application for managing people profiles. It allows users to add, search, and manage detailed records of individuals in a clean, mobile-friendly interface. The application is built with vanilla JavaScript and can operate either in standalone mode (using local storage) or in full-stack mode with a FastAPI backend.

Live Deployment

Live URL: https://just0curious-github-io.vercel.app/

Deployment Status: Active and running

Deployment Platform: Vercel

Mode: Demo mode (using browser local storage)

Project Overview

People Manager is designed to be lightweight, easy to deploy, and fully functional out-of-the-box. Users can run the application in the browser without any server setup, or connect it to a backend for persistent storage and advanced functionality.

Key Features

Add, view, edit, and delete individual profiles

Search functionality across all fields (name, skills, bio, etc.)

Fully responsive layout for both mobile and desktop

Local storage support for offline demo use

Configurable backend API integration

Clean, minimal interface with dynamic updates

Technology Stack
Layer	Technologies
Frontend	HTML5, CSS3, JavaScript (Vanilla)
Styling	CSS Grid, Flexbox
Backend	FastAPI (Python, optional)
Database	SQLite (optional, via FastAPI)
Deployment	Vercel (frontend), GitHub Pages ready
File Structure
.
├── root/                 # Static frontend files
│   ├── index.html        # Main UI
│   ├── script.js         # Application logic
│   └── config.js         # Configuration settings
│
├── app/                  # FastAPI backend (optional)
│   ├── main.py           # FastAPI entry point
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── crud.py           # CRUD operations
│   └── database.py       # DB connection setup
│
├── people_api.db         # SQLite database file
├── deploy.sh             # Deployment automation script
└── README.md             # Project documentation

Getting Started
Prerequisites

A modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)

Python 3.7+ (for backend setup)

Git (for version control)

Running Frontend Only (Local Demo Mode)

Navigate to the root directory:

cd root


Start a local web server:

python -m http.server 8000


or

npx serve .


Open your browser at: http://localhost:8000

Note: All data will be stored in local storage and persist in the browser until cleared.

Running Full Stack with FastAPI

Install dependencies:

pip install -r requirements.txt


Start the backend server:

uvicorn app.main:app --reload


Update root/config.js to disable demo mode:

const CONFIG = {
    DEMO_MODE: false,
    API_BASE: 'http://localhost:8000'
};


Open the app at: http://localhost:8000/static/index.html

Configuration

The behavior of the app is controlled via root/config.js:

Demo Mode (Default)
const CONFIG = {
    DEMO_MODE: true,
    API_BASE: 'http://localhost:8000'
};

Production Mode
const CONFIG = {
    DEMO_MODE: false,
    API_BASE: 'https://your-production-api.com'
};

API Reference

When connected to a backend, the app uses the following API endpoints:

Method	Endpoint	Description
GET	/people	Get all profiles
POST	/people	Create a new profile
GET	/people/{id}	Retrieve profile by ID
PUT	/people/{id}	Update an existing profile
DELETE	/people/{id}	Delete a profile
GET	/search?q=query	Search profiles
GET	/health	Health check
Data Model

Each profile contains the following fields:

id: Unique identifier (auto-generated)

name: Full name (required)

email: Email address (required, unique)

age: Age (optional)

skills: Comma-separated list of skills (optional)

description: Bio or summary (optional)

location: City/state/country (optional)

created_at: Timestamp of record creation

Deployment
Current Deployment

Deployed on Vercel: https://just0curious-github-io.vercel.app/

Mode: Demo (frontend only using local storage)

Deploying to GitHub Pages

Create a GitHub repository named yourusername.github.io

Copy contents of the root/ folder to the repository

Go to repository settings > Pages

Set source to "Deploy from a branch"

The site will be available at https://yourusername.github.io

Alternative Deployment Options

For full-stack deployments, consider:

Render (Free tier, easy FastAPI support)

Railway (CI/CD-friendly, modern interface)

Heroku (Classic and well-documented)

DigitalOcean App Platform (Scalable cloud deployment)

Roadmap

User authentication and authorization

Profile image upload support

CSV/JSON export and import

Advanced filters and sort functionality

Dark mode support

Service workers and offline-first experience

Real-time collaboration

API rate limiting and caching mechanisms

Troubleshooting

App not loading: Check browser console for JavaScript errors

Search not working: Ensure script.js is loaded and initialized

Data not saving: Verify local storage is supported/enabled

Layout issues: Inspect media queries and responsive breakpoints

Contributing

Fork the repository

Create a feature branch:
git checkout -b feature/my-new-feature

Commit changes and push:
git push origin feature/my-new-feature

Open a pull request describing your changes

License

This project is licensed under the MIT License. See the LICENSE file for full terms.

Acknowledgments

This project was created to demonstrate how a modern, responsive, and full-featured profile management application can be built using standard web technologies. It is intended for educational, learning, and portfolio purposes.

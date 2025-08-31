// People Manager JavaScript - GitHub Pages Compatible Version
// This version works with local storage for demo purposes
// For production, replace with real API calls

// Configuration
const DEMO_MODE = true; // Set to false when connecting to real API
const API_BASE = 'http://localhost:8000'; // Change this to your deployed API URL

// Local Storage Keys
const STORAGE_KEY = 'people_manager_data';

// Utility functions
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // Insert at the top of the people list
    const peopleList = document.getElementById('peopleList');
    peopleList.insertBefore(messageDiv, peopleList.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

// Local Storage Functions (Demo Mode)
function getPeopleFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
}

function savePeopleToStorage(people) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function generateId() {
    return Date.now() + Math.random();
}

// API functions (for when not in demo mode)
async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// People management functions
async function addPerson(event) {
    event.preventDefault();
    
    const personData = {
        id: generateId(),
        name: document.getElementById('personName').value,
        email: document.getElementById('personEmail').value,
        age: document.getElementById('personAge').value ? parseInt(document.getElementById('personAge').value) : null,
        skills: document.getElementById('personSkills').value,
        description: document.getElementById('personDescription').value,
        location: document.getElementById('personLocation').value,
        created_at: new Date().toISOString()
    };
    
    try {
        if (DEMO_MODE) {
            // Demo mode: use local storage
            const people = getPeopleFromStorage();
            people.push(personData);
            savePeopleToStorage(people);
            
            showMessage('Person added successfully! (Demo Mode)');
            clearForm('addPersonForm');
            loadAllPeople();
        } else {
            // Production mode: use API
            await fetchAPI('/people', {
                method: 'POST',
                body: JSON.stringify(personData)
            });
            
            showMessage('Person added successfully!');
            clearForm('addPersonForm');
            loadAllPeople();
        }
    } catch (error) {
        showMessage(`Failed to add person: ${error.message}`, 'error');
    }
}

async function loadAllPeople() {
    try {
        if (DEMO_MODE) {
            // Demo mode: use local storage
            const people = getPeopleFromStorage();
            displayPeople(people);
        } else {
            // Production mode: use API
            const people = await fetchAPI('/people');
            displayPeople(people);
        }
    } catch (error) {
        showMessage(`Failed to load people: ${error.message}`, 'error');
    }
}

async function searchPeople() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        showMessage('Please enter a search query', 'error');
        return;
    }
    
    try {
        if (DEMO_MODE) {
            // Demo mode: search local storage
            const people = getPeopleFromStorage();
            const results = people.filter(person => 
                person.name.toLowerCase().includes(query.toLowerCase()) ||
                person.email.toLowerCase().includes(query.toLowerCase()) ||
                (person.skills && person.skills.toLowerCase().includes(query.toLowerCase())) ||
                (person.description && person.description.toLowerCase().includes(query.toLowerCase())) ||
                (person.location && person.location.toLowerCase().includes(query.toLowerCase()))
            );
            
            displayPeople(results);
            
            if (results.length === 0) {
                showMessage('No people found matching your search', 'error');
            }
        } else {
            // Production mode: use API
            const results = await fetchAPI(`/search?q=${encodeURIComponent(query)}`);
            displayPeople(results);
            
            if (results.length === 0) {
                showMessage('No people found matching your search', 'error');
            }
        }
    } catch (error) {
        showMessage(`Search failed: ${error.message}`, 'error');
    }
}

function displayPeople(people) {
    const peopleList = document.getElementById('peopleList');
    
    if (!people || people.length === 0) {
        peopleList.innerHTML = '<div style="text-align: center; color: #7f8c8d; padding: 20px;">No people found</div>';
        return;
    }
    
    const html = people.map(person => `
        <div class="person-card">
            <div class="person-name">${person.name}</div>
            <div class="person-email">${person.email}</div>
            <div class="person-details">
                ${person.age ? `Age: ${person.age} | ` : ''}
                ${person.location ? `Location: ${person.location}` : ''}
                ${person.skills ? ` | Skills: ${person.skills}` : ''}
            </div>
            ${person.description ? `<div class="person-details" style="margin-top: 5px;">${person.description}</div>` : ''}
            <div class="person-actions">
                <button class="action-btn delete-btn" onclick="deletePerson(${person.id})">Delete</button>
            </div>
        </div>
    `).join('');
    
    peopleList.innerHTML = html;
}

async function deletePerson(personId) {
    if (!confirm('Are you sure you want to delete this person? This action cannot be undone.')) {
        return;
    }
    
    try {
        if (DEMO_MODE) {
            // Demo mode: use local storage
            const people = getPeopleFromStorage();
            const filteredPeople = people.filter(person => person.id !== personId);
            savePeopleToStorage(filteredPeople);
            
            showMessage('Person deleted successfully! (Demo Mode)');
            loadAllPeople();
        } else {
            // Production mode: use API
            await fetchAPI(`/people/${personId}`, { method: 'DELETE' });
            showMessage('Person deleted successfully!');
            loadAllPeople();
        }
    } catch (error) {
        showMessage(`Failed to delete person: ${error.message}`, 'error');
    }
}

// Demo data initialization
function initializeDemoData() {
    if (DEMO_MODE && getPeopleFromStorage().length === 0) {
        const demoPeople = [
            {
                id: generateId(),
                name: "John Doe",
                email: "john.doe@example.com",
                age: 28,
                skills: "Python, JavaScript, React",
                description: "Full-stack developer with 5 years of experience",
                location: "San Francisco, CA",
                created_at: new Date().toISOString()
            },
            {
                id: generateId(),
                name: "Jane Smith",
                email: "jane.smith@example.com",
                age: 32,
                skills: "UI/UX Design, Figma, Adobe Creative Suite",
                description: "Creative designer passionate about user experience",
                location: "New York, NY",
                created_at: new Date().toISOString()
            }
        ];
        savePeopleToStorage(demoPeople);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize demo data
    initializeDemoData();
    
    // Form event listeners
    document.getElementById('addPersonForm').addEventListener('submit', addPerson);
    
    // Enter key support for search
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchPeople();
        }
    });
    
    // Load all people on page load
    loadAllPeople();
});

// Global functions for onclick handlers
window.addPerson = addPerson;
window.loadAllPeople = loadAllPeople;
window.searchPeople = searchPeople;
window.deletePerson = deletePerson; 
// People Manager JavaScript
const API_BASE = 'http://localhost:8000';

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

// API functions
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
        name: document.getElementById('personName').value,
        email: document.getElementById('personEmail').value,
        age: document.getElementById('personAge').value ? parseInt(document.getElementById('personAge').value) : null,
        skills: document.getElementById('personSkills').value,
        description: document.getElementById('personDescription').value,
        location: document.getElementById('personLocation').value
    };
    
    try {
        await fetchAPI('/people', {
            method: 'POST',
            body: JSON.stringify(personData)
        });
        
        showMessage('Person added successfully!');
        clearForm('addPersonForm');
        loadAllPeople(); // Refresh the list
    } catch (error) {
        showMessage(`Failed to add person: ${error.message}`, 'error');
    }
}

async function loadAllPeople() {
    try {
        const people = await fetchAPI('/people');
        displayPeople(people);
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
        const results = await fetchAPI(`/search?q=${encodeURIComponent(query)}`);
        displayPeople(results);
        
        if (results.length === 0) {
            showMessage('No people found matching your search', 'error');
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
        await fetchAPI(`/people/${personId}`, { method: 'DELETE' });
        showMessage('Person deleted successfully!');
        loadAllPeople(); // Refresh the list
    } catch (error) {
        showMessage(`Failed to delete person: ${error.message}`, 'error');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
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



const CONFIG = {

    DEMO_MODE: true,
    

    API_BASE: 'http://localhost:8000',
    

    APP_NAME: 'People Manager',
    APP_VERSION: '1.0.0',
    

    DEMO: {

        SAMPLE_PEOPLE: [
            {
                name: "John Doe",
                email: "john.doe@example.com",
                age: 28,
                skills: "Python, JavaScript, React",
                description: "Full-stack developer with 5 years of experience",
                location: "San Francisco, CA"
            },
            {
                name: "Jane Smith",
                email: "jane.smith@example.com",
                age: 32,
                skills: "UI/UX Design, Figma, Adobe Creative Suite",
                description: "Creative designer passionate about user experience",
                location: "New York, NY"
            },
            {
                name: "Mike Johnson",
                email: "mike.johnson@example.com",
                age: 25,
                skills: "Data Science, Python, SQL",
                description: "Data analyst with expertise in machine learning",
                location: "Austin, TX"
            }
        ],
        
        // Local storage key
        STORAGE_KEY: 'people_manager_data'
    },
    

    PRODUCTION: {

        ENDPOINTS: {
            PEOPLE: '/people',
            SEARCH: '/search',
            HEALTH: '/health'
        },
        

        REQUEST_TIMEOUT: 10000,
        

        MAX_RETRIES: 3
    }
};


if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    
    window.CONFIG = CONFIG;
}

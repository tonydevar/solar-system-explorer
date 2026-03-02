// Solar System Explorer - Main Application Logic
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const planetCarousel = document.getElementById('planetCarousel');
    const planetInfoPanel = document.getElementById('planetInfoPanel');
    const closeBtn = document.getElementById('closeInfo');
    const planetImage = document.getElementById('planetImage');
    const planetName = document.getElementById('planetName');
    const planetMass = document.getElementById('planetMass');
    const planetGravity = document.getElementById('planetGravity');
    const planetDayLength = document.getElementById('planetDayLength');
    const planetDescription = document.getElementById('planetDescription');
    
    // Planet data with accent colors
    const planets = [
        {
            name: "Mercury",
            color: "#A9A9A9",
            mass: "0.055 Earth masses",
            gravity: "0.377 g",
            dayLength: "1407.5 hours",
            description: "Mercury is the smallest and innermost planet in the Solar System. It has no natural satellites and is named after the swift-footed Roman messenger god."
        },
        {
            name: "Venus",
            color: "#FFC649",
            mass: "0.815 Earth masses",
            gravity: "0.887 g",
            dayLength: "2802 hours",
            description: "Venus is the second planet from the Sun. It is similar in size and mass to Earth and is often called Earth's 'sister planet'."
        },
        {
            name: "Earth",
            color: "#6B93D6",
            mass: "1 Earth mass",
            gravity: "1 g",
            dayLength: "24 hours",
            description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29% of Earth's surface is land consisting of continents and islands."
        },
        {
            name: "Mars",
            color: "#CD5C5C",
            mass: "0.107 Earth masses",
            gravity: "0.377 g",
            dayLength: "24.6 hours",
            description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It is often called the 'Red Planet' due to its reddish appearance."
        },
        {
            name: "Jupiter",
            color: "#D8CA9D",
            mass: "317.8 Earth masses",
            gravity: "2.36 g",
            dayLength: "9.9 hours",
            description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined."
        },
        {
            name: "Saturn",
            color: "#FAD5A5",
            mass: "95.2 Earth masses",
            gravity: "1.06 g",
            dayLength: "10.7 hours",
            description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth."
        },
        {
            name: "Uranus",
            color: "#4FD0E7",
            mass: "14.5 Earth masses",
            gravity: "0.887 g",
            dayLength: "17.2 hours",
            description: "Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System."
        },
        {
            name: "Neptune",
            color: "#4B70DD",
            mass: "17.1 Earth masses",
            gravity: "1.14 g",
            dayLength: "16.1 hours",
            description: "Neptune is the eighth and farthest-known Solar planet from the Sun. It is the fourth-largest planet by diameter and the third-most-massive planet in the Solar System."
        }
    ];
    
    // Create planet cards
    function createPlanetCards() {
        planetCarousel.innerHTML = '';
        
        planets.forEach(planet => {
            const planetCard = document.createElement('div');
            planetCard.className = 'planet-card';
            planetCard.innerHTML = `
                <div class="planet-image" style="background: ${planet.color}">
                    <span>🌍</span>
                </div>
                <h3>${planet.name}</h3>
            `;
            
            planetCard.addEventListener('click', () => showPlanetInfo(planet));
            planetCarousel.appendChild(planetCard);
        });
    }
    
    // Show planet information panel
    function showPlanetInfo(planet) {
        // Update panel content
        planetImage.innerHTML = `<span style="color: ${planet.color}">${planet.name === 'Saturn' ? '💍' : '🌍'}</span>`;
        planetImage.style.background = planet.color;
        planetName.textContent = planet.name;
        planetMass.textContent = planet.mass;
        planetGravity.textContent = planet.gravity;
        planetDayLength.textContent = planet.dayLength;
        planetDescription.textContent = planet.description;
        
        // Show panel
        planetInfoPanel.classList.add('active');
        
        // Add scroll to top
        planetInfoPanel.scrollTop = 0;
    }
    
    // Close planet information panel
    function closePlanetInfo() {
        planetInfoPanel.classList.remove('active');
    }
    
    // Close panel when clicking close button
    closeBtn.addEventListener('click', closePlanetInfo);
    
    // Close panel when clicking outside the panel
    planetInfoPanel.addEventListener('click', (e) => {
        if (e.target === planetInfoPanel) {
            closePlanetInfo();
        }
    });
    
    // Initialize stardust particles
    function createStardust() {
        const stardust = document.querySelector('.stardust');
        stardust.innerHTML = '';
        
        for (let i = 0; i < 150; i++) {
            const particle = document.createElement('div');
            particle.className = 'stardust-particle';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 3 + 1;
            
            // Random animation duration
            const duration = Math.random() * 5 + 3;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.setProperty('--duration', `${duration}s`);
            
            stardust.appendChild(particle);
        }
    }
    
    // Handle API data fetch
    async function fetchPlanetData() {
        try {
            // Using our local data as fallback for demo purposes
            // In a real implementation, this would fetch from the API:
            /*
            const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
            const data = await response.json();
            
            // Process and display the data from the API
            */
            
            // For now, we're using the predefined planet data since we have solid static data
            console.log('Using predefined planet data');
        } catch (error) {
            console.error('Error fetching planet data:', error);
            // Fallback to static data if API fails
            createPlanetCards();
        }
    }
    
    // Initialize the application
    function init() {
        createPlanetCards();
        createStardust();
        fetchPlanetData();
        
        // Prevent accidental drag of images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
    }
    
    // Initialize the application
    init();
});

// Add keyboard support for closing the panel
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const planetInfoPanel = document.getElementById('planetInfoPanel');
        if (planetInfoPanel.classList.contains('active')) {
            planetInfoPanel.classList.remove('active');
        }
    }
});
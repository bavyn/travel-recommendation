document.addEventListener('DOMContentLoaded', () => {
    // Get search input and button elements
    const searchInput = document.getElementById('search-box');
    const searchButton = document.getElementById('search-button');

    // Function to fetch JSON data
    const fetchData = async () => {
        try {
            const response = await fetch('travel_recommendation_api.json'); // Load the JSON file
            const data = await response.json();
            return data; // Return the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    // Function to handle search
    async function handleSearch() {
        const searchInput = document.getElementById("search-box").value.toLowerCase().trim();
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = ""; // Clear previous results
    
        if (!searchInput) {
            resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
            return;
        }
    
        try {
            const response = await fetch("travel_recommendation_api.json");
            const data = await response.json();
    
            let results = [];
    
            if (searchInput.includes("beach") || searchInput.includes("beaches")) {
                console.log("User searched for a Beach.");
                results = data.beaches;
            } else if (searchInput.includes("temple") || searchInput.includes("temples")) {
                console.log("User searched for a Temple.");
                results = data.temples;
            } else {
                // Search for a country name
                for (const country of data.countries) {
                    if (country.name.toLowerCase().includes(searchInput)) {
                        console.log(`User searched for ${country.name}.`);
    
                        // Display the country name
                        resultsContainer.innerHTML += `<h2>${country.name}</h2>`;
    
                        // Show only the first 2 cities under that country
                        country.cities.slice(0, 2).forEach(city => {
                            results.push({
                                name: city.name,
                                imageUrl: city.imageUrl,
                                description: city.description
                            });
                        });
                    }
                }
            }
    
            if (results.length === 0) {
                resultsContainer.innerHTML = "<p>No results found.</p>";
                return;
            }
    
            for (const item of results) {
                const resultElement = document.createElement("div");
                resultElement.innerHTML = `
                    <h3>${item.name}</h3>
                    <img src="photos/${item.imageUrl}" alt="${item.name}" width="200">
                    <p>${item.description}</p>
                `;
                resultsContainer.appendChild(resultElement);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            resultsContainer.innerHTML = "<p>Error loading results. Please try again later.</p>";
        }
    }    

    // Function to display results
    const displayResults = (results) => {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            resultsContainer.innerHTML = "<p>No results found.</p>";
            return;
        }

        results.forEach(item => {
            const resultElement = document.createElement('div');
            resultElement.innerHTML = `
                <h3>${item.name}</h3>
                <img src="photos/${item.imageUrl}" alt="${item.name}" width="200">
                <p>${item.description}</p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    };

    // Event listener for Search button
    searchButton.addEventListener('click', handleSearch);
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-box');
    const searchButton = document.getElementById('search-button');
    const resetButton = document.getElementById('reset-button');

    const fetchData = async () => {
        try {
            const response = await fetch('travel_recommendation_api.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    async function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = "";
    
        if (!searchTerm) {
            resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
            return;
        }
    
        try {
            const response = await fetch("travel_recommendation_api.json");
            const data = await response.json();
    
            let results = [];
    
            if (searchTerm.includes("beach") || searchTerm.includes("beaches")) {
                results = data.beaches;
            } else if (searchTerm.includes("temple") || searchTerm.includes("temples")) {
                results = data.temples;
            } else {
                for (const country of data.countries) {
                    if (country.name.toLowerCase().includes(searchTerm)) {
        
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
                resultElement.classList.add("city-result");
                resultElement.innerHTML = `
                    <h2>${item.name}</h2>
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

    function clearResults() {
        searchInput.value = "";
        document.getElementById("results").innerHTML = "";
    }

    searchButton.addEventListener('click', handleSearch);
    resetButton.addEventListener('click', clearResults);
});

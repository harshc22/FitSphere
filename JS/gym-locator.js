document.addEventListener("DOMContentLoaded", async () => {
    const defaultLocation = "New York, NY"; // Set a default location

    try {
        // Fetch the API key from config.json
        const response = await fetch("./config.json");
        const config = await response.json();
        const apiKey = config.apiKey;

        // Set the initial map view to the default location
        const mapFrame = document.getElementById("map");
        mapFrame.src = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=gyms+near+${encodeURIComponent(defaultLocation)}`;
    } catch (error) {
        console.error("Error loading API key:", error);
    }
});

document.getElementById("submit").addEventListener("click", async () => {
    const location = document.getElementById("location").value;

    if (location) {
        try {
            // Fetch the API key from config.json
            const response = await fetch("./config.json");
            const config = await response.json();
            const apiKey = config.apiKey;

            // Update the map view to the entered location
            const mapFrame = document.getElementById("map");
            mapFrame.src = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=gyms+near+${encodeURIComponent(location)}`;
        } catch (error) {
            console.error("Error loading API key:", error);
        }
    } else {
        alert("Please enter a location.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.getElementById("video-container");
    const muscleGroupSelect = document.getElementById("muscle-group");

    // Fetch video data from the JSON file
    async function loadVideoData() {
        try {
            const response = await fetch("./data/videos.json"); // Adjust path as needed
            return await response.json();
        } catch (error) {
            console.error("Failed to load video data:", error);
            return {};
        }
    }

    // Function to generate HTML template for each video
    function createVideoHTML(video) {
        return `
            <div>
                <h3>${video.title}</h3>
                <iframe width="560" height="315" src="${video.url}" 
                        title="${video.title}" frameborder="0" allow="accelerometer; autoplay; 
                        clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                </iframe>
            </div>
        `;
    }

    // Function to display videos based on selected muscle group
    async function displayVideos(muscleGroup) {
        videoContainer.innerHTML = ""; // Clear existing videos
        const videos = await loadVideoData(); // Load data from JSON

        if (videos[muscleGroup]) {
            videos[muscleGroup].forEach(video => {
                videoContainer.innerHTML += createVideoHTML(video);
            });
        } else {
            videoContainer.innerHTML = "<p>No videos available for the selected muscle group.</p>";
        }
    }

    // Event listener for muscle group selection
    muscleGroupSelect.addEventListener("change", (event) => {
        const selectedMuscleGroup = event.target.value;
        displayVideos(selectedMuscleGroup);
    });
});

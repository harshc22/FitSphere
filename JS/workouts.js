document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.getElementById("video-container");
    const muscleGroupSelect = document.getElementById("muscle-group");
    const randomVideoButton = document.getElementById("random-video-button");
    const exercisesContainer = document.getElementById("exercises-container");
    const EXERCISE_DB_API_URL = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/";
    const EXERCISE_DB_API_HEADERS = {
        "X-RapidAPI-Key": "e48dba8bb8msh4dd3cef1e65c8abp113dd6jsn3766b212f2e1", // Replace with your API Key
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
    };

    // Mapping of muscle group names from UI to API
    const muscleGroupMapping = {
        chest: "chest",
        back: "back",
        shoulders: "shoulders",
        legs: "upper legs", 
        biceps: "upper arms", 
        triceps: "upper arms",
        core: "waist" 
    };

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

    // Function to initialize Slick Carousel
    function initializeSlick() {
        videoContainer.classList.remove('slick-initialized', 'slick-slider', 'slick-list', 'slick-track');
        videoContainer.removeAttribute('style'); // Clear inline styles

        $(videoContainer).slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1000,
            fade: true,
            cssEase: 'ease-in-out',
            draggable: true,
            swipeToSlide: true,
            touchThreshold: 10,
        });
    }

    // Function to display videos based on selected muscle group
    async function displayVideos(muscleGroup) {
        videoContainer.innerHTML = ""; // Clear existing videos
        const videos = await loadVideoData();

        if (videos[muscleGroup]) {
            videos[muscleGroup].forEach(video => {
                videoContainer.innerHTML += createVideoHTML(video);
            });
            videoContainer.offsetHeight; // Force reflow
            initializeSlick();
        } else {
            videoContainer.innerHTML = "<p>No videos available for the selected muscle group.</p>";
        }
    }

    // Fetch exercise data from the ExerciseDB API
    async function fetchExerciseData(muscleGroup) {
        try {
            const apiMuscleGroup = muscleGroupMapping[muscleGroup] || muscleGroup; // Map name for API
            const response = await fetch(`${EXERCISE_DB_API_URL}${apiMuscleGroup}`, {
                method: "GET",
                headers: EXERCISE_DB_API_HEADERS
            });
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch exercises:", error);
            return [];
        }
    }


    // Function to display exercises based on the selected muscle group
    async function displayExercises(muscleGroup) {
        exercisesContainer.innerHTML = "<p>Loading exercises...</p>";
        const exercises = await fetchExerciseData(muscleGroup);

        // Check if the muscle group is upper arms to differentiate between biceps and triceps
        if (muscleGroup === "biceps" || muscleGroup === "triceps") {
            const filteredExercises = exercises.filter(exercise => {
                const target = exercise.target.toLowerCase();
                return (muscleGroup === "biceps" && target.includes("biceps")) ||
                    (muscleGroup === "triceps" && target.includes("tricep"));
            });

            if (filteredExercises.length > 0) {
                exercisesContainer.innerHTML = filteredExercises.slice(0, 10).map(exercise => `
                    <div class="exercise">
                        <h3>${exercise.name}</h3>
                        <p><strong>Target:</strong> ${exercise.target}</p>
                        <img src="${exercise.gifUrl}" alt="${exercise.name}" />
                    </div>
                `).join("");
            } else {
                exercisesContainer.innerHTML = `<p>No exercises found for the ${muscleGroup}.</p>`;
            }
        } else if (exercises.length > 0) {
            exercisesContainer.innerHTML = exercises.slice(0, 10).map(exercise => `
                <div class="exercise">
                    <h3>${exercise.name}</h3>
                    <p><strong>Target:</strong> ${exercise.target}</p>
                    <img src="${exercise.gifUrl}" alt="${exercise.name}" />
                </div>
            `).join("");
        } else {
            exercisesContainer.innerHTML = `<p>No exercises found for the ${muscleGroup}.</p>`;
        }
    }


    // Initialize Select2 on the muscle group select element
    $(muscleGroupSelect).select2();

    // Event listener for muscle group selection using Select2
    $(muscleGroupSelect).on("change", (event) => {
        const selectedMuscleGroup = event.target.value;
        displayVideos(selectedMuscleGroup); // Update videos
        displayExercises(selectedMuscleGroup); // Update exercises
    });

    // Event listener for random video button
    randomVideoButton.addEventListener("click", displayRandomVideo);
        // Function to display a random video
    async function displayRandomVideo() {
        videoContainer.innerHTML = ""; // Clear existing content
        exercisesContainer.innerHTML = "";
        const videos = await loadVideoData(); // Load data from JSON

        // Flatten all videos from different muscle groups into one array
        const allVideos = Object.values(videos).flat();

        if (allVideos.length > 0) {
            const randomIndex = Math.floor(Math.random() * allVideos.length);
            const randomVideo = allVideos[randomIndex];
            videoContainer.innerHTML = createVideoHTML(randomVideo);

            // Force reflow by reading the offsetHeight, ensuring a full re-render
            videoContainer.offsetHeight;
        }
    }
});

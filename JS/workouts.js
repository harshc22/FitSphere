document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.getElementById("video-container");
    const muscleGroupSelect = document.getElementById("muscle-group");
    const randomVideoButton = document.getElementById("random-video-button");

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
        // Manually remove any slick initialization classes or styles
        videoContainer.classList.remove('slick-initialized');
        videoContainer.classList.remove('slick-slider');
        videoContainer.classList.remove('slick-list');
        videoContainer.classList.remove('slick-track');
        
        // Clear inline styles applied by Slick (just in case)
        videoContainer.removeAttribute('style');

        // Reinitialize the Slick carousel
        $(videoContainer).slick({
            infinite: true,               // Infinite loop
            slidesToShow: 1,              // Show one slide at a time
            slidesToScroll: 1,            // Scroll one slide at a time
            arrows: true,
            dots: true,                   // Show navigation dots
            autoplay: true,               // Enable auto-play
            autoplaySpeed: 4000,          // Auto-play speed (4 seconds)
            speed: 1000,                  // Transition speed (1 second)
            fade: true,                   // Enable fade effect for smoother transitions
            cssEase: 'ease-in-out',       // Use ease-in-out easing for smoother transition
            draggable: true,              // Allow dragging for manual slide transition
            swipeToSlide: true,           // Allow swiping to move to next slide
            touchThreshold: 10,           // Make swipe more responsive
        });
    }

    // Function to display videos based on selected muscle group
    async function displayVideos(muscleGroup) {
        videoContainer.innerHTML = ""; // Clear existing videos
        const videos = await loadVideoData(); // Load data from JSON

        if (videos[muscleGroup]) {
            videos[muscleGroup].forEach(video => {
                videoContainer.innerHTML += createVideoHTML(video);
            });

            // Force reflow by reading the offsetHeight, ensuring a full re-render
            videoContainer.offsetHeight;

            // Reinitialize the Slick carousel after content is updated
            initializeSlick();
        } else {
            videoContainer.innerHTML = "<p>No videos available for the selected muscle group.</p>";
        }
    }

    // Function to display a random video
    async function displayRandomVideo() {
        videoContainer.innerHTML = ""; // Clear existing content
        const videos = await loadVideoData(); // Load data from JSON

        // Flatten all videos from different muscle groups into one array
        const allVideos = Object.values(videos).flat();

        if (allVideos.length > 0) {
            const randomIndex = Math.floor(Math.random() * allVideos.length);
            const randomVideo = allVideos[randomIndex];
            videoContainer.innerHTML = createVideoHTML(randomVideo);

            // Force reflow by reading the offsetHeight, ensuring a full re-render
            videoContainer.offsetHeight;

            // Reinitialize the Slick carousel after the content is updated
            initializeSlick();
        } else {
            videoContainer.innerHTML = "<p>No videos available at the moment.</p>";
        }
    }

    // Event listener for muscle group selection
    muscleGroupSelect.addEventListener("change", (event) => {
        const selectedMuscleGroup = event.target.value;
        displayVideos(selectedMuscleGroup);
    });

    // Event listener for random video button
    randomVideoButton.addEventListener("click", displayRandomVideo);
});

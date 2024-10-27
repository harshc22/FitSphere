document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.getElementById("video-container");
    const muscleGroupSelect = document.getElementById("muscle-group");

    const videos = {
        triceps: [
            {
                title: "The Best & Worst TRICEPS Exercises (Ranked Using Science)",
                url: "https://www.youtube.com/embed/OpRMRhr0Ycc?si=Nxyt442FdDlrXjpo"
            }
        ],
        "lower-back": [
            {
                title: "How To Get A Strong Lower Back The RIGHT Way (4 Must Do Exercises)",
                url: "https://www.youtube.com/embed/2tnATDflg4o?si=smAPC2_yTQb6Ait1"
            }
        ],
        "full-body": [
            {
                title: "20 MIN HIIT DUMBBELL WORKOUT | Full Body with Caroline Girvan",
                url: "https://www.youtube.com/embed/rRugP_hkkE0?si=3e-Gn_W8Zg86Pgfe"
            }
        ]
    };

    // Function to update video display based on muscle group
    function displayVideos(muscleGroup) {
        videoContainer.innerHTML = ""; // Clear existing videos

        if (videos[muscleGroup]) {
            videos[muscleGroup].forEach(video => {
                const videoDiv = document.createElement("div");
                videoDiv.innerHTML = `
                    <h3>${video.title}</h3>
                    <iframe width="560" height="315" src="${video.url}" 
                            title="${video.title}" frameborder="0" allow="accelerometer; autoplay; 
                            clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                    </iframe>
                `;
                videoContainer.appendChild(videoDiv);
            });
        }
    }

    // Event listener for muscle group selection
    muscleGroupSelect.addEventListener("change", (event) => {
        const selectedMuscleGroup = event.target.value;
        displayVideos(selectedMuscleGroup);
    });
});

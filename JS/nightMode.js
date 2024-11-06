const darkModeToggle = document.querySelector(".js-toggle-mode");

// Check local storage for theme preference and apply it
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark-mode") {
        document.documentElement.setAttribute("data-theme", "dark-mode");
        const icon = darkModeToggle.querySelector("i");
        icon.classList.add("darkmode-toggle");
        icon.classList.remove("fa-moon-o");
        icon.classList.add("fa-sun-o");
    }
});

if(darkModeToggle != null) {
    darkModeToggle.addEventListener("click", event => {
        const icon = event.currentTarget.querySelector("i");
        if (icon.classList.contains("darkmode-toggle")) {
            // Switch to light mode
            icon.classList.remove("darkmode-toggle");
            icon.classList.add("darkmode-toggle-normal");
            icon.classList.remove("fa-sun-o");
            icon.classList.add("fa-moon-o");
            document.documentElement.setAttribute("data-theme", "");
            localStorage.setItem("theme", "light-mode");
        } else {
            // Switch to dark mode
            icon.classList.remove("darkmode-toggle-normal");
            icon.classList.add("darkmode-toggle");
            icon.classList.remove("fa-moon-o");
            icon.classList.add("fa-sun-o");
            document.documentElement.setAttribute("data-theme", "dark-mode");
            localStorage.setItem("theme", "dark-mode");
        }
    });
}

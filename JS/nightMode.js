const darkModeToggle = document.querySelector(".js-toggle-mode");

if(darkModeToggle != null) {
    darkModeToggle.addEventListener("click", event => {
        const icon = event.currentTarget.querySelector("i");
        if (icon.classList.contains("darkmode-toggle")) {
            icon.classList.remove("darkmode-toggle");
            icon.classList.add("darkmode-toggle-normal");
            icon.classList.remove("fa-sun-o");
            icon.classList.add("fa-moon-o");
            document.documentElement.setAttribute("data-theme", "");
        } else {
            icon.classList.remove("darkmode-toggle-normal");
            icon.classList.add("darkmode-toggle");
            icon.classList.remove("fa-moon-o");
            icon.classList.add("fa-sun-o");
            document.documentElement.setAttribute("data-theme", "dark-mode");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.getElementById("mega-menu-full-dropdown-button");
    const dropdownMenu = document.getElementById("mega-menu-full-dropdown");

    dropdownButton.addEventListener("mouseenter", function () {
        dropdownMenu.classList.remove("hidden");
    });

    dropdownMenu.addEventListener("mouseleave", function () {
        dropdownMenu.classList.add("hidden");
    });
});
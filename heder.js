document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.getElementById("mega-menu-full-dropdown-button");
    const dropdownMenu = document.getElementById("mega-menu-full-dropdown");
    const menuToggle = document.querySelector('[data-collapse-toggle="mobile-menu-2"]');
    const menu = document.querySelector("#mega-menu-full");

    dropdownButton.addEventListener("mouseenter", function () {
        dropdownMenu.classList.remove("hidden");
    });

    dropdownMenu.addEventListener("mouseleave", function () {
        dropdownMenu.classList.add("hidden");
    });

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });
});
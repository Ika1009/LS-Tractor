document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.getElementById("mega-menu-full-dropdown-button");
    const dropdownMenu = document.getElementById("mega-menu-full-dropdown");
    const menuToggle = document.querySelector('[data-collapse-toggle="mobile-menu-2"]');
    const menu = document.querySelector("#mega-menu-full");

    dropdownButton.addEventListener("mouseenter", function () {
        if (window.innerWidth >= 1024) { 
            dropdownMenu.classList.remove("hidden");
        } else {
            window.location.href = "/masine.html"; 
        }
    });

    dropdownMenu.addEventListener("mouseleave", function () {
        if (window.innerWidth >= 1024) {
            dropdownMenu.classList.add("hidden");
        }
    });

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });
});
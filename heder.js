document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.getElementById("mega-menu-full-dropdown-button");
    const dropdownMenu = document.getElementById("mega-menu-full-dropdown");
    const menuToggle = document.querySelector('[data-collapse-toggle="mobile-menu-2"]');
    const menu = document.querySelector("#mega-menu-full");
    let timeout;

    dropdownButton.addEventListener("mouseenter", function () {
        if (window.innerWidth >= 1024) { 
            clearTimeout(timeout); 
            dropdownMenu.classList.remove("hidden");

            setTimeout(() => { 
                dropdownMenu.classList.remove("opacity-0", "translate-y-[-10px]");
                dropdownMenu.classList.add("opacity-100", "translate-y-0");
            }, 100); 
        }
    });

    dropdownMenu.addEventListener("mouseleave", function () {
        if (window.innerWidth >= 1024) {
            dropdownMenu.classList.remove("opacity-100", "translate-y-0");
            dropdownMenu.classList.add("opacity-0", "translate-y-[-10px]");

            timeout = setTimeout(() => {
                dropdownMenu.classList.add("hidden");
            }, 300);
        }
    });

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });
});
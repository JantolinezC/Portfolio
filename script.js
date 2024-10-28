// Update navbar color based on scroll position and mode
function updateNavbarColor() {
    const navbar = document.getElementById('mainNavbar');
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = Math.min(scrollTop / docHeight, 1);
    const isDarkMode = document.body.classList.contains('dark-mode');

    let red, green, blue;

    if (isDarkMode) {
        // Dark mode: Interpolate between #BE8A8A (pink) and #000000 (black)
        red = Math.round(190 + scrollFraction * (0 - 190));
        green = Math.round(138 + scrollFraction * (0 - 138));
        blue = Math.round(138 + scrollFraction * (0 - 138));
    } else {
        // Light mode: Interpolate between #FFB3C1 and #FF9AA2
        const startColor = { r: 255, g: 179, b: 193 }; // #FFB3C1
        const endColor = { r: 255, g: 154, b: 162 }; // #FF9AA2

        red = Math.round(startColor.r + scrollFraction * (endColor.r - startColor.r));
        green = Math.round(startColor.g + scrollFraction * (endColor.g - startColor.g));
        blue = Math.round(startColor.b + scrollFraction * (endColor.b - startColor.b));
    }

    const bgColor = `rgb(${red}, ${green}, ${blue})`;
    navbar.style.backgroundColor = bgColor;

    // Update coding section color
    const codingDiv = document.getElementById('coding');
    if (scrollFraction > 0.5) {
        codingDiv.style.color = isDarkMode ? 'white' : 'black';
    }

    // Add or remove 'scrolled' class based on scroll fraction
    if (scrollFraction > 0.5) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Listen to scroll event and update the navbar color
window.addEventListener('scroll', updateNavbarColor);


// Manage 'active' class for navbar links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(nav => nav.classList.remove('active')); // Remove 'active' from all
        this.classList.add('active'); // Add 'active' only to the clicked link
    });
});

// Coding div animation (blinking effect) - ensures white text in dark mode
const codingDiv = document.getElementById("coding");
let intervalId = setInterval(() => {
    codingDiv.style.opacity = codingDiv.style.opacity === "0" ? "1" : "0";
    if (document.body.classList.contains('dark-mode')) {
        codingDiv.style.color = "white"; // Ensure white text in dark mode
    } else {
        codingDiv.style.color = "#181717"; // Original color for light mode
    }
}, 500);

setTimeout(() => {
    clearInterval(intervalId);
    codingDiv.style.opacity = "1";
    codingDiv.innerText = "Andrea Antolínez";

    // Ensure the final text color based on mode
    if (document.body.classList.contains('dark-mode')) {
        codingDiv.style.color = "white";
    } else {
        codingDiv.style.color = "#181717";
    }
}, 5000);


// Toggle between light mode and dark mode
function toggleDarkMode() {
    const body = document.body;
    const imagen = document.getElementById("imagen-andrea");
    const darkModeIcon = document.getElementById("darkMode");

    // Toggle 'dark-mode' class on body
    body.classList.toggle("dark-mode");

    // Switch image between Fondo_Claro and Fondo_Oscuro
    if (imagen.src.includes("Fondo_Claro.jpeg")) {
        imagen.src = "/pic/Fondo_Oscuro.jpeg";
    } else {
        imagen.src = "/pic/Fondo_Claro.jpeg"
    }

    // Change icon between eyeglasses and sunglasses
    darkModeIcon.classList.toggle("bi-sunglasses", body.classList.contains("dark-mode"));
    darkModeIcon.classList.toggle("bi-eyeglasses", !body.classList.contains("dark-mode"));

    // Update the navbar color immediately when switching modes
    updateNavbarColor();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Adjust the offset to account for the navbar
        const navbarHeight = document.getElementById('mainNavbar').offsetHeight;

        window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: 'smooth' 
        });
    });
});

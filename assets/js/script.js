/* ==========================================================
   ESSENCE SYSTEMS
   Website V3
   Main JavaScript
   ========================================================== */

"use strict";

/* ==========================================================
   Page Loaded
   ========================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* ==========================================================
   Scroll Reveal
   ========================================================== */

const fadeElements = document.querySelectorAll(".fade-up");

if (fadeElements.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {

        threshold: 0.15

    });

    fadeElements.forEach(element => observer.observe(element));

}

/* ==========================================================
   Button Animation
   ========================================================== */

const buttons = document.querySelectorAll(".button, .explore-button");

buttons.forEach(button => {

    button.addEventListener("mousedown", () => {

        button.style.transform = "scale(.97)";

    });

    const resetButton = () => {

        button.style.transform = "";

    };

    button.addEventListener("mouseup", resetButton);

    button.addEventListener("mouseleave", resetButton);

});

/* ==========================================================
   Hero Parallax
   ========================================================== */

const hero = document.querySelector(".hero-content");

if (hero) {

    document.addEventListener("mousemove", (event) => {

        const x = (event.clientX / window.innerWidth - 0.5) * 8;

        const y = (event.clientY / window.innerHeight - 0.5) * 8;

        hero.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}

/* ==========================================================
   Keyboard Accessibility
   ========================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Enter") return;

    const focused = document.activeElement;

    if (

        focused &&
        (
            focused.classList.contains("button") ||
            focused.classList.contains("explore-button")
        )

    ) {

        focused.click();

    }

});

/* ==========================================================
   Future Expansion
   ========================================================== */

// Seasonal themes
// Dynamic backgrounds
// Scroll timelines
// Product showcases
// Interactive demos
// Download animations

/* ==========================================================
   Console Greeting
   ========================================================== */

console.log(`

🌲 ESSENCE SYSTEMS

Thoughtfully crafted technology.

Website Version 3

Allura is coming.

`);
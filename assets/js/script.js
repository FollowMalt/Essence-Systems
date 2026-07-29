/* ==========================================================
   ESSENCE SYSTEMS
   Package 1
   Main JavaScript
   ========================================================== */

"use strict";

/* ==========================================================
   Fade In Animation
   ========================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* ==========================================================
   Scroll Reveal
   ========================================================== */

const revealItems = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {

    threshold: 0.15

});

revealItems.forEach(item => {

    observer.observe(item);

});


/* ==========================================================
   Smooth Button Press
   ========================================================== */

const buttons = document.querySelectorAll(".explore-button");

buttons.forEach(button => {

    button.addEventListener("mousedown", () => {

        button.style.transform = "scale(.96)";

    });

    button.addEventListener("mouseup", () => {

        button.style.transform = "";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});


/* ==========================================================
   Gentle Mouse Parallax
   ========================================================== */

const hero = document.querySelector(".hero-content");

document.addEventListener("mousemove", (event) => {

    const x = (event.clientX / window.innerWidth - 0.5) * 10;

    const y = (event.clientY / window.innerHeight - 0.5) * 10;

    hero.style.transform = `translate(${x}px, ${y}px)`;

});


/* ==========================================================
   Keyboard Accessibility
   ========================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const focused = document.activeElement;

        if (focused.classList.contains("explore-button")) {

            focused.click();

        }

    }

});


/* ==========================================================
   Console Greeting
   ========================================================== */

console.log(

`🌲
ESSENCE SYSTEMS

Thoughtfully crafted technology.

Thank you for visiting.
`
);
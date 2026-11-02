/* ESSENCE — site interactions. No libraries. */
"use strict";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Navigation: glass background after scrolling, mobile menu */
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
if (nav) {
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
}

/* Reveal elements as they enter the viewport */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

/* Scroll-linked values, written as CSS variables:
   [data-parallax]  --scroll: 0 → 1 as the element scrolls out of view
   [data-grow]      --p:      0 → 1 as the element scrolls into view */
const parallax = [...document.querySelectorAll("[data-parallax]")];
const growers = [...document.querySelectorAll("[data-grow]")];
if (!reduceMotion && (parallax.length || growers.length)) {
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    parallax.forEach((el) => {
      const r = el.getBoundingClientRect();
      const v = Math.min(Math.max(-r.top / r.height, 0), 1);
      el.style.setProperty("--scroll", v.toFixed(3));
    });
    growers.forEach((el) => {
      const r = el.getBoundingClientRect();
      const v = Math.min(Math.max((vh - r.top) / (vh * 0.8), 0), 1);
      el.style.setProperty("--p", v.toFixed(3));
    });
    ticking = false;
  };
  update();
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
}

/* Scroll stories: each text step activates the matching frame in the sticky visual */
document.querySelectorAll("[data-story]").forEach((story) => {
  const steps = [...story.querySelectorAll(".story-step")];
  const frames = [...story.querySelectorAll(".story-frame")];
  const dots = [...story.querySelectorAll(".story-progress i")];
  const activate = (i) => {
    steps.forEach((s, n) => s.classList.toggle("is-active", n === i));
    frames.forEach((f, n) => f.classList.toggle("is-active", n === i));
    dots.forEach((d, n) => d.classList.toggle("is-active", n === i));
    if (story.dataset.tint) story.style.setProperty("--tint", steps[i].dataset.tint || "");
  };
  activate(0);
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activate(steps.indexOf(entry.target));
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  steps.forEach((s) => io.observe(s));
});

/* Updates page: filter by project */
const filters = document.querySelectorAll("[data-filter]");
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.filter;
    filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    document.querySelectorAll(".timeline .update").forEach((u) => {
      u.classList.toggle("is-hidden", value !== "all" && u.dataset.project !== value);
    });
  });
});

/* Astra UI rebuild: scale the 1280×800 canvas to whatever frame it sits in */
const astraUIs = document.querySelectorAll("[data-astra-ui]");
if (astraUIs.length && "ResizeObserver" in window) {
  const ro = new ResizeObserver((entries) => {
    entries.forEach((e) => e.target.style.setProperty("--ax-s", (e.contentRect.width / 1280).toFixed(4)));
  });
  astraUIs.forEach((el) => ro.observe(el));
}

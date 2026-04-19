// Import Framer Motion equivalent (Motion API) from ES Module CDN
import { animate, scroll, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";

// 1. Continuous "Alive" Background Blob Animation
animate("#blob-1", 
  { x: [0, 80, -30, 0], y: [0, 40, 80, 0], scale: [1, 1.05, 0.95, 1] }, 
  { duration: 25, repeat: Infinity, ease: "easeInOut" }
);
animate("#blob-2", 
  { x: [0, -60, 40, 0], y: [0, -80, -40, 0], scale: [1, 1.1, 0.9, 1] }, 
  { duration: 30, repeat: Infinity, ease: "easeInOut" }
);
animate("#blob-3", 
  { x: [0, 50, -50, 0], y: [0, -50, 50, 0], scale: [1, 0.9, 1.1, 1] }, 
  { duration: 22, repeat: Infinity, ease: "easeInOut" }
);

// 2. Scroll Progress Bar
scroll(
  animate("#scroll-bar", { scaleX: [0, 1] })
);

// 3. Hero Section Entrance Animation
animate("#hero-badge", { y: [20, 0], opacity: [0, 1] }, { duration: 0.8, delay: 0.1, ease: "easeOut" });
animate("#hero-title", { y: [30, 0], opacity: [0, 1] }, { duration: 0.8, delay: 0.2, ease: "easeOut" });
animate("#hero-desc", { y: [20, 0], opacity: [0, 1] }, { duration: 0.8, delay: 0.3, ease: "easeOut" });
animate(
  ".stat-box",
  { y: [20, 0], opacity: [0, 1], scale: [0.95, 1] },
  { delay: stagger(0.1, { startDelay: 0.4 }), duration: 0.6, ease: "easeOut" }
);
animate("#hero-btn", { y: [20, 0], opacity: [0, 1] }, { duration: 0.8, delay: 0.6, ease: "easeOut" });

// 4. Reveal Sections on Scroll
inView(".reveal-anim", (info) => {
  animate(info.target, 
    { y: [50, 0], opacity: [0, 1] }, 
    { duration: 0.8, ease: "easeOut" }
  );
}, { margin: "-50px" });

// 5. Stagger grid items when they come into view (Slide Deck & Models)
const grids = [".slides-grid", ".model-grid", ".grid-2-col"];
grids.forEach(selector => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(grid => {
    inView(grid, () => {
      animate(
        grid.children, 
        { y: [30, 0], opacity: [0, 1], scale: [0.95, 1] }, 
        { delay: stagger(0.1), duration: 0.6, ease: "easeOut" }
      );
    }, { margin: "-20px" });
  });
});

// Stagger Pain Point flows
const painPoints = document.querySelectorAll('.pain-point-flow');
painPoints.forEach(flow => {
    inView(flow, () => {
        animate(
            flow.children,
            {x: [-30, 0], opacity:[0, 1]},
            { delay: stagger(0.2), duration: 0.5, ease: "easeOut"}
        )
    }, { margin: "-50px"})
});

// 6. Navbar Scroll Effect & Active Links
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 7. Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const line1 = document.querySelector('.line-1');
const line2 = document.querySelector('.line-2');
let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        navLinksContainer.classList.add('mobile-active');
        animate(".nav-links a", { y: [20, 0], opacity: [0, 1] }, { delay: stagger(0.05), duration: 0.4 });
        animate(line1, { rotate: 45, y: 4 }, { duration: 0.3 });
        animate(line2, { rotate: -45, y: -4 }, { duration: 0.3 });
    } else { closeMenu(); }
});

function closeMenu() {
    isMenuOpen = false;
    navLinksContainer.classList.remove('mobile-active');
    animate(line1, { rotate: 0, y: 0 }, { duration: 0.3 });
    animate(line2, { rotate: 0, y: 0 }, { duration: 0.3 });
}

navLinks.forEach(link => link.addEventListener('click', () => { if (isMenuOpen) closeMenu(); }));

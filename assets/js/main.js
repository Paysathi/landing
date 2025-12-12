/* ==================== MENU SHOW Y HIDDEN ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* ===== MENU SHOW ===== */
/* Validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* ===== MENU HIDDEN ===== */
/* Validate if constant exists */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* ==================== REMOVE MENU MOBILE ==================== */
const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav-link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
// (Optional: Highlight active link on scroll - keeping it simple for now)

/* ==================== CHANGE BACKGROUND HEADER ==================== */
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* ==================== SCROLL REVEAL ANIMATION ==================== */
const sr = {
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
};

// Simple Intersection Observer Implementation for Reveal
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active-scroll');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Select elements to animate
// We will add a utility class 'reveal-item' in CSS to handle the actual animation
// based on the 'active-scroll' class added by JS.
// However, since we didn't add 'reveal-item' to HTML yet, let's target specific sections.

const revealElements = document.querySelectorAll('.hero-content, .hero-img-wrapper, .feature-card, .about-img-wrapper, .about-content, .contact-card, .contact-form, .section-header');

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// Add modification to the observer callback to actually trigger the styles
const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Re-observe with the correct logic
revealElements.forEach(el => activeObserver.observe(el));

/* ==================== DARK MODE TOGGLE ==================== */
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Toggle theme function
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Add event listener to theme toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

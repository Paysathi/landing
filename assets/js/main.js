/* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
// (Optional: Highlight active link on scroll - keeping it simple for now)

/* ==================== CHANGE BACKGROUND HEADER ==================== */
function scrollHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
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
        if (entry.isIntersecting) {
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
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Re-observe with the correct logic
revealElements.forEach(el => activeObserver.observe(el));

/* ==================== PROBLEMS SECTION ANIMATION ==================== */
document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.18 });
    revealEls.forEach(el => io.observe(el));

    // Gentle 3D tilt on hover (desktop only)
    const cards = document.querySelectorAll('.problem-card');
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (isFinePointer) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (ev) => {
                const r = card.getBoundingClientRect();
                const x = ev.clientX - r.left;
                const y = ev.clientY - r.top;
                const rx = ((y / r.height) - 0.5) * -6; // rotateX
                const ry = ((x / r.width) - 0.5) * 6;  // rotateY
                card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // Click selection logic
    const selectCards = document.querySelectorAll('.problem-card.is-selectable');

    selectCards.forEach(card => {
        card.addEventListener('click', () => {
            selectCards.forEach(c => c.classList.remove('is-active'));
            card.classList.add('is-active');
        });
    });

    // Default select first card
    if (selectCards.length) selectCards[0].classList.add('is-active');
});

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



/* ==================== HOW TAKKADA WORKS INTERACTIVITY ==================== */
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.how-step');
    const imageElement = document.getElementById('how-image');
    const card = document.getElementById('how-card');

    if (!steps.length || !imageElement) return;

    const images = {
        1: 'assets/images/screenshots/how.png',
        2: 'assets/images/screenshots/how-2.avif',
        3: 'assets/images/screenshots/how-3.avif'
    };

    const backgrounds = {
        1: '#f4f6ff',
        2: '#fff6f0',
        3: '#f2fff7'
    };

    function setStep(stepNumber) {
        // Update active class on steps
        steps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === stepNumber));

        // Update card background color if element exists
        if (card) {
            card.style.backgroundColor = backgrounds[stepNumber] || '#f4f6ff';
        }

        const newSrc = images[stepNumber];
        if (!newSrc) return;

        // Fade out
        imageElement.classList.add('fade-out');

        // Wait for fade out transition (300ms matches CSS)
        setTimeout(() => {
            imageElement.src = newSrc;

            // Handle image load to fade in
            imageElement.onload = () => {
                imageElement.classList.remove('fade-out');
            };

            // Fallback in case onload doesn't fire (cached images)
            setTimeout(() => {
                imageElement.classList.remove('fade-out');
            }, 50);
        }, 300);
    }

    steps.forEach(step => {
        step.addEventListener('click', () => {
            const stepNum = Number(step.dataset.step);
            if (stepNum) setStep(stepNum);
        });
    });
});

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
        1: '../images/screenshots/how.png',
        2: '../images/screenshots/how-2.avif',
        3: '../images/screenshots/how-3.avif'
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
        step.addEventListener('mouseenter', () => {
            const stepNum = Number(step.dataset.step);
            // Prevent re-triggering if already active
            if (step.classList.contains('active')) return;

            if (stepNum) setStep(stepNum);
        });
    });
});

/* ==================== TESTIMONIALS INTERACTIVITY ==================== */
(function () {
    const section = document.querySelector('[data-animate="testimonials"]');
    if (!section) return;

    const grid = section.querySelector('#testimonialGrid');
    const cards = section.querySelectorAll('.testimonial-card');
    const dotsWrap = section.querySelector('.dots');
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.dot')) : [];

    // 1) Stagger reveal
    cards.forEach((c, i) => c.style.setProperty('--stagger', `${i * 130}ms`));

    // 2) Scroll reveal
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                section.classList.add('is-inview');
                io.unobserve(section);
            }
        });
    }, { threshold: 0.18 });
    io.observe(section);

    // 3) Premium tilt + glow tracking (only when pointer is fine)
    const finePointer = window.matchMedia('(pointer:fine)').matches;

    if (finePointer) {
        cards.forEach((card) => {
            const maxTilt = 7;

            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;

                // Glow position
                card.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
                card.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);

                // Tilt
                const rotY = ((px - 0.5) * (maxTilt * 2)).toFixed(2);
                const rotX = ((0.5 - py) * (maxTilt * 2)).toFixed(2);

                // Keep your hover lift + add tilt
                card.style.transform = `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.removeProperty('--mx');
                card.style.removeProperty('--my');
            });
        });
    }

    // 4) Mobile dots progress based on scroll
    if (grid && dots.length) {
        const updateDots = () => {
            const cardWidth = grid.scrollWidth / cards.length;
            const idx = Math.round(grid.scrollLeft / cardWidth);
            dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
        };

        grid.addEventListener('scroll', () => {
            window.requestAnimationFrame(updateDots);
        }, { passive: true });

        updateDots();
    }
})();

/* =========================================================
   BLOG — BEST VERSION (featured hero + cards + filters)
========================================================= */
(function () {
    const section = document.querySelector('[data-animate="blog"]');
    if (!section) return;

    const featuredEl = section.querySelector('#featured-blog-container');
    const gridEl = section.querySelector('#blog-grid-container');
    const searchEl = section.querySelector('#blogSearch');
    const chips = Array.from(section.querySelectorAll('.chip'));

    // Real Blog Data with Correct Images
    const BLOGS = [
        {
            title: "Auto-Reconciliation: Invoice Matching Without Manual Work",
            excerpt: "Learn how automatic invoice matching reduces manual work, prevents missed payments, and gives you a single source of truth.",
            date: "Dec 2025",
            tag: "reconciliation",
            image: "../images/screenshots/Blog-3.png",
            url: "blog/auto-reconciliation-without-manual-work.html",
            featured: true,
            badges: ["Reconciliation", "Tally"]
        },
        {
            title: "Automate Payment Follow-ups with WhatsApp Reminders",
            excerpt: "Stop chasing. Set reminder sequences that increase on-time collections without annoying customers.",
            date: "Dec 2025",
            tag: "collections",
            image: "../images/screenshots/blog-6.jpg",
            url: "blog/automate-payment-follow-ups-whatsapp-reminders.html",
            featured: false,
            badges: ["Collections"]
        },
        {
            title: "Getting Started with Takkada: Automation Without Data Entry",
            excerpt: "No more manual entry. Sync your Tally data and start automating your collections in minutes.",
            date: "Dec 2025",
            tag: "tally",
            image: "../images/screenshots/tk-l-2.png",
            url: "blog/getting-started-with-takkada-automation-without-data-entry.html",
            featured: false,
            badges: ["Tally"]
        },
        {
            title: "The Hidden Cost of Manual Tally Work",
            excerpt: "Manual work costs more than you think. Discover how automation can save you time and money.",
            date: "Dec 2025",
            tag: "tally",
            image: "../images/screenshots/blog-2.png",
            url: "blog/hidden-cost-of-manual-tally-work.html",
            featured: false,
            badges: ["Tally"]
        },
        {
            title: "Tally on Mobile: Manage Invoices, Dues & Collections",
            excerpt: "Access your Tally data on the go. Manage invoices, track dues, and collect payments from anywhere.",
            date: "Dec 2025",
            tag: "tally",
            image: "../images/screenshots/blog-5.png",
            url: "blog/tally-on-mobile-manage-invoices-dues-collections.html",
            featured: false,
            badges: ["Tally"]
        },
        {
            title: "Why Reconciliation Takes Forever in Tally",
            excerpt: "Identify the bottlenecks in your reconciliation process and learn how to fix them with automation.",
            date: "Dec 2025",
            tag: "reconciliation",
            image: "../images/screenshots/blog-4.png",
            url: "blog/why-reconciliation-takes-forever-in-tally.html",
            featured: false,
            badges: ["Reconciliation"]
        }
    ];

    // --- Helpers (escape for safety) ---
    const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
    }[m]));

    function featuredTemplate(b) {
        const badges = (b.badges || []).map((x) => {
            const cls = x.toLowerCase().includes("recon") ? "purple" :
                x.toLowerCase().includes("gst") ? "orange" :
                    x.toLowerCase().includes("collect") ? "green" : "";
            return `<span class="badge ${cls}">${esc(x)}</span>`;
        }).join("");

        const media = b.image
            ? `<img src="${esc(b.image)}" alt="${esc(b.title)}">`
            : ``;

        // Clickable card wrapper with onclick
        return `
        <article class="featured-card" onclick="window.location.href='${esc(b.url)}'" style="cursor: pointer;">
          <div class="featured-media">
            ${media}
          </div>
          <div class="featured-content">
            <div class="badges">${badges}</div>
            <h3>${esc(b.title)}</h3>
            <p>${esc(b.excerpt)}</p>
            <div class="meta-row">
              <div class="meta">
                <span><i class="ph-fill ph-calendar"></i> ${esc(b.date)}</span>
                <span><i class="ph-fill ph-clock"></i> 5 min read</span>
              </div>
              <span class="read-cta">
                Read article <i class="ph-fill ph-arrow-right"></i>
              </span>
            </div>
          </div>
        </article>
      `;
    }

    function cardTemplate(b) {
        const media = b.image
            ? `<img src="${esc(b.image)}" alt="${esc(b.title)}">`
            : ``;

        const label = b.tag === "reconciliation" ? "Reconciliation" :
            b.tag === "collections" ? "Collections" :
                b.tag === "gst" ? "GST" :
                    b.tag === "tally" ? "Tally" : "Article";

        const pillCls = b.tag === "reconciliation" ? "purple" :
            b.tag === "collections" ? "green" :
                b.tag === "gst" ? "orange" : "";

        // Clickable card wrapper with onclick
        return `
        <article class="blog-card" data-tag="${esc(b.tag)}" onclick="window.location.href='${esc(b.url)}'" style="cursor: pointer;">
          <div class="media">${media}</div>
          <div class="body">
            <div class="badges" style="margin-bottom:10px;">
              <span class="badge ${pillCls}">${esc(label)}</span>
            </div>
            <h3 class="title">${esc(b.title)}</h3>
            <p class="excerpt">${esc(b.excerpt)}</p>
            <div class="bottom">
              <div class="date"><i class="ph-fill ph-calendar"></i> ${esc(b.date)}</div>
              <span class="more">Read <i class="ph-fill ph-arrow-right"></i></span>
            </div>
          </div>
        </article>
      `;
    }

    // Dynamic Filter Logic: Hide chips if no blogs have that tag
    const tagCounts = BLOGS.reduce((acc, b) => {
        acc[b.tag] = (acc[b.tag] || 0) + 1;
        return acc;
    }, {});

    chips.forEach((btn) => {
        const tag = btn.dataset.filter;
        if (tag !== 'all' && !tagCounts[tag]) {
            btn.style.display = 'none';
        }
    });

    // Render
    function render(filter = "all", q = "") {
        const query = q.trim().toLowerCase();
        const list = BLOGS.filter(b => {
            const matchesTag = (filter === "all") || (b.tag === filter);
            const matchesQuery = !query || (b.title.toLowerCase().includes(query) || b.excerpt.toLowerCase().includes(query));
            return matchesTag && matchesQuery;
        });

        // Featured: first featured in current selection, else first item
        const featured = list.find(b => b.featured) || list[0];
        featuredEl.innerHTML = featured ? featuredTemplate(featured) : "";

        // Grid: all except featured
        const gridItems = list.filter(b => b !== featured);
        gridEl.innerHTML = gridItems.length
            ? gridItems.map(cardTemplate).join("")
            : `<div class="card-skeleton" style="grid-column:1/-1; text-align:center; padding:26px;">
             No articles found. Try a different search.
           </div>`;

        // Stagger animation vars
        Array.from(gridEl.children).forEach((el, idx) => el.style.setProperty('--stagger', `${idx * 110}ms`));
    }

    // Initial render
    setTimeout(() => render("all", ""), 100);

    // Filter chips
    chips.forEach((btn) => {
        btn.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('is-active'));
            btn.classList.add('is-active');
            render(btn.dataset.filter || "all", searchEl ? searchEl.value : "");
        });
    });

    // Search
    if (searchEl) {
        let t = null;
        searchEl.addEventListener('input', () => {
            clearTimeout(t);
            t = setTimeout(() => {
                const active = section.querySelector('.chip.is-active');
                render(active ? active.dataset.filter : "all", searchEl.value);
            }, 120);
        });
    }

    // Scroll reveal
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                section.classList.add('is-inview');
                io.unobserve(section);
            }
        });
    }, { threshold: 0.16 });
    io.observe(section);
})();

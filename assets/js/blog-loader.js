/**
 * Renders a single blog card HTML string
 * @param {Object} post The blog post object
 * @param {Boolean} isBlogPage If true, adjusts paths for being inside the blog/ directory (e.g. ../assets)
 * @returns {String} HTML string
 */
function renderBlogCard(post, isBlogPage) {
    // Adjust paths based on whether we are on index (assets/...) or blog page (../assets/...)
    // The slug is just the filename. 
    // If on index, link is blog/slug. If on blog page, link is slug (sibling).

    // BUT, the data has images as 'assets/...'. 
    // On index: image src needs to be 'assets/...' (matches data). Link needs to be 'blog/slug'.
    // On blog page: image src needs to be '../assets/...' (prepend ../). Link needs to be 'slug'.

    const imagePath = isBlogPage ? '../' + post.image : post.image;
    const linkPath = isBlogPage ? post.slug : 'blog/' + post.slug;

    return `
    <a href="${linkPath}" class="blog-card" style="text-decoration: none; color: inherit; display: block;">
        <div class="blog-card-image">
            <img src="${imagePath}" alt="${post.title}" />
        </div>
        <div class="blog-card-content">
            <span class="blog-tag">${post.tag}</span>
            <h4>${post.title}</h4>
            ${!isBlogPage ? `<p>${post.description}</p>` : ''} 
            <div class="blog-meta">
                <span>${post.readTime}</span>
            </div>
        </div>
    </a>
    `;
}

/**
 * Renders the featured blog card (usually the first one, or specific ID)
 * @param {String} containerId 
 * @param {Boolean} isBlogPage 
 */
function renderFeaturedBlog(containerId, isBlogPage = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Let's grab the first one as featured, or a specific one 'getting-started'
    const featuredPost = blogPosts.find(p => p.id === 'getting-started') || blogPosts[0];

    // Logic for paths same as above
    const imagePath = isBlogPage ? '../' + featuredPost.image : featuredPost.image;
    const linkPath = isBlogPage ? featuredPost.slug : 'blog/' + featuredPost.slug;

    container.innerHTML = `
    <a href="${linkPath}" class="blog-featured" style="text-decoration: none; color: inherit; display: grid;">
        <div class="blog-featured-image">
            <img src="${imagePath}" alt="${featuredPost.title}" />
        </div>
        <div class="blog-featured-content">
            <span class="blog-tag">${featuredPost.tag}</span>
            <h3>${featuredPost.title}</h3>
            <p>${featuredPost.description}</p>
            <div class="blog-meta">
                <span>${featuredPost.readTime}</span>
                <span>•</span>
                <span>${featuredPost.category || 'Finance'}</span>
            </div>
        </div>
    </a>
    `;
}

/**
 * Renders a grid of blog posts
 * @param {String} containerId 
 * @param {Object} options { count, excludeSlug, random, isBlogPage }
 */
function renderBlogGrid(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let posts = [...blogPosts];

    // Exclude specific post (e.g. current page, or the featured one if showing grid below featured)
    if (options.excludeSlug) {
        posts = posts.filter(p => p.slug !== options.excludeSlug);
    }
    // Also exclude featured if we are on index and showing grid below it
    if (options.excludeId) {
        posts = posts.filter(p => p.id !== options.excludeId);
    }

    // Randomize if requested
    if (options.random) {
        posts.sort(() => Math.random() - 0.5);
    }

    // Slice to count
    if (options.count) {
        posts = posts.slice(0, options.count);
    }

    // Render
    const cardsHtml = posts.map(post => renderBlogCard(post, options.isBlogPage || false)).join('');

    // If it's the index page grid, we want to maintain the specific grid layout classes potentially, 
    // but the CSS usually handles .blog-grid > .blog-card
    container.innerHTML = cardsHtml;
}

/**
 * Loads the blog header image for the current page
 */
function loadBlogHeaderImage() {
    // Get current filename
    const path = window.location.pathname;
    const pageSlug = path.split('/').pop();

    // Find post
    const post = blogPosts.find(p => p.slug === pageSlug);

    if (post) {
        const header = document.querySelector('.blog-post-header');
        if (header) {
            // Add background image with overlay
            // We assume we are in the blog/ directory, so we need ../ to get to assets
            header.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../${post.image}')`;
            header.style.backgroundSize = 'cover';
            header.style.backgroundPosition = 'center';
            header.style.color = '#ffffff';

            // Update title color
            const title = header.querySelector('.blog-post-title');
            if (title) {
                title.style.color = '#ffffff';
            }

            // Update meta color
            const meta = header.querySelector('.blog-post-meta');
            if (meta) {
                meta.style.color = 'rgba(255, 255, 255, 0.9)';
            }
        }
    }
}

// Auto-run on load if we are on a page that matches a blog post
document.addEventListener('DOMContentLoaded', () => {
    loadBlogHeaderImage();
});

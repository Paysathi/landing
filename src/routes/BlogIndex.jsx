import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { getAllPosts } from '../lib/blogPosts';
import { breadcrumbSchema } from '../data/schema';

const DEMO_URL = 'https://calendar.notion.so/meet/ronakmalu/takkada';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function PostCard({ post }) {
  return (
    <article className="blog-post-card">
      <Link to={`/blog/${post.slug}`} className="blog-post-card-thumb" aria-hidden="true" tabIndex={-1}>
        <img src={post.heroImage} alt="" loading="lazy" />
      </Link>
      <div className="blog-post-card-meta">
        <span className="blog-category-tag">{post.category}</span>
        <span className="blog-date tabular-nums">{formatDate(post.date)}</span>
      </div>
      <h3 className="blog-post-card-title">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="blog-post-card-excerpt">{post.excerpt}</p>
      <Link to={`/blog/${post.slug}`} className="blog-read-more">
        Read post →
      </Link>
    </article>
  );
}

function BlogIndex() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
  ];

  return (
    <>
      <Seo
        title="Blog — Takkada"
        description="Practical guides for Indian distributors on payment collection, Tally workflows, and reducing outstanding receivables."
        path="/blog"
        ogType="website"
        schemas={schemas}
      />

      <main className="blog-index-page">
        <section className="blog-index-hero">
          <div className="container">
            <p className="overline">TAKKADA BLOG</p>
            <h1 className="blog-index-title">For distributors who want to get paid faster</h1>
            <p className="blog-index-subtitle">
              Practical notes on receivables, Tally workflows, and running a tighter collections operation.
            </p>
          </div>
        </section>

        <section className="blog-posts-section">
          <div className="blog-posts-inner">
            {posts.length === 0 ? (
              <p className="blog-empty">No posts yet.</p>
            ) : (
              <>
                {featured && (
                  <article className="blog-featured-card">
                    <Link to={`/blog/${featured.slug}`} className="blog-featured-thumb" aria-hidden="true" tabIndex={-1}>
                      <img src={featured.heroImage} alt="" loading="eager" fetchPriority="high" />
                    </Link>
                    <div className="blog-featured-body">
                      <div className="blog-featured-meta">
                        <span className="blog-category-tag">{featured.category}</span>
                        <span className="blog-featured-flag">Latest</span>
                      </div>
                      <h2 className="blog-featured-title">
                        <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
                      </h2>
                      <p className="blog-featured-excerpt">{featured.excerpt}</p>
                      <div className="blog-featured-footer">
                        <span className="blog-date tabular-nums">{formatDate(featured.date)}</span>
                        <Link to={`/blog/${featured.slug}`} className="blog-read-more">
                          Read post →
                        </Link>
                      </div>
                    </div>
                  </article>
                )}

                {rest.length > 0 && (
                  <div className="blog-post-grid">
                    {rest.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <section className="blog-cta-band">
          <div className="container">
            <div className="blog-cta-card">
              <h2 className="blog-cta-heading">See how Takkada works for your business</h2>
              <p className="blog-cta-body">
                15 minutes. We show you your own Tally data on your phone, live.
              </p>
              <a href={DEMO_URL} className="cta-btn cta-btn--primary" target="_blank" rel="noopener noreferrer">
                Book a 15-min demo
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default BlogIndex;

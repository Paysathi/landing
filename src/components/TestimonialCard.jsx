function TestimonialCard({ quote, name, role, delay = 0 }) {
  return (
    <article className="testimonial-card" style={{ '--delay': `${delay}ms` }}>
      <div className="testimonial-quote-mark" aria-hidden="true">&ldquo;</div>
      <p className="testimonial-quote">{quote}</p>
      <div className="testimonial-meta">
        <div className="testimonial-avatar">{name.charAt(0)}</div>
        <div>
          <p className="testimonial-name">{name}</p>
          <p className="testimonial-role">{role}</p>
        </div>
      </div>
    </article>
  );
}

export default TestimonialCard;

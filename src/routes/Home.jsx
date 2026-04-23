import { useState } from 'react';
import { Check, RefreshCw, Zap, Shield, ArrowRight, FileText, FileCheck, Building, Bell, Link as LinkIcon, Share2, Download, Monitor } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import TestimonialCard from '../components/TestimonialCard';
import FAQItem from '../components/FAQItem';
import AnimatedHeading from '../components/AnimatedHeading';
import {
  heroStats,
  painPoints,
  coreFeatures,
  tallyFeatures,
  featureGrid,
  advancedFeatures,
  howItWorks,
  testimonials,
  pricing,
  faqItems,
  appLinks,
} from '../data/siteContent';
import { useParallaxVariable, useScrollReveal } from '../hooks/useScrollFx';
import { usePhoneModal } from '../context/PhoneModalContext';
import Seo from '../components/Seo';
import { softwareApplicationSchema, faqPageSchema } from '../data/schema';

const tallyIconMap = {
  refresh: RefreshCw,
  zap: Zap,
  check: Check,
  shield: Shield,
};

const gridIconMap = {
  fileText: FileText,
  refresh: RefreshCw,
  fileCheck: FileCheck,
  check: Check,
  building: Building,
  bell: Bell,
  link: LinkIcon,
  share: Share2,
};

function Home() {
  const [faqIndex, setFaqIndex] = useState(-1);
  const { setOpen } = usePhoneModal();

  useScrollReveal();
  useParallaxVariable();

  return (
    <>
      <Seo
        title="Takkada. Get Paid On Time. Automatically."
        description="Takkada automates invoicing, WhatsApp reminders, UPI collection, and reconciliation back into Tally for Indian distributors and wholesalers."
        path="/"
        schemas={[softwareApplicationSchema(), faqPageSchema()]}
      />
      {/* ── Hero Section ── */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge reveal is-visible">
              <span className="tabular-nums">Trusted by 100+ businesses</span>
            </div>
            <h1 className="hero-title reveal is-visible" style={{ '--delay': '100ms' }}>
              <AnimatedHeading text="Get Paid On Time." />
              <br />
              <span className="hero-title-accent">Automatically.</span>
            </h1>
            <p className="hero-subtitle reveal is-visible" style={{ '--delay': '250ms' }}>
              Takkada automates collections, payment reminders, and reconciliation for Indian distributors, wholesalers, and manufacturers who use Tally.
            </p>
            <div className="hero-ctas reveal is-visible" style={{ '--delay': '380ms' }}>
              <CTAButton variant="primary" type="button" onClick={() => setOpen(true)}>
                Book a Demo <ArrowRight size={18} />
              </CTAButton>
              <CTAButton variant="secondary" href={appLinks.download}>
                Download App
              </CTAButton>
            </div>
            <div className="hero-stats reveal is-visible" style={{ '--delay': '500ms' }}>
              {heroStats.map((s) => (
                <div key={s.label} className="hero-stat">
                  <span className="hero-stat-value tabular-nums">{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual reveal is-visible" style={{ '--delay': '300ms' }}>
            <div className="hero-phone-frame">
              <img src="/assets/screenshots/home-screen.png" alt="Takkada home screen showing receivables dashboard" />
            </div>
            <div className="hero-phone-frame hero-phone-secondary">
              <img src="/assets/screenshots/party-list.png" alt="Takkada party list with customer receivables" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem Section ── */}
      <section className="problem-section" id="problem">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">The truth about your business today</span>
            <h2 className="section-title">Cash stuck. Time wasted. Growth delayed.</h2>
            <p className="section-subtitle">Sound familiar? You&apos;re not alone. And there&apos;s finally a solution.</p>
          </div>
          <div className="pain-grid">
            {painPoints.map((p, i) => (
              <div key={p.stat} className="pain-card reveal" style={{ '--delay': `${i * 80}ms` }}>
                <span className="pain-stat tabular-nums">{p.stat}</span>
                <p className="pain-desc">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Introduction ── */}
      <section className="intro-section" id="product">
        <div className="container">
          <div className="intro-content reveal">
            <span className="section-label">Introducing Takkada</span>
            <h2 className="intro-headline">
              It doesn&apos;t just track what&apos;s owed.<br />
              It actually <span className="text-accent">collects the money</span>.<br />
              And reconciles it automatically in your Tally.
            </h2>
          </div>
          <div className="intro-screenshots reveal" style={{ '--delay': '150ms' }}>
            <div className="intro-phone">
              <img src="/assets/screenshots/settlement.png" alt="Takkada settlement screen" />
            </div>
            <div className="intro-phone intro-phone-center">
              <img src="/assets/screenshots/home-screen.png" alt="Takkada dashboard" />
            </div>
            <div className="intro-phone">
              <img src="/assets/screenshots/payment-reminders.png" alt="Takkada payment reminders" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof Metrics Bar ── */}
      <section className="metrics-bar">
        <div className="container">
          <div className="metrics-grid reveal">
            <div className="metric">
              <span className="metric-value tabular-nums">{'₹'}17+ Crore</span>
              <span className="metric-label">Collected Monthly</span>
            </div>
            <div className="metric-divider" />
            <div className="metric">
              <span className="metric-value tabular-nums">100+</span>
              <span className="metric-label">Businesses Trust Takkada</span>
            </div>
            <div className="metric-divider" />
            <div className="metric">
              <span className="metric-value">Thousands</span>
              <span className="metric-label">Of Reminders Sent Monthly</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Feature Sections ── */}
      <div id="features" />
      {coreFeatures.map((feature, index) => (
        <section
          key={feature.title}
          className={`feature-section ${index % 2 === 1 ? 'feature-section--reversed' : ''}`}
          id={feature.id}
        >
          <div className="container">
            <div className="feature-layout">
              <div className="feature-copy reveal">
                <span className="section-label">{feature.label}</span>
                <h2 className="section-title">{feature.title}</h2>
                <p className="feature-description">{feature.description}</p>
                <CTAButton variant="outline" type="button" onClick={() => setOpen(true)}>
                  See it in action <ArrowRight size={16} />
                </CTAButton>
              </div>
              <div className="feature-visuals reveal" style={{ '--delay': '120ms' }}>
                <div className="feature-phone">
                  <img src={feature.screenshot} alt={feature.title} />
                </div>
                <div className="feature-phone feature-phone-back">
                  <img src={feature.secondaryScreenshot} alt={`${feature.title} detail`} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Mid-Page CTA ── */}
      <section className="mid-cta" id="book-demo">
        <div className="container">
          <div className="mid-cta-card reveal">
            <h2>Ready to stop chasing payments?</h2>
            <p>See how Takkada can automate your collections and reconciliation.</p>
            <div className="mid-cta-actions">
              <CTAButton variant="dark" type="button" onClick={() => setOpen(true)}>
                Book a Demo <ArrowRight size={18} />
              </CTAButton>
              <CTAButton variant="outline-light" href={appLinks.download}>
                Download App
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tally Integration Section ── */}
      <section className="tally-section" id="tally">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">The Tally Connector</span>
            <h2 className="section-title">Your Tally. Now On Your Phone.</h2>
            <p className="section-subtitle">
              Takkada connects directly to your Tally installation. Every invoice, every payment, every entry, synced in real-time. No manual work. No data gaps.
            </p>
          </div>

          <div className="tally-visual reveal" style={{ '--delay': '100ms' }}>
            <div className="tally-flow">
              <div className="tally-node">
                <div className="tally-node-icon">
                  <img src="/assets/screenshots/takkada-logo.png" alt="Takkada app" className="tally-node-img" />
                </div>
                <span className="tally-node-label">Takkada</span>
              </div>
              <div className="tally-arrows">
                <div className="tally-arrow">
                  <RefreshCw size={24} />
                  <span>Real-time sync</span>
                </div>
              </div>
              <div className="tally-node">
                <div className="tally-node-icon tally-node-tally">
                  <img src="/assets/screenshots/tally-erp-logo.png?v=2" alt="Tally Prime" className="tally-node-img" />
                </div>
                <span className="tally-node-label">Tally Prime</span>
              </div>
            </div>
          </div>

          <div className="tally-download reveal" style={{ '--delay': '150ms' }}>
            <div className="tally-download-card">
              <div className="tally-download-icon">
                <Monitor size={28} />
              </div>
              <div className="tally-download-content">
                <h3>Download Tally Connector</h3>
                <p>Install the lightweight Windows connector to sync Takkada with your Tally installation.</p>
              </div>
              <a
                href={appLinks.tallyConnector}
                className="cta-btn cta-btn--primary tally-download-btn"
              >
                <Download size={18} /> Download for Windows
              </a>
            </div>
          </div>

          <div className="tally-grid">
            {tallyFeatures.map((f, i) => {
              const Icon = tallyIconMap[f.icon] || Zap;
              return (
                <div key={f.title} className="tally-card reveal" style={{ '--delay': `${i * 80}ms` }}>
                  <div className="tally-card-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Feature Grid ── */}
      <section className="grid-section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Every Feature You Actually Need</h2>
          </div>
          <div className="feature-grid-wrap">
            {featureGrid.map((f, i) => {
              const Icon = gridIconMap[f.icon] || Check;
              return (
                <div key={f.title} className="grid-card reveal" style={{ '--delay': `${i * 60}ms` }}>
                  <div className="grid-card-icon">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="grid-card-title">{f.title}</h3>
                    <p className="grid-card-desc">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Advanced Features ── */}
      {advancedFeatures.map((feature, index) => (
        <section
          key={feature.title}
          className={`feature-section ${index % 2 === 0 ? 'feature-section--reversed' : ''}`}
          id={feature.id}
        >
          <div className="container">
            <div className="feature-layout">
              <div className="feature-copy reveal">
                <span className="section-label">Advanced</span>
                <h2 className="section-title">{feature.title}</h2>
                <p className="feature-description">{feature.description}</p>
              </div>
              <div className="feature-visuals reveal" style={{ '--delay': '120ms' }}>
                <div className={`feature-phone ${feature.secondaryScreenshot ? '' : 'feature-phone-single'}`}>
                  <img src={feature.screenshot} alt={feature.title} />
                </div>
                {feature.secondaryScreenshot && (
                  <div className="feature-phone feature-phone-back">
                    <img src={feature.secondaryScreenshot} alt={`${feature.title} detail`} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── How It Works ── */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Getting Started</span>
            <h2 className="section-title">Up and Running in Days, Not Months</h2>
          </div>
          <div className="how-grid">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="how-card reveal" style={{ '--delay': `${i * 100}ms` }}>
                <span className="how-step-num tabular-nums">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className="testimonial-row">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Simple Pricing</span>
            <h2 className="section-title">Choose the Plan That Fits Your Business</h2>
            <p className="section-subtitle">All prices are annual. GST extra on all plans.</p>
          </div>
          <div className="pricing-grid reveal" style={{ '--delay': '80ms' }}>
            {pricing.plans.map((plan) => (
              <div key={plan.plan} className={`pricing-card${plan.highlighted ? ' pricing-card--highlighted' : ''}`}>
                <div className="pricing-header">
                  <div className="pricing-plan-row">
                    <span className="pricing-plan">{plan.plan}</span>
                  </div>
                  {plan.highlighted && <span className="pricing-recommended">&#10003; Recommended</span>}
                  <div className="pricing-amount">
                    <span className="pricing-price tabular-nums">{plan.price}</span>
                    <span className="pricing-period tabular-nums">{plan.period}</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check size={18} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <CTAButton variant={plan.highlighted ? 'primary' : 'outline'} type="button" fullWidth onClick={() => setOpen(true)}>
                  Book a Demo <ArrowRight size={18} />
                </CTAButton>
              </div>
            ))}
          </div>
          <div className="pricing-addons-block reveal" style={{ '--delay': '160ms' }}>
            <p className="pricing-addons-title">Add-ons</p>
            {pricing.addons.map((a) => (
              <div key={a.label} className="pricing-addon">
                <span>{a.label}{a.note && <span className="pricing-addon-note"> — {a.note}</span>}</span>
                <span className="pricing-addon-price tabular-nums">{a.price} + GST</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, i) => (
              <FAQItem
                key={item.question}
                item={item}
                isOpen={faqIndex === i}
                onToggle={() => setFaqIndex(i === faqIndex ? -1 : i)}
                delay={i * 50}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta-content reveal">
            <h2>Stop Chasing Payments.<br />Let Your System Do It.</h2>
            <p className="tabular-nums">Join 100+ businesses that have automated their collections with Takkada.</p>
            <div className="final-cta-actions">
              <CTAButton variant="dark" type="button" onClick={() => setOpen(true)}>
                Book a Demo <ArrowRight size={18} />
              </CTAButton>
              <CTAButton variant="outline-light" href={appLinks.download}>
                Download App
              </CTAButton>
            </div>
            <div className="app-store-links reveal" style={{ '--delay': '120ms' }}>
              <a href={appLinks.playStore} className="store-badge">Google Play</a>
              <a href={appLinks.appStore} className="store-badge">App Store</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

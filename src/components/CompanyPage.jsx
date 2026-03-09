import { ArrowRight, ArrowLeft, MapPin, Phone, Mail, Clock } from 'lucide-react';
import CTAButton from './CTAButton';
import { appLinks, contactInfo } from '../data/siteContent';

function CompanyPage({ page, onBack, onBookDemo }) {
  const pages = {
    'about-us': <AboutPage />,
    'contact-us': <ContactPage onBookDemo={onBookDemo} />,
    'privacy-policy': <PrivacyPolicyPage />,
    'terms-and-conditions': <TermsPage />,
    'refund-policy': <RefundPolicyPage />,
  };

  return (
    <div className="company-page">
      <div className="container">
        <button type="button" className="company-back-btn" onClick={onBack}>
          <ArrowLeft size={18} /> Back to Home
        </button>
        {pages[page] || <p>Page not found.</p>}
        <div className="company-page-cta">
          <h3>Ready to get started?</h3>
          <p>See how Takkada can automate your payment collections.</p>
          <div className="company-page-cta-actions">
            <CTAButton variant="primary" type="button" onClick={onBookDemo}>
              Book a Demo <ArrowRight size={18} />
            </CTAButton>
            <CTAButton variant="secondary" href={appLinks.download}>
              Download App
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <article className="company-article">
      <h1>About Takkada</h1>
      <p className="company-lead">
        Takkada is a business automation platform built by <strong>Pay Saathi Innovations LLP</strong> for Indian distributors, wholesalers, and manufacturers who run their business on Tally.
      </p>

      <h2>Our Mission</h2>
      <p>
        We believe business owners should spend their time growing their business — not chasing payments, creating vouchers, or reconciling spreadsheets. Takkada exists to eliminate the manual, repetitive financial tasks that drain hours from your day.
      </p>

      <h2>What We Do</h2>
      <p>
        Takkada connects directly to your Tally installation and gives you a powerful mobile-first platform to manage receivables, send automated payment reminders via WhatsApp, collect payments digitally, and reconcile everything back to Tally — automatically.
      </p>

      <h2>Why We Built Takkada</h2>
      <p>
        After working closely with hundreds of businesses across India, we saw the same problems everywhere: owners stuck at their counters, hours lost to manual follow-ups, cash stuck in overdue receivables, and accounting teams drowning in repetitive data entry. We built Takkada to solve all of this.
      </p>

      <h2>Our Approach</h2>
      <ul>
        <li><strong>Tally-First:</strong> We don't replace Tally — we make it better. Your existing workflow stays exactly the same.</li>
        <li><strong>Mobile-First:</strong> Manage your entire receivables operation from your phone, anywhere.</li>
        <li><strong>Automation-First:</strong> Payment reminders, collection links, and reconciliation all happen automatically.</li>
        <li><strong>India-First:</strong> Built for Indian businesses with GST compliance, UPI payments, WhatsApp integration, and rupee-denominated workflows.</li>
      </ul>

      <div className="company-contact-block">
        <h3>Get In Touch</h3>
        <div className="company-contact-grid">
          <div className="company-contact-item">
            <Phone size={18} />
            <span>{contactInfo.phone}</span>
          </div>
          <div className="company-contact-item">
            <Mail size={18} />
            <span>{contactInfo.email}</span>
          </div>
          <div className="company-contact-item">
            <MapPin size={18} />
            <span>Bobagh, Ulubari, Guwahati, Assam — 781008</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function ContactPage({ onBookDemo }) {
  return (
    <article className="company-article">
      <h1>Contact Us</h1>
      <p className="company-lead">
        Your feedback matters. Let&apos;s build a better future together.
      </p>

      <div className="contact-cards">
        <div className="contact-card">
          <div className="contact-card-icon"><Phone size={24} /></div>
          <h3>Phone</h3>
          <p>{contactInfo.phone}</p>
          <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>Call us</a>
        </div>
        <div className="contact-card">
          <div className="contact-card-icon"><Mail size={24} /></div>
          <h3>Email</h3>
          <p>{contactInfo.email}</p>
          <a href={`mailto:${contactInfo.email}`}>Send email</a>
        </div>
        <div className="contact-card">
          <div className="contact-card-icon"><MapPin size={24} /></div>
          <h3>Office</h3>
          <p>Bobagh, Ulubari, Guwahati, Assam — 781008</p>
        </div>
        <div className="contact-card">
          <div className="contact-card-icon"><Clock size={24} /></div>
          <h3>Business Hours</h3>
          <p>Monday – Friday, 9 AM – 6 PM IST</p>
        </div>
      </div>

      <div className="contact-demo-block">
        <h2>Prefer a Live Walkthrough?</h2>
        <p>Book a personalized demo and we'll show you exactly how Takkada works with your business.</p>
        <CTAButton variant="primary" type="button" onClick={onBookDemo}>
          Book a Meeting <ArrowRight size={18} />
        </CTAButton>
      </div>

      <div className="company-contact-block">
        <h3>Company Details</h3>
        <p><strong>{contactInfo.company}</strong></p>
        <p>Bobagh, Ulubari, Guwahati, Assam — 781008, India</p>
      </div>
    </article>
  );
}

function PrivacyPolicyPage() {
  return (
    <article className="company-article">
      <h1>Privacy Policy</h1>
      <p className="company-meta">Effective: September 16, 2025 &bull; {contactInfo.company}</p>
      <p className="company-lead">
        Pay Saathi Innovation LLP is committed to protecting the privacy of all users of Takkada, including businesses, their employees, accountants, and other authorized users.
      </p>

      <h2>1. Information We Collect</h2>
      <h3>Personal Data</h3>
      <p>Names, email addresses, phone numbers, business registration details, and GST identification numbers.</p>
      <h3>Financial Data</h3>
      <p>Tally records, invoices, payment details, and bank account information. All financial data is encrypted end-to-end.</p>
      <h3>Technical Data</h3>
      <p>Device information, IP addresses, usage patterns, and error logs collected to improve our services.</p>
      <h3>Communication Data</h3>
      <p>WhatsApp integration data, support tickets, and feedback submitted through the platform.</p>

      <h2>2. How We Use Your Data</h2>
      <ul>
        <li>Payment processing and collection facilitation</li>
        <li>Tally synchronization and data reconciliation</li>
        <li>GST compliance and E-Invoicing</li>
        <li>Business analytics dashboards and reporting</li>
        <li>Credit assessment through payment pattern analysis</li>
        <li>Product improvement and customer support</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>
        We share data only with trusted partners essential to service delivery: cloud infrastructure providers, payment gateways, WhatsApp Business API services, and NBFC partners. Legal disclosures occur when required by regulatory bodies and law enforcement under Indian law.
      </p>

      <h2>4. Security Measures</h2>
      <ul>
        <li>End-to-end encryption for all financial data</li>
        <li>AES-256 encryption for data at rest</li>
        <li>Multi-factor authentication</li>
        <li>SOC 2 compliant infrastructure</li>
        <li>Regular security audits</li>
      </ul>

      <h2>5. Data Retention</h2>
      <ul>
        <li><strong>Financial records:</strong> 7 years as per Indian regulatory standards</li>
        <li><strong>Personal data:</strong> 3 years after account closure</li>
        <li><strong>Technical logs:</strong> 12 months</li>
      </ul>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, correct, and delete your personal data at any time. To exercise these rights, contact us at <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        This Privacy Policy is governed by Indian law, including the Information Technology Act 2000 and applicable RBI guidelines.
      </p>

      <div className="company-contact-block">
        <h3>Questions about your data?</h3>
        <p>Contact us at <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> or call {contactInfo.phone}.</p>
      </div>
    </article>
  );
}

function TermsPage() {
  return (
    <article className="company-article">
      <h1>Terms &amp; Conditions</h1>
      <p className="company-meta">Last Updated: August 4, 2025 &bull; {contactInfo.company}</p>
      <p className="company-lead">
        These Terms and Conditions govern your use of Takkada, a product of Pay Saathi Innovation LLP. By using our platform, you agree to these terms.
      </p>

      <h2>1. Services Offered</h2>
      <p>
        Takkada provides payment reminder automation, payment collection, and invoice reconciliation services for businesses using Tally or similar accounting systems. We also offer E-Invoicing and E-Way Bill generation.
      </p>

      <h2>2. User Responsibilities</h2>
      <ul>
        <li>Provide accurate business and financial data</li>
        <li>Use the services only for lawful business purposes</li>
        <li>Maintain the confidentiality of your login credentials</li>
        <li>Ensure authorized personnel have appropriate access levels</li>
      </ul>

      <h2>3. Tally Integration</h2>
      <p>
        By using the Tally Connector, you authorize Takkada to access and fetch your invoice data from Tally and make changes in it for reconciliation purposes. This integration is read-write and essential for core functionality.
      </p>

      <h2>4. Payments</h2>
      <p>
        Payments collected via Takkada&apos;s platform may involve third-party payment gateways. The company bears no responsibility for external payment processor issues, downtime, or additional charges imposed by payment providers.
      </p>

      <h2>5. Data Accuracy</h2>
      <p>
        While Takkada strives for complete accuracy in data synchronization, the final responsibility to verify and confirm the data remains with you, the business user. We recommend periodic reconciliation reviews.
      </p>

      <h2>6. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your access to the platform for violation of these terms, misuse of the platform, or non-payment of subscription fees. You may cancel your subscription at any time.
      </p>

      <h2>7. Changes to Terms</h2>
      <p>
        We may revise these terms periodically. Updated terms will be posted on this page with a revised date. Continued use of the platform after changes constitutes acceptance of the updated terms.
      </p>

      <div className="company-contact-block">
        <h3>Have questions?</h3>
        <p>Contact us at <a href="mailto:support@paysaathi.in">support@paysaathi.in</a> or call {contactInfo.phone}.</p>
      </div>
    </article>
  );
}

function RefundPolicyPage() {
  return (
    <article className="company-article">
      <h1>Refund &amp; Cancellation Policy</h1>
      <p className="company-meta">Effective: 2025 &bull; {contactInfo.company}</p>
      <p className="company-lead">
        This refund policy outlines the rules and regulations for refunds for Takkada subscription services provided by Pay Saathi Innovation LLP.
      </p>

      <h2>Subscription Plans</h2>
      <div className="policy-plans">
        <div className="policy-plan-card">
          <strong>Takkada Basic (Tier 1)</strong>
          <span>{'\u20B9'}4,500 + GST / year</span>
        </div>
        <div className="policy-plan-card">
          <strong>Takkada Professional (Tier 2)</strong>
          <span>{'\u20B9'}7,500 + GST / year</span>
        </div>
      </div>

      <h2>30-Day Money-Back Guarantee</h2>
      <h3>Full Refund Eligibility</h3>
      <ul>
        <li>First-time Takkada customers only</li>
        <li>Request submitted within 30 calendar days of activation</li>
        <li>Unresolved technical issues after 15 business days of support</li>
        <li>Integration failures despite meeting system requirements</li>
      </ul>

      <h3>Not Eligible for Refund</h3>
      <ul>
        <li>Renewal subscriptions (year 2 and onwards)</li>
        <li>Channel partner or distributor purchases</li>
        <li>Requests submitted after the 30-day window</li>
        <li>User error or system incompatibility issues</li>
        <li>Dissatisfaction with documented features working as intended</li>
      </ul>

      <h2>How to Request a Refund</h2>
      <ol>
        <li>Email <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> with subject: <em>&quot;Refund Request — [License Number]&quot;</em></li>
        <li>Include your name, business details, license number, activation date, and reason for refund</li>
        <li>You will receive an acknowledgment within 2 business days</li>
        <li>Resolution within 7 business days of review</li>
      </ol>

      <h2>Approved Refunds</h2>
      <p>
        Full license fee is refunded (excluding GST and processing fees) within 7–10 business days to the original payment method. License access terminates immediately upon refund approval.
      </p>
      <p>Partial refunds may be considered on a case-by-case basis at company discretion.</p>

      <h2>Channel Partners</h2>
      <p>
        Direct refunds are not available for purchases made through channel partners or distributors. Refund requests must be submitted through the original seller.
      </p>

      <h2>Chargeback Policy</h2>
      <p>
        We request that you contact our support team before initiating a chargeback with your bank. Unwarranted chargebacks may result in account suspension.
      </p>

      <h2>Special Circumstances</h2>
      <ul>
        <li><strong>Force Majeure:</strong> Refunds processed outside normal terms for product discontinuation or regulatory changes</li>
        <li><strong>Business Closure:</strong> Pro-rated refunds for unused periods if services are discontinued</li>
      </ul>

      <div className="company-contact-block">
        <h3>Need help with a refund?</h3>
        <p>Contact us at <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> or call {contactInfo.phone}.</p>
        <p>Business hours: Monday – Friday, 9 AM – 6 PM IST</p>
      </div>
    </article>
  );
}

export default CompanyPage;

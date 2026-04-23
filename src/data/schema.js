import { contactInfo, faqItems, pricing } from './siteContent';

export const SITE_URL = 'https://takkada.com';
export const DEFAULT_OG_IMAGE = '/assets/screenshots/takkada-logo.png';

const SOCIAL_URLS = [
  'https://www.linkedin.com/company/takkada/',
  'https://www.facebook.com/profile.php?id=61577621565711',
];

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  const leading = path.startsWith('/') ? path : `/${path}`;
  if (leading === '/') return `${SITE_URL}/`;
  const lastSegment = leading.split('/').filter(Boolean).pop() || '';
  const isAsset = lastSegment.includes('.');
  if (isAsset) return `${SITE_URL}${leading}`;
  const trailing = leading.endsWith('/') ? leading : `${leading}/`;
  return `${SITE_URL}${trailing}`;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Takkada',
    legalName: contactInfo.company,
    url: SITE_URL,
    logo: absoluteUrl('/assets/screenshots/takkada-logo.png'),
    email: contactInfo.email,
    telephone: contactInfo.phone,
    foundingDate: '2025-12',
    sameAs: SOCIAL_URLS,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bobagh, Ulubari',
      addressLocality: 'Guwahati',
      addressRegion: 'Assam',
      postalCode: '781008',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactInfo.phone,
      contactType: 'customer support',
      email: contactInfo.email,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  };
}

export function softwareApplicationSchema() {
  const priceNumber = (price) => price.replace(/[^\d]/g, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Takkada',
    description:
      'Mobile-first collections, e-invoicing, and reconciliation layer for businesses running on Tally.',
    url: SITE_URL,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Android, iOS',
    publisher: { '@id': `${SITE_URL}/#organization` },
    image: absoluteUrl('/assets/screenshots/takkada-logo.png'),
    screenshot: [
      absoluteUrl('/assets/screenshots/home-screen.png'),
      absoluteUrl('/assets/screenshots/payment-reminders.png'),
      absoluteUrl('/assets/screenshots/settlement.png'),
    ],
    offers: pricing.plans.map((plan) => ({
      '@type': 'Offer',
      name: plan.plan,
      price: priceNumber(plan.price),
      priceCurrency: 'INR',
      category: 'Annual subscription',
      eligibleCustomerType: 'https://schema.org/BusinessEntity',
    })),
  };
}

export function faqPageSchema(items = faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

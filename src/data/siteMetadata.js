// Single source of truth for top-level routes. Consumed by both the router
// (src/routes/index.jsx) and the build-time sitemap generator
// (scripts/generate-sitemap.mjs). Keep this file free of React / JSX imports
// so Node ESM can load it directly.

export const routeMetadata = [
  {
    path: '/',
    sourceFile: 'src/routes/Home.jsx',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/about-us',
    sourceFile: 'src/routes/AboutUs.jsx',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/contact-us',
    sourceFile: 'src/routes/ContactUs.jsx',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/privacy-policy',
    sourceFile: 'src/routes/PrivacyPolicy.jsx',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/terms-and-conditions',
    sourceFile: 'src/routes/TermsAndConditions.jsx',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/refund-policy',
    sourceFile: 'src/routes/RefundPolicy.jsx',
    changefreq: 'yearly',
    priority: 0.3,
  },
];

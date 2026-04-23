import Layout from '../Layout';
import Home from './Home';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import RefundPolicy from './RefundPolicy';
import { routeMetadata } from '../data/siteMetadata';

const ELEMENT_FOR_PATH = {
  '/': <Home />,
  '/about-us': <AboutUs />,
  '/contact-us': <ContactUs />,
  '/privacy-policy': <PrivacyPolicy />,
  '/terms-and-conditions': <TermsAndConditions />,
  '/refund-policy': <RefundPolicy />,
};

const children = routeMetadata.map(({ path }) => {
  const element = ELEMENT_FOR_PATH[path];
  if (!element) {
    throw new Error(`No route element registered for path "${path}" in src/routes/index.jsx`);
  }
  if (path === '/') return { index: true, element };
  return { path: path.replace(/^\//, ''), element };
});

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children,
  },
];

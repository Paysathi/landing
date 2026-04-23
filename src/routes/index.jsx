import Layout from '../Layout';
import Home from './Home';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import RefundPolicy from './RefundPolicy';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about-us', element: <AboutUs /> },
      { path: 'contact-us', element: <ContactUs /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms-and-conditions', element: <TermsAndConditions /> },
      { path: 'refund-policy', element: <RefundPolicy /> },
    ],
  },
];

import { FileText, Link as LinkIcon, Moon, Zap } from 'lucide-react';
import ICPTemplate from '../components/ICPTemplate';

const data = {
  overline: 'WHATSAPP INVOICING',
  headline: 'Every Tally invoice on WhatsApp, automatically.',
  subheadline:
    'You create the invoice in Tally. Takkada sends it to the customer on WhatsApp with a PDF and a payment link. You do not copy, attach, or forward anything.',
  ctaPrimary: {
    text: 'Book a 15-min demo',
    href: 'https://calendar.notion.so/meet/ronakmalu/takkada',
  },
  ctaSecondary: { text: 'See pricing', href: '/#pricing-strip' },
  capabilitiesHeading: 'From Tally to customer in under 10 seconds',
  capabilities: [
    {
      icon: Zap,
      title: 'Invoice dispatched the moment you save',
      body: 'The customer receives the PDF and a tappable payment link before you close the screen.',
    },
    {
      icon: LinkIcon,
      title: 'Every message includes a payment link',
      body: 'Customer taps, pays via UPI or card. No bank account details, no screenshot sharing, no manual confirmation.',
    },
    {
      icon: FileText,
      title: 'Your invoice format, exactly',
      body: 'Whatever Tally is configured with — that is what the customer sees. No re-rendering, no reformatting.',
    },
    {
      icon: Moon,
      title: 'Works after office hours',
      body: 'Invoices raised from mobile dispatch via WhatsApp immediately, even when the office laptop is off.',
    },
  ],
  scenario:
    "It is 8:47 PM on a Saturday. Your salesman in Tezpur closes a ₹62,000 order. He raises the invoice from his phone. Three seconds later, the retailer's WhatsApp pings — PDF attached, payment link included, your shop name in the header. The retailer pays within the hour. The entry is in Tally when you open it Monday morning.",
  testimonial: {
    quote:
      'Invoices used to reach customers the next morning. Now they arrive before the retailer is back at his shop. Collections moved faster by about a week across my whole book.',
    author: 'Wholesale distributor, Barpeta',
  },
  faqs: [
    {
      q: 'Does this use my personal WhatsApp or a separate number?',
      a: 'Takkada uses the WhatsApp Business API with a dedicated number for your business. Messages go from your business name, not from a personal number.',
    },
    {
      q: 'Is there a per-message charge?',
      a: 'WhatsApp Business API charges apply as pass-through. Our 8,000-message pack costs ₹2,000 per year — enough for around 650 invoices a month. Top up as needed.',
    },
    {
      q: "What if the customer's WhatsApp number is wrong in Tally?",
      a: 'Delivery fails and the status shows in your Takkada dashboard. Fix the number in Tally and resend in one tap.',
    },
    {
      q: 'Can I send ledger statements and reminders the same way?',
      a: 'Yes. Reminders, ledger statements, and invoice attachments all use the same WhatsApp channel.',
    },
    {
      q: 'What plan do I need for auto-dispatch?',
      a: 'Auto Invoice Dispatch is included in the Full Access / Auto Dispatch plan. It is also available as an add-on on the Collections plan for ₹1,500 per year.',
    },
  ],
  breadcrumb: [
    { name: 'Home', url: 'https://takkada.com/' },
    { name: 'WhatsApp Invoicing', url: 'https://takkada.com/whatsapp-invoice-tally/' },
  ],
  seo: {
    title: 'WhatsApp Invoicing from Tally | Auto-Send Every Invoice',
    description:
      'Send every Tally invoice to customers on WhatsApp automatically — PDF and payment link included. Works with TallyPrime and Tally ERP 9.',
    canonical: 'https://takkada.com/whatsapp-invoice-tally/',
  },
};

function WhatsAppInvoice() {
  return <ICPTemplate {...data} />;
}

export default WhatsAppInvoice;

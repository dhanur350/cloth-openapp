/**
 * ==========================================================================
 * AURA ATELIER - APPLICATION CONSTANTS & DATA ARRAYS
 * Contains all static collections and UI configurations for dynamic mapping:
 * - Navigation links
 * - Hero metrics
 * - Value proposition pillars
 * - Category filter pills
 * - Sort options
 * - Atelier story features
 * - Customer testimonials
 * - Footer links (Collections, Client Services, Atelier, Socials)
 * ==========================================================================
 */

// ==========================================================================
// 1. PRIMARY NAVIGATION LINKS (index.html L51-L56)
// ==========================================================================
const NAV_ITEMS = [
  { label: 'Home', href: '#featured', active: true },
  { label: 'Collection', href: '#catalog', filter: 'all' },
  { label: 'Women', href: '#catalog', filter: 'women' },
  { label: 'Men', href: '#catalog', filter: 'men' },
  { label: 'Accessories', href: '#catalog', filter: 'accessories' },
  { label: 'Our Story', href: '#story' }
];

// ==========================================================================
// 2. HERO METRICS & TRUST BADGES (index.html L144-L155)
// ==========================================================================
const HERO_METRICS = [
  { value: '100%', label: 'Traceable Fibers' },
  { value: '4.9 ★', label: 'Over 12k Reviews' },
  { value: 'Zero', label: 'Plastic Packaging' }
];

// ==========================================================================
// 3. VALUE PROPOSITIONS STRIP (index.html L181-L235)
// ==========================================================================
const VALUE_PROPOSITIONS = [
  {
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>`,
    title: 'Complimentary Shipping',
    desc: 'Carbon-neutral delivery across 80+ countries worldwide.'
  },
  {
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>`,
    title: 'Certified Sustainable',
    desc: 'OEKO-TEX® and GOTS certified organic & non-toxic raw textiles.'
  },
  {
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="23 4 23 10 17 10"></polyline>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
    </svg>`,
    title: '30-Day Easy Returns',
    desc: 'Seamless prepaid courier pickup right from your doorstep.'
  },
  {
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>`,
    title: 'Atelier Concierge',
    desc: 'Personalized fit styling and fabric care advice 7 days a week.'
  }
];

// ==========================================================================
// 4. CATEGORY FILTER PILLS (index.html L262-L267)
// ==========================================================================
const CATEGORY_FILTERS = [
  { label: 'All Styles', category: 'all', active: true },
  { label: 'Outerwear', category: 'outerwear' },
  { label: 'Knitwear', category: 'knitwear' },
  { label: 'Dresses', category: 'dresses' },
  { label: 'Tailoring', category: 'tailoring' },
  { label: 'Accessories', category: 'accessories' }
];

// ==========================================================================
// 5. CATALOG SORT OPTIONS (index.html L281-L284)
// ==========================================================================
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured Curations' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Customer Rating' }
];

// ==========================================================================
// 6. ATELIER STORY FEATURES (index.html L344-L361)
// ==========================================================================
const STORY_FEATURES = [
  {
    strong: 'Pure Natural Fibers:',
    desc: 'Certified non-mulesed merino, grade-6A silk, and organic combed cotton.'
  },
  {
    strong: 'Transparent Production:',
    desc: 'Zero factory dumping, living wages, and complete supply chain transparency.'
  },
  {
    strong: 'Lifetime Repair Guarantee:',
    desc: 'We provide complimentary spare buttons, thread, and repair services for life.'
  }
];

// ==========================================================================
// 7. CLIENT TESTIMONIALS (index.html L383-L419)
// ==========================================================================
const TESTIMONIALS = [
  {
    stars: '★★★★★',
    quote: '"The cashmere coat drape is unmatched. The structure of the lapel and the softness of the fabric feels even better than my heritage couture coats."',
    initials: 'EG',
    author: 'Eleanor G.',
    role: 'Architect & Designer, Zurich'
  },
  {
    stars: '★★★★★',
    quote: '"Finding menswear trousers that combine high-grade Italian wool with a relaxed silhouette used to be impossible. AURA has set an entirely new standard."',
    initials: 'MT',
    author: 'Marcus T.',
    role: 'Creative Director, London'
  },
  {
    stars: '★★★★★',
    quote: '"The mulberry silk slip dress is heaven on skin. Wore it to a gallery opening in Paris and received non-stop compliments. Worth every single cent."',
    initials: 'CL',
    author: 'Camille L.',
    role: 'Curator, Paris'
  }
];

// ==========================================================================
// 8. FOOTER SOCIAL LINKS (index.html L461-L464)
// ==========================================================================
const FOOTER_SOCIAL_LINKS = [
  { label: 'Instagram', text: 'IG', href: '#' },
  { label: 'Pinterest', text: 'PI', href: '#' },
  { label: 'LinkedIn', text: 'LI', href: '#' },
  { label: 'Twitter', text: 'X', href: '#' }
];

// ==========================================================================
// 9. FOOTER COLLECTIONS LINKS (index.html L472-L476)
// ==========================================================================
const FOOTER_COLLECTIONS_LINKS = [
  { label: 'Outerwear & Coats', href: '#catalog', filter: 'outerwear' },
  { label: 'Italian Tailoring', href: '#catalog', filter: 'tailoring' },
  { label: 'Merino Knitwear', href: '#catalog', filter: 'knitwear' },
  { label: 'Pure Silk Slip Dresses', href: '#catalog', filter: 'dresses' },
  { label: 'Leather Goods', href: '#catalog', filter: 'accessories' }
];

// ==========================================================================
// 10. FOOTER CLIENT SERVICES LINKS (index.html L484-L488)
// ==========================================================================
const FOOTER_SERVICES_LINKS = [
  { label: 'Size & Fit Guide', href: '#' },
  { label: 'Worldwide Shipping & Duties', href: '#' },
  { label: 'Complimentary Returns', href: '#' },
  { label: 'Fabric Care Instructions', href: '#' },
  { label: 'Book a Virtual Fitting', href: '#' }
];

// ==========================================================================
// 11. FOOTER ATELIER LINKS (index.html L496-L500)
// ==========================================================================
const FOOTER_ATELIER_LINKS = [
  { label: 'Our Sustainability Manifesto', href: '#story' },
  { label: 'Responsible Mills & Materials', href: '#story' },
  { label: 'Flagship Locations', href: '#' },
  { label: 'Careers at Aura', href: '#' },
  { label: 'Press & Editorial Inquiries', href: '#' }
];

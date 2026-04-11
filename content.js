/**
 * src/data/content.js
 * ───────────────────────────────────────────────────────────────
 * Static content data used when Wagtail API is not available
 * (local dev fallback, static export, or Storybook).
 *
 * STRUCTURE mirrors the Wagtail StreamField API response defined
 * in wagtail/models.py. Each item in 'body' has:
 *   { type: '<block_type>', value: { ...fields } }
 *
 * In production, App.jsx fetches this shape from the Wagtail API:
 *   GET /api/v2/pages/?type=home.HomePage&fields=body
 *
 * Wagtail block types → React component mapping (see App.jsx):
 *   hero            → <Hero>
 *   feature_list    → <FeatureList>
 *   retreat         → <Retreat>
 *   process         → <Process>
 *   amenities       → <Amenities>
 *   family          → <Family>
 *   activities      → <Activities>
 *   hosting         → <Hosting>
 *   escape          → <Escape>
 *   details         → <Details>
 *   place           → <Place>
 *   faq             → <FAQ>
 *   cta_escape      → <CTAEscape>
 *   contact         → <Contact>
 *   newsletter      → <Newsletter>
 * ───────────────────────────────────────────────────────────────
 */

export const siteData = {
  name: 'Furze Farmhouse',
  logo: { alt: 'Furze Farmhouse Logo', src: '/assets/logo.png' },
};

export const navData = {
  links: [
    { label: 'Explore Villa', href: '#explore-villa' },
    { label: 'Activities',    href: '#activities'   },
    { label: 'Surroundings',  href: '#surroundings' },
    { label: 'More',          href: '#more', hasDropdown: true, children: [] },
  ],
  cta: { label: 'Book', href: '#book' },
};

export const footerData = {
  navLinks: [
    { label: 'Explore villa',     href: '#explore-villa' },
    { label: 'View services',     href: '#services'      },
    { label: 'Activities nearby', href: '#activities'    },
    { label: 'About grounds',     href: '#grounds'       },
    { label: 'Local area',        href: '#local-area'    },
  ],
  socialLinks: [
    { platform: 'Facebook',  href: '#', ariaLabel: 'Facebook'  },
    { platform: 'Instagram', href: '#', ariaLabel: 'Instagram' },
    { platform: 'X',         href: '#', ariaLabel: 'X'         },
    { platform: 'LinkedIn',  href: '#', ariaLabel: 'LinkedIn'  },
    { platform: 'YouTube',   href: '#', ariaLabel: 'YouTube'   },
  ],
  legalLinks: [
    { label: 'Privacy policy',       href: '#privacy'  },
    { label: 'Terms and conditions', href: '#terms'    },
    { label: 'Cookie preferences',   href: '#cookies'  },
  ],
  copyright: '© 2025 Scottish Villa Retreat. All rights reserved.',
};

/**
 * StreamField body — matches Wagtail API response shape.
 * In production this array is fetched from /api/v2/pages/...
 * Here it is the static fallback used during development.
 */
export const pageBody = [

  /* ── Section 1 · Hero ─────────────────────────────────────── */
  {
    type: 'hero',
    value: {
      image:   { src: '/assets/hero-farmhouse.jpg', alt: 'Furze Farmhouse exterior – stone building with gardens' },
      heading: 'Experience the Soul of the Scottish Countryside',
      body:    'Escape to a beautifully restored farmhouse where contemporary luxury meets rustic charm. Perched above the River Tay, The Furze Farmhouse offers the perfect blend of peace, space, and adventure for families, groups, and four-legged friends.',
      ctas: [
        { label: 'Explore', href: '#explore', style: 'outline-white' },
        { label: 'Book',    href: '#book',    style: 'outline-white' },
      ],
    },
  },

  /* ── Section 2 · Feature List (5 rows) ────────────────────── */
  {
    type: 'feature_list',
    value: {
      items: [
        { id: 'feature-dogs',           tag: 'Essentials', heading: 'Dogs welcome in the garden',                          body: 'Three well-behaved dogs can stay with you. The fully fenced back garden keeps them safe and gives them room to roam.',                                                                image: { src: '/assets/feature-dog.jpg',            alt: 'White fluffy dog running through the garden'             }, ctas: [{ label: 'Explore',  href: '#explore',    style: 'outline-dark' }, { label: 'Learn More', href: '#learn-more', style: 'text-arrow' }] },
        { id: 'feature-hot-tub',        tag: 'Highlights', heading: 'Soak in the outdoor hot tub',                        body: 'The villa opens itself to you completely. Four parking spaces sit ready, the garden stretches fenced and safe, and the hot tub waits for evening soaks under the Scottish sky.', image: { src: '/assets/feature-hot-tub.jpg',        alt: 'Outdoor hot tub with countryside views'                  }, ctas: [{ label: 'Explore',  href: '#explore',    style: 'outline-dark' }, { label: 'Learn More', href: '#learn-more', style: 'text-arrow' }] },
        { id: 'feature-parking',        tag: 'Comfort',    heading: 'Space and parking included',                          body: 'WiFi and heating run through the house. The kitchen stands ready. Bed linen, towels, and a washing machine come as standard. Everything needed for a proper stay.',           image: { src: '/assets/feature-garden-view.jpg',    alt: 'Garden path with open countryside and River Tay beyond'  }, ctas: [{ label: 'Discover', href: '#discover',   style: 'outline-dark' }, { label: 'Learn More', href: '#learn-more', style: 'text-arrow' }] },
        { id: 'feature-river-views',    tag: 'Access',     heading: 'River views from every angle',                        body: 'You have the run of the place from arrival to departure. The river views greet you from multiple angles. The patio and garden furniture invite you to settle in and stay awhile.', image: { src: '/assets/feature-river-sunset.jpg',   alt: 'Sunset over the River Tay with golden sky reflections'   }, ctas: [{ label: 'Explore',  href: '#explore',    style: 'outline-dark' }, { label: 'Learn More', href: '#learn-more', style: 'text-arrow' }] },
        { id: 'feature-lindores-abbey', tag: 'Explore',    heading: 'Dive Deep into the History of Lindores Abbey',        body: 'Step back in time at Lindores Abbey, a site of global pilgrimage for history buffs and whisky lovers alike. Founded in 1191, this Tironensian abbey thrived for over 350 years as a center of power and hospitality.', image: { src: '/assets/feature-lindores-abbey.jpg', alt: 'Ivy-covered stone archway ruins of Lindores Abbey'       }, ctas: [{ label: 'Discover', href: '#discover',   style: 'outline-dark' }, { label: 'Learn More', href: '#learn-more', style: 'text-arrow' }] },
      ],
    },
  },

  /* ── Section 3 · Retreat ───────────────────────────────────── */
  {
    type: 'retreat',
    value: {
      tag:     'Retreat',
      heading: 'Unwind in the hot tub and garden',
      body:    "The private hot tub sits in a fully fenced garden where you can soak under the Scottish sky. It's the kind of place where time slows down and the world feels far away.",
      subFeatures: [
        { icon: 'hot-tub', label: 'The hot tub', description: 'Ease into warm water after exploring the Tay valley.' },
        { icon: 'garden',  label: 'The garden',  description: 'Fenced and safe for families and dogs alike.'         },
      ],
      ctas:  [{ label: 'Explore', href: '#explore', style: 'outline-dark' }, { label: 'Learn More', href: '#learn-more', style: 'text-arrow' }],
      image: { src: '/assets/section3-garden-field.jpg', alt: 'Countryside field view with wooden fence and blue sky' },
    },
  },

  /* ── Section 4 · Process ───────────────────────────────────── */
  {
    type: 'process',
    value: {
      tag:      'Process',
      heading:  'Getting here is simple',
      subtitle: 'Three steps to arrive at your Scottish escape.',
      steps: [
        { number: 'One',   heading: 'Choose your dates and book the villa',                   subline: 'Pick your stay',        cta: { label: 'Learn More', href: '#learn-more' }, image: { src: '/assets/step1-booking.jpg',     alt: 'Diary and phone showing booking calendar'         } },
        { number: 'Two',   heading: 'Receive access details and arrival information',          subline: 'Get the details',       cta: { label: 'Learn More', href: '#learn-more' }, image: { src: '/assets/step2-phone.jpg',       alt: 'Person holding phone receiving confirmation'       } },
        { number: 'Three', heading: 'Arrive and settle into your retreat',                     subline: 'Make yourself at home', cta: { label: 'Learn More', href: '#learn-more' }, image: { src: '/assets/step3-living-room.jpg', alt: 'Warm living room with sofa and lamp'               } },
      ],
    },
  },

  /* ── Section 5 · Amenities ─────────────────────────────────── */
  {
    type: 'amenities',
    value: {
      tag:      'Amenities',
      heading:  'Everything you need is here',
      subtitle: 'The villa comes equipped with what matters most for a comfortable stay.',
      items: [
        { icon: 'kitchen',  heading: 'Kitchen, washing machine, WiFi, high chairs and travel cot included.', cta: { label: 'Explore',  href: '#explore',  style: 'outline-white' } },
        { icon: 'outdoor',  heading: 'Hot tub, garden furniture, and parking for four cars.',                cta: { label: 'Discover', href: '#discover', style: 'outline-white' } },
        { icon: 'location', heading: 'Newburgh offers what you need nearby',   body: 'Shops, restaurants, and local attractions sit within easy reach of the villa.' },
        { icon: 'room',     heading: 'Room to Breathe', body: 'The house stands ready for you with plenty of space to relax.', note: 'Please note that the property features garden steps that may be important for guests with limited mobility to consider.' },
      ],
      footerCta: { label: 'Learn More', href: '#learn-more', style: 'text-arrow-white' },
    },
  },

  /* ── Section 6 · Family ────────────────────────────────────── */
  {
    type: 'family',
    value: {
      tag:     'Family',
      heading: 'Built for families and groups seeking peace',
      body:    'The villa gives you space to spread out and privacy to do as you please. The enclosed garden keeps children and dogs safe while you relax nearby. It is inclusive of a travel cot and a washing machine.',
      stats:   [{ value: '4', label: 'Parking spaces included with the house' }, { value: '3', label: 'Dogs welcome in the secure garden' }],
      cta:     { label: 'Learn More', href: '#learn-more' },
      image:   { src: '/assets/section6-living-room.jpg', alt: 'Bright living room with French doors opening to garden' },
    },
  },

  /* ── Section 7 · Activities ────────────────────────────────── */
  {
    type: 'activities',
    value: {
      tag:      'Activities',
      heading:  'Adventure waits on your doorstep',
      subtitle: 'The Tay valley offers everything from quiet pursuits to adrenaline-fueled days. Newburgh sits at the heart of it all.',
      cards: [
        { heading: 'Quite Mornings by the River Tay', body: 'Cast a fishing line in waters known for salmon and sea trout.', image: { src: '/assets/activity-river-morning.jpg', alt: 'Sunrise view from bedroom with river beyond' } },
        { heading: 'Golf courses nearby',             body: 'Several courses sit within easy reach of the villa.',          image: { src: '/assets/activity-golf.jpg',           alt: 'Golf course with open countryside and water' } },
        { heading: 'Motor racing and skydiving',      body: 'For those who want their thrills served fast.',                image: { src: '/assets/activity-motorbike.jpg',      alt: 'Motorbike parked in green landscape'         } },
      ],
      footerCta: { label: 'Learn More', href: '#learn-more', style: 'outline-dark' },
    },
  },

  /* ── Section 8 · Hosting ───────────────────────────────────── */
  {
    type: 'hosting',
    value: {
      tag:      'Hosting and Gatherings',
      heading:  'Host your retreat or workshop here',
      subtitle: 'The villa welcomes yoga retreats, lessons, and workshops. Organize your own gathering or join one already planned.',
      ctas:     [{ label: 'Organize', href: '#organize', style: 'outline-white' }, { label: 'Learn More', href: '#learn-more', style: 'text-arrow-white' }],
      image:    { src: '/assets/section8-yoga.jpg', alt: 'Group of people doing yoga outdoors at sunset' },
      accordionItems: [
        { heading: 'Yoga retreats',   body: 'Find peace in the quiet of Fife. The garden and river views create a perfect setting for practice and reflection.' },
        { heading: 'Workshops',       body: 'Host a gathering focused on craft, learning, or skill. The space is yours to shape as you need.'                   },
        { heading: 'Cultural events', body: 'Music, art, and local traditions find a home here. Check available dates and join or create something meaningful.' },
      ],
    },
  },

  /* ── Section 9 · Escape ────────────────────────────────────── */
  {
    type: 'escape',
    value: {
      tag:      'Escape',
      heading:  'Leave the city behind and breathe',
      subtitle: 'The villa sits quiet on the Tay, far enough from noise to matter. Here you find what the city takes from you—time, space, and the kind of silence that lets you think.',
      ctas:     [{ label: 'Explore', href: '#explore', style: 'outline-dark' }, { label: 'Learn More', href: '#learn-more', style: 'text-arrow' }],
      image:    { src: '/assets/section9-window.jpg', alt: 'Window with plant overlooking countryside rooftops' },
      listItems: [
        { heading: 'Quiet mornings by the river',                   body: 'The fenced garden keeps children and dogs safe while you watch from the patio. Four parking spaces mean no fighting for room. This is what space feels like.' },
        { heading: 'Room to move and breathe',                      body: 'River views from every angle. Gardens that stretch out. The kind of landscape that reminds you why you came north in the first place.'                         },
        { heading: '"Lindores Abbey" within walking distance',      body: 'The ruins overlook the same waters where Scottish whisky began. Walk there and feel the weight of centuries. Newburgh holds stories worth knowing.'           },
      ],
    },
  },

  /* ── Section 10 · Details ──────────────────────────────────── */
  {
    type: 'details',
    value: {
      tag:      'Details',
      heading:  'What the villa holds',
      subtitle: 'The numbers tell part of the story. Four parking spaces. Three dogs welcome. A house built to fit groups and families who want room to move.',
      stats:    [{ value: '4', label: 'Parking spaces', description: 'Room for your cars and guests' }, { value: '3', label: 'Dogs allowed', description: 'Well-behaved companions welcome here' }, { value: '12', label: 'Garden steps', description: 'Leading down to lower levels' }],
      cta:      { label: 'Learn More →', href: '#learn-more', style: 'outline-white' },
    },
  },

  /* ── Section 11 · Place / Newburgh ────────────────────────── */
  {
    type: 'place',
    value: {
      tag:      'Place',
      heading:  'Newburgh',
      subtitle: 'A town on the Firth of Tay in north Fife, where the river runs wide and history runs deep.',
      locations: [
        { name: 'Newburgh',       address: 'Firth of Tay, north Fife, Scotland',   linkLabel: 'Explore Newburgh', linkHref: '#explore-newburgh' },
        { name: 'Lindores Abbey', address: 'East of town, overlooking salmon waters', linkLabel: 'Visit Abbey',    linkHref: '#visit-abbey'      },
      ],
      image: { src: '/assets/section11-newburgh.jpg', alt: 'Newburgh countryside with trees and River Tay' },
    },
  },

  /* ── Section 12 · FAQ ──────────────────────────────────────── */
  {
    type: 'faq',
    value: {
      heading:  'Questions',
      subtitle: 'What you need to know before you arrive at Scottish Villa Retreat.',
      items: [
        { question: 'Can I bring my dogs?',          answer: "Yes. Up to three well-behaved dogs stay free. The fenced garden keeps them safe and gives them room to run. It's one of the best features of the place.", defaultOpen: true },
        { question: "What's included in the stay?",  answer: 'WiFi, heating, bed linen, towels, fully equipped kitchen, washing machine, high chairs, travel cot, hot tub, garden furniture, and four parking spaces — all included.' },
        { question: 'How many cars can park here?',  answer: 'There are four dedicated parking spaces on the property. No on-street parking needed.' },
        { question: 'Is smoking allowed?',           answer: 'Smoking is not permitted inside the property. Guests are welcome to smoke outside in designated garden areas.' },
        { question: 'Can I host an event here?',     answer: 'Yes — the villa welcomes yoga retreats, workshops, cultural gatherings, and small group events. Get in touch to discuss requirements and available dates.' },
      ],
      footerCta: { heading: 'Still have questions?', body: "Reach out and we'll help you plan your stay.", cta: { label: 'Contact Us', href: '#contact', style: 'primary-blue' } },
    },
  },

  /* ── Section 13 · CTA Escape ───────────────────────────────── */
  {
    type: 'cta_escape',
    value: {
      heading:  'Your Scottish escape starts now',
      subtitle: 'Pick your dates and book the villa. Or get in touch about hosting your retreat.',
      ctas:     [{ label: 'Book', href: '#book', style: 'primary-blue' }, { label: 'Inquire', href: '#inquire', style: 'outline-dark' }],
      image:    { src: '/assets/section13-bedroom.jpg', alt: 'Master bedroom with two lamps and folded towels on bed' },
    },
  },

  /* ── Section 14 · Contact ──────────────────────────────────── */
  {
    type: 'contact',
    value: {
      tag:      'Connect',
      heading:  'Get in touch',
      subtitle: "Questions about booking or hosting an event? We're here to help.",
      contactItems: [
        { icon: 'email',    label: 'Email',    sub: 'Send us a message',        value: 'info@scottishvillaretreat.com', href: 'mailto:info@scottishvillaretreat.com' },
        { icon: 'phone',    label: 'Phone',    sub: 'Call us directly',         value: '+44 (0) 1337 840000',          href: 'tel:+441337840000'                   },
        { icon: 'location', label: 'Location', sub: 'Newburgh, Fife, Scotland', cta: { label: 'Get Directions →', href: 'https://maps.google.com/?q=Newburgh,Fife,Scotland', style: 'outline-white', size: 'sm' } },
      ],
      map: {
        /* ACTION: replace embedUrl with your real Google Maps embed URL
           (maps.google.com → Share → Embed a map → copy iframe src) */
        embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17764!2d-3.2442!3d56.3566!5e0!3m2!1sen!2suk',
        alt:      'Map of Newburgh, Fife, Scotland',
      },
    },
  },

  /* ── Section 15 · Newsletter ───────────────────────────────── */
  {
    type: 'newsletter',
    value: {
      heading:          'Stay in the loop with updates\nNever miss what\'s coming',
      subtitle:         'Get news about special offers, upcoming retreats, and cultural events at the villa.',
      inputPlaceholder: 'Enter your email',
      submitLabel:      'Sign up',
      disclaimer:       'By signing up you agree to our terms and privacy policy.',
    },
  },

];

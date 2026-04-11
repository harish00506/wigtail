import React, { useEffect, useState } from 'react';

import Nav from './components/Nav';
import Footer from './components/Footer';

import Hero from './components/sections/Hero';
import FeatureList from './components/sections/FeatureList';
import Retreat from './components/sections/Retreat';
import Process from './components/sections/Process';
import Amenities from './components/sections/Amenities';
import Family from './components/sections/Family';
import Activities from './components/sections/Activities';
import Hosting from './components/sections/Hosting';
import Escape from './components/sections/Escape';
import Details from './components/sections/Details';
import Place from './components/sections/Place';
import FAQ from './components/sections/FAQ';
import CTAEscape from './components/sections/CTAEscape';
import Contact from './components/sections/Contact';
import Newsletter from './components/sections/Newsletter';

import { fetchHomePage } from './data/wagtailApi';
import { navData, footerData } from './data/content';

const BLOCK_COMPONENTS = {
  hero: Hero,
  feature_list: FeatureList,
  retreat: Retreat,
  process: Process,
  amenities: Amenities,
  family: Family,
  activities: Activities,
  hosting: Hosting,
  escape: Escape,
  details: Details,
  place: Place,
  faq: FAQ,
  cta_escape: CTAEscape,
  contact: Contact,
  newsletter: Newsletter
};

function SectionRenderer({ type, value }) {
  const Component = BLOCK_COMPONENTS[type];

  if (!Component) {
    if (import.meta.env.DEV) {
      console.warn(`[SectionRenderer] No component registered for block type: "${type}"`);
      return (
        <div style={{ padding: '16px', background: '#ffe', border: '1px dashed #c80', fontSize: '13px' }}>
          Unknown StreamField block type: <strong>{type}</strong>
        </div>
      );
    }
    return null;
  }

  return <Component {...(value || {})} />;
}

export default function App() {
  const [body, setBody] = useState([]);
  const [nav, setNav] = useState(navData);
  const [footer, setFooter] = useState(footerData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomePage()
      .then(({ body: pageBody, nav: pageNav, footer: pageFooter }) => {
        setBody(pageBody || []);
        setNav(pageNav?.links ? pageNav : navData);
        setFooter(pageFooter?.navLinks ? pageFooter : footerData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[App] Content fetch failed:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'DM Sans, sans-serif',
          color: '#555',
          fontSize: '14px'
        }}
      >
        Loading...
      </div>
    );
  }

  if (error && body.length === 0) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'DM Sans, sans-serif',
          color: '#d00',
          fontSize: '14px',
          padding: '24px'
        }}
      >
        Could not load page content. {error}
      </div>
    );
  }

  return (
    <>
      <Nav links={nav.links} cta={nav.cta} />

      {body.map((block, i) => (
        <SectionRenderer key={block.id || `block-${i}`} type={block.type} value={block.value} />
      ))}

      <Footer
        navLinks={footer.navLinks}
        socialLinks={footer.socialLinks}
        legalLinks={footer.legalLinks}
        copyright={footer.copyright}
      />
    </>
  );
}
/**
 * src/App.jsx — Root Application Component
 * ════════════════════════════════════════════════════════════════
 * Responsibilities:
 *   1. Fetch page content from Wagtail API on mount (with static fallback)
 *   2. Route each StreamField block type to its React component
 *   3. Render Nav + page sections + Footer
 *
 * WAGTAIL STREAMFIELD ROUTER
 * ──────────────────────────
 * Wagtail API returns a 'body' array where each item has:
 *   { type: 'hero', value: { ... } }
 *   { type: 'feature_list', value: { ... } }
 *   etc.
 *
 * The BLOCK_COMPONENTS map below routes each 'type' string to its
 * React component. To add a new StreamField block:
 *   1. Add the block to wagtail/models.py (see HomePage.body)
 *   2. Create a new component in src/components/sections/
 *   3. Import it here and add to BLOCK_COMPONENTS
 *
 * DATA FLOW
 * ─────────
 * Production:  fetchHomePage() → Wagtail API v2 → JSON → components
 * Development: fetchHomePage() catches error → static content.js fallback
 * ════════════════════════════════════════════════════════════════
 */

import React, { useEffect, useState } from 'react';

/* Layout components */
import Nav    from './components/Nav';
import Footer from './components/Footer';

/* Section components — one per Wagtail StreamField block type */
import Hero        from './components/sections/Hero';
import FeatureList from './components/sections/FeatureList';
import Retreat     from './components/sections/Retreat';
import Process     from './components/sections/Process';
import Amenities   from './components/sections/Amenities';
import Family      from './components/sections/Family';
import Activities  from './components/sections/Activities';
import Hosting     from './components/sections/Hosting';
import Escape      from './components/sections/Escape';
import Details     from './components/sections/Details';
import Place       from './components/sections/Place';
import FAQ         from './components/sections/FAQ';
import CTAEscape   from './components/sections/CTAEscape';
import Contact     from './components/sections/Contact';
import Newsletter  from './components/sections/Newsletter';

/* API utility — fetches from Wagtail, falls back to static content.js */
import { fetchHomePage } from './data/wagtailApi';

/* Static site-level data for Nav + Footer (used as fallback) */
import { navData, footerData } from './data/content';

/* ──────────────────────────────────────────────────────────────
   STREAMFIELD BLOCK → COMPONENT MAP
   Keys match the 'type' values returned by the Wagtail API.
   Adding a new block: add key here + create the component + add
   block to HomePage.body in wagtail/models.py.
────────────────────────────────────────────────────────────── */
const BLOCK_COMPONENTS = {
  hero:         Hero,
  feature_list: FeatureList,
  retreat:      Retreat,
  process:      Process,
  amenities:    Amenities,
  family:       Family,
  activities:   Activities,
  hosting:      Hosting,
  escape:       Escape,
  details:      Details,
  place:        Place,
  faq:          FAQ,
  cta_escape:   CTAEscape,
  contact:      Contact,
  newsletter:   Newsletter,
};

/* ──────────────────────────────────────────────────────────────
   SectionRenderer
   Receives a single StreamField block { type, value } and renders
   the matching component with the value object spread as props.
   Unknown block types render a dev warning div (not visible in prod).
────────────────────────────────────────────────────────────── */
function SectionRenderer({ type, value }) {
  const Component = BLOCK_COMPONENTS[type];

  if (!Component) {
    /* Unknown block type — log a warning in dev, render nothing in prod */
    if (import.meta.env.DEV) {
      console.warn(`[SectionRenderer] No component registered for block type: "${type}"`);
      return (
        <div style={{ padding: '16px', background: '#ffe', border: '1px dashed #c80', fontSize: '13px' }}>
          ⚠️ Unknown StreamField block type: <strong>{type}</strong>
        </div>
      );
    }
    return null;
  }

  /* Spread the Wagtail 'value' object as individual props to the component */
  return <Component {...value} />;
}

/* ──────────────────────────────────────────────────────────────
   App — root component
────────────────────────────────────────────────────────────── */
export default function App() {
  /* page.body = array of { type, value } StreamField blocks */
  const [body,   setBody]   = useState([]);
  /* nav + footer data from Wagtail or static fallback */
  const [nav,    setNav]    = useState(navData);
  const [footer, setFooter] = useState(footerData);
  /* loading / error state for rendering feedback */
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    /* Fetch page content from Wagtail API (or static fallback) */
    fetchHomePage()
      .then(({ body: pageBody, nav: pageNav, footer: pageFooter }) => {
        setBody(pageBody   || []);
        setNav(pageNav?.links ? pageNav : navData);           /* use nav from API if available */
        setFooter(pageFooter?.navLinks ? pageFooter : footerData); /* use footer from API if available */
        setLoading(false);
      })
      .catch((err) => {
        console.error('[App] Content fetch failed:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  /* ── Loading state ── */
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', color: '#555', fontSize: '14px' }}>
        Loading…
      </div>
    );
  }

  /* ── Error state (only if fetch AND fallback both failed) ── */
  if (error && body.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', color: '#d00', fontSize: '14px', padding: '24px' }}>
        Could not load page content. {error}
      </div>
    );
  }

  return (
    <>
      {/* ── Fixed navigation bar ── */}
      <Nav links={nav.links} cta={nav.cta} />

      {/* ── StreamField body ──
          Each block in 'body' is routed to its React component via
          BLOCK_COMPONENTS. The 'id' field from Wagtail (if present) is
          used as the React key; falls back to array index. */}
      {body.map((block, i) => (
        <SectionRenderer
          key={block.id || `block-${i}`}
          type={block.type}
          value={block.value}
        />
      ))}

      {/* ── Site footer ── */}
      <Footer
        navLinks={footer.navLinks}
        socialLinks={footer.socialLinks}
        legalLinks={footer.legalLinks}
        copyright={footer.copyright}
      />
    </>
  );
}

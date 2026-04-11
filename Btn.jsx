/**
 * src/components/Btn.jsx — Shared Button Component
 * ──────────────────────────────────────────────────────────────
 * Renders any of the 6 button variants from the design system.
 * Maps the 'style' string (from content.js / Wagtail) to the
 * correct CSS modifier class defined in src/styles/main.css.
 *
 * STYLE → CSS CLASS MAP
 * ─────────────────────
 *   'outline-white'     → .btn.btn--outline-white    (on blue bg)
 *   'outline-dark'      → .btn.btn--outline-dark     (on white/light-blue bg)
 *   'primary-blue'      → .btn.btn--primary-blue     (main conversions)
 *   'primary'           → .btn.btn--primary          (nav Book only)
 *   'text-arrow'        → .btn.btn--text-arrow       (on white/light-blue bg)
 *   'text-arrow-white'  → .btn--text-arrow-white     (on blue bg, no .btn base)
 *
 * SIZE MODIFIER
 * ─────────────
 *   size="sm" → adds .btn--sm (smaller padding + font)
 *
 * USAGE
 * ─────
 *   <Btn href="#book" style="primary-blue">Book</Btn>
 *   <Btn href="#explore" style="outline-dark">Explore</Btn>
 *   <Btn href="#more" style="text-arrow-white">Learn More →</Btn>
 *   <Btn href="#directions" style="outline-white" size="sm">Get Directions →</Btn>
 * ──────────────────────────────────────────────────────────────
 */

import React from 'react';

/* Maps style prop → CSS className string */
const styleMap = {
  'outline-white':    'btn btn--outline-white',
  'outline-dark':     'btn btn--outline-dark',
  'primary-blue':     'btn btn--primary-blue',
  'primary':          'btn btn--primary',
  'text-arrow':       'btn btn--text-arrow',
  /* text-arrow-white does NOT use the .btn base class */
  'text-arrow-white': 'btn--text-arrow-white',
};

/**
 * Btn — renders an <a> tag styled as a button.
 *
 * @param {object}  props
 * @param {string}  props.href        — link target
 * @param {string}  props.style       — one of the keys in styleMap above
 * @param {string}  [props.size]      — 'sm' adds .btn--sm modifier
 * @param {string}  [props.className] — extra classes if needed
 * @param {boolean} [props.external]  — adds target="_blank" rel="noopener"
 * @param {node}    props.children    — button label
 */
export default function Btn({ href, style = 'outline-dark', size, className = '', external, children }) {
  /* Build the className string from the style map + optional size modifier */
  const base   = styleMap[style] || 'btn btn--outline-dark';
  const sm     = size === 'sm' ? ' btn--sm' : '';
  const extra  = className ? ` ${className}` : '';
  const cls    = `${base}${sm}${extra}`;

  const extProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a href={href} className={cls} {...extProps}>
      {children}
    </a>
  );
}

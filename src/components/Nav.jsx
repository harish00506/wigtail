import React from 'react';

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 3c-4 2-6 6-6 9a6 6 0 0 0 12 0c0-3-2-7-6-9z" fill="currentColor" />
      <path d="M12 6v10" stroke="#fff" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

export default function Nav({ links = [], cta = { label: 'Book', href: '#book' } }) {
  return (
    <nav className="nav" aria-label="Main navigation">
      <a className="nav__logo" href="#top" aria-label="Furze Farmhouse home">
        <span className="nav__logo-icon">
          <LogoMark />
        </span>
        <span className="nav__logo-name">
          <span>Furze</span>
          <span>Farmhouse</span>
        </span>
      </a>

      <ul className="nav__links">
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <a className={link.hasDropdown ? 'nav__more' : ''} href={link.href || '#'}>
              {link.label}
              {link.hasDropdown ? (
                <span className="nav__more-chevron" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" strokeWidth="1.8" />
                  </svg>
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>

      <a className="nav__book" href={cta?.href || '#book'}>
        {cta?.label || 'Book'}
      </a>
    </nav>
  );
}

import React from 'react';
import { SocialIcon } from './icons';

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 3c-4 2-6 6-6 9a6 6 0 0 0 12 0c0-3-2-7-6-9z" fill="currentColor" />
      <path d="M12 6v10" stroke="#fff" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

export default function Footer({ navLinks = [], socialLinks = [], legalLinks = [], copyright = '' }) {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__logo">
          <span className="footer__logo-icon">
            <LogoMark />
          </span>
          <span className="footer__logo-name">
            <span>Furze</span>
            <span>Farmhouse</span>
          </span>
        </div>

        <nav className="footer__nav" aria-label="Footer links">
          {navLinks.map((link) => (
            <a key={`${link.label}-${link.href}`} href={link.href || '#'}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__social" aria-label="Social links">
          {socialLinks.map((item) => (
            <a key={`${item.platform}-${item.href}`} href={item.href || '#'} aria-label={item.ariaLabel || item.platform}>
              <SocialIcon platform={item.platform} />
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">{copyright}</p>
        <div className="footer__legal">
          {legalLinks.map((link, index) => (
            <React.Fragment key={`${link.label}-${link.href}`}>
              {index > 0 ? ' | ' : ''}
              <a href={link.href || '#'}>{link.label}</a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}

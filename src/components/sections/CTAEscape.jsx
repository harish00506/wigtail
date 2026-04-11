import React from 'react';
import Btn from '../Btn';

export default function CTAEscape({ heading, subtitle, ctas = [], image }) {
  return (
    <section className="cta-escape" id="book">
      <div className="cta-escape__inner">
        {heading ? <h2 className="cta-escape__heading">{heading}</h2> : null}
        {subtitle ? <p className="cta-escape__subtitle">{subtitle}</p> : null}

        <div className="cta-escape__ctas">
          {ctas.map((cta) => (
            <Btn key={`${cta.label}-${cta.href}`} href={cta.href || '#'} style={cta.style || 'primary-blue'}>
              {cta.label}
            </Btn>
          ))}
        </div>

        {image?.src ? <img className="cta-escape__image" src={image.src} alt={image.alt || heading || 'Bedroom image'} loading="lazy" /> : null}
      </div>
    </section>
  );
}

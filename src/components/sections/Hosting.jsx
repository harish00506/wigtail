import React from 'react';
import Btn from '../Btn';

export default function Hosting({ tag, heading, subtitle, ctas = [], image, accordionItems = [] }) {
  return (
    <section className="hosting" id="hosting">
      <div className="hosting__header">
        {tag ? <p className="hosting__tag">{tag}</p> : null}
        {heading ? <h2 className="hosting__heading">{heading}</h2> : null}
        {subtitle ? <p className="hosting__subtitle">{subtitle}</p> : null}

        <div className="hosting__ctas">
          {ctas.map((cta) => (
            <Btn key={`${cta.label}-${cta.href}`} href={cta.href || '#'} style={cta.style || 'outline-white'}>
              {cta.label}
            </Btn>
          ))}
        </div>
      </div>

      <div className="hosting__split">
        {image?.src ? <img className="hosting__image" src={image.src} alt={image.alt || heading || 'Hosting image'} loading="lazy" /> : null}

        <div>
          {accordionItems.map((item, index) => (
            <article className="hosting__accordion-item" key={`${item.heading}-${index}`}>
              <h3 className="hosting__accordion-heading">{item.heading}</h3>
              <p className="hosting__accordion-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

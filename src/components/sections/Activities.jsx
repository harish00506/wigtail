import React from 'react';
import Btn from '../Btn';

export default function Activities({ tag, heading, subtitle, cards = [], footerCta }) {
  return (
    <section className="activities" id="activities">
      <div className="activities__inner">
        {tag ? <p className="activities__tag">{tag}</p> : null}
        {heading ? <h2 className="activities__heading">{heading}</h2> : null}
        {subtitle ? <p className="activities__subtitle">{subtitle}</p> : null}

        <div className="activities__grid">
          {cards.map((card, index) => (
            <article key={`${card.heading}-${index}`}>
              {card.image?.src ? (
                <img className="activities__card-img" src={card.image.src} alt={card.image.alt || card.heading || 'Activity image'} loading="lazy" />
              ) : null}
              {card.heading ? <h3 className="activities__card-heading">{card.heading}</h3> : null}
              {card.body ? <p className="activities__card-body">{card.body}</p> : null}
            </article>
          ))}
        </div>

        {footerCta?.label ? (
          <p className="activities__footer">
            <Btn href={footerCta.href || '#'} style={footerCta.style || 'outline-dark'}>
              {footerCta.label}
            </Btn>
          </p>
        ) : null}
      </div>
    </section>
  );
}

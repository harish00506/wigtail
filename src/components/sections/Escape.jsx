import React from 'react';
import Btn from '../Btn';

export default function Escape({ tag, heading, subtitle, ctas = [], image, listItems = [] }) {
  return (
    <section className="escape" id="surroundings">
      <div className="escape__header">
        {tag ? <p className="escape__tag">{tag}</p> : null}
        {heading ? <h2 className="escape__heading">{heading}</h2> : null}
        {subtitle ? <p className="escape__subtitle">{subtitle}</p> : null}

        <div className="escape__ctas">
          {ctas.map((cta) => (
            <Btn key={`${cta.label}-${cta.href}`} href={cta.href || '#'} style={cta.style || 'outline-dark'}>
              {cta.label}
            </Btn>
          ))}
        </div>
      </div>

      <div className="escape__split">
        {image?.src ? <img className="escape__image" src={image.src} alt={image.alt || heading || 'Escape image'} loading="lazy" /> : null}

        <div>
          {listItems.map((item, index) => (
            <article className="escape__list-item" key={`${item.heading}-${index}`}>
              <h3 className="escape__list-heading">{item.heading}</h3>
              <p className="escape__list-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

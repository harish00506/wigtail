import React from 'react';
import Btn from '../Btn';
import { RetreatIcon } from '../icons';

export default function Retreat({ tag, heading, body, subFeatures = [], ctas = [], image }) {
  return (
    <section className="retreat" id="services">
      <div className="retreat__inner">
        <div>
          {tag ? <p className="retreat__tag">{tag}</p> : null}
          {heading ? <h2 className="retreat__heading">{heading}</h2> : null}
          {body ? <p className="retreat__body">{body}</p> : null}

          <div className="retreat__sub-features">
            {subFeatures.map((item, index) => (
              <article key={`${item.label}-${index}`}>
                <div className="retreat__sub-feature-icon">
                  <RetreatIcon name={item.icon} />
                </div>
                <h3 className="retreat__sub-feature-label">{item.label}</h3>
                <p className="retreat__sub-feature-desc">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="feature__ctas">
            {ctas.map((cta) => (
              <Btn key={`${cta.label}-${cta.href}`} href={cta.href || '#'} style={cta.style || 'outline-dark'}>
                {cta.label}
              </Btn>
            ))}
          </div>
        </div>

        {image?.src ? <img className="retreat__image" src={image.src} alt={image.alt || heading || 'Retreat image'} loading="lazy" /> : null}
      </div>
    </section>
  );
}

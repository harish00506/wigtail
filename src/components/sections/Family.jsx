import React from 'react';
import Btn from '../Btn';

export default function Family({ tag, heading, body, stats = [], cta, image }) {
  return (
    <section className="family" id="grounds">
      <div className="family__inner">
        {image?.src ? <img className="family__image" src={image.src} alt={image.alt || heading || 'Family section image'} loading="lazy" /> : null}

        <div>
          {tag ? <p className="family__tag">{tag}</p> : null}
          {heading ? <h2 className="family__heading">{heading}</h2> : null}
          {body ? <p className="family__body">{body}</p> : null}

          <div className="family__stats">
            {stats.map((stat, index) => (
              <article key={`${stat.value}-${index}`}>
                <p className="family__stat-value">{stat.value}</p>
                <p className="family__stat-label">{stat.label}</p>
              </article>
            ))}
          </div>

          {cta?.label ? (
            <Btn href={cta.href || '#'} style={cta.style || 'text-arrow'}>
              {cta.label}
            </Btn>
          ) : null}
        </div>
      </div>
    </section>
  );
}

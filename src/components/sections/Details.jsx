import React from 'react';
import Btn from '../Btn';

export default function Details({ tag, heading, subtitle, stats = [], cta }) {
  return (
    <section className="details" id="details">
      <div className="details__inner">
        {tag ? <p className="details__tag">{tag}</p> : null}
        {heading ? <h2 className="details__heading">{heading}</h2> : null}
        {subtitle ? <p className="details__subtitle">{subtitle}</p> : null}

        <div className="details__stats">
          {stats.map((stat, index) => (
            <article className="details__stat-box" key={`${stat.label}-${index}`}>
              <p className="details__stat-value">{stat.value}</p>
              <p className="details__stat-label">{stat.label}</p>
              {stat.description ? <p className="details__stat-desc">{stat.description}</p> : null}
            </article>
          ))}
        </div>

        {cta?.label ? (
          <Btn href={cta.href || '#'} style={cta.style || 'outline-white'}>
            {cta.label}
          </Btn>
        ) : null}
      </div>
    </section>
  );
}

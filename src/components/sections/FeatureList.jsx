import React from 'react';
import Btn from '../Btn';

export default function FeatureList({ items = [] }) {
  return (
    <section className="features" id="explore-villa">
      {items.map((item) => (
        <article className="feature" key={item.id || item.heading}>
          <div className="feature__image-wrap">
            {item.image?.src ? (
              <img src={item.image.src} alt={item.image.alt || item.heading || 'Feature image'} loading="lazy" />
            ) : (
              <div className="feature__img-placeholder">Image unavailable</div>
            )}
          </div>

          <div className="feature__text">
            {item.tag ? <p className="feature__tag">{item.tag}</p> : null}
            {item.heading ? <h2 className="feature__heading">{item.heading}</h2> : null}
            {item.body ? <p className="feature__body">{item.body}</p> : null}
            <div className="feature__ctas">
              {(item.ctas || []).map((cta) => (
                <Btn key={`${cta.label}-${cta.href}`} href={cta.href || '#'} style={cta.style || 'outline-dark'}>
                  {cta.label}
                </Btn>
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

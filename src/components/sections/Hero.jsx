import React from 'react';
import Btn from '../Btn';

export default function Hero({ image, heading, body, ctas = [] }) {
  return (
    <section className="hero" id="top">
      <div className="hero__image-fallback" />
      {image?.src ? <img className="hero__image" src={image.src} alt={image.alt || heading || 'Hero image'} loading="eager" /> : null}
      <div className="hero__overlay" />

      <div className="hero__content">
        {heading ? <h1 className="hero__heading">{heading}</h1> : null}
        {body ? <p className="hero__body">{body}</p> : null}
        <div className="hero__ctas">
          {ctas.map((cta) => (
            <Btn key={`${cta.label}-${cta.href}`} href={cta.href || '#'} style={cta.style || 'outline-white'}>
              {cta.label}
            </Btn>
          ))}
        </div>
      </div>
    </section>
  );
}

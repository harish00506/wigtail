import React from 'react';

export default function Place({ tag, heading, subtitle, locations = [], image }) {
  return (
    <section className="place" id="local-area">
      <div className="place__inner">
        {tag ? <p className="place__tag">{tag}</p> : null}
        {heading ? <h2 className="place__heading">{heading}</h2> : null}
        {subtitle ? <p className="place__subtitle">{subtitle}</p> : null}

        <div className="place__split">
          <div className="place__locations">
            {locations.map((location, index) => (
              <article key={`${location.name}-${index}`}>
                <h3 className="place__location-heading">{location.name}</h3>
                <p className="place__location-address">{location.address}</p>
                <a className="place__location-link" href={location.linkHref || '#'}>
                  {location.linkLabel || 'Learn more'}
                </a>
              </article>
            ))}
          </div>

          {image?.src ? <img className="place__image" src={image.src} alt={image.alt || heading || 'Place image'} loading="lazy" /> : null}
        </div>
      </div>
    </section>
  );
}

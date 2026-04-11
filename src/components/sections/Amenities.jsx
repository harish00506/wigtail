import React from 'react';
import Btn from '../Btn';
import { AmenityIcon } from '../icons';

export default function Amenities({ tag, heading, subtitle, items = [], footerCta }) {
  return (
    <section className="amenities" id="amenities">
      <div className="amenities__inner">
        {tag ? <p className="amenities__tag">{tag}</p> : null}
        {heading ? <h2 className="amenities__heading">{heading}</h2> : null}
        {subtitle ? <p className="amenities__subtitle">{subtitle}</p> : null}

        <div className="amenities__grid">
          {items.map((item, index) => (
            <article key={`${item.heading}-${index}`}>
              <div className="amenities__item-icon">
                <AmenityIcon name={item.icon} />
              </div>
              {item.heading ? <h3 className="amenities__item-heading">{item.heading}</h3> : null}
              {item.body ? <p className="amenities__item-body">{item.body}</p> : null}
              {item.note ? <p className="amenities__item-note">{item.note}</p> : null}
              {item.cta?.label ? (
                <Btn href={item.cta.href || '#'} style={item.cta.style || 'outline-white'}>
                  {item.cta.label}
                </Btn>
              ) : null}
            </article>
          ))}
        </div>

        {footerCta?.label ? (
          <Btn href={footerCta.href || '#'} style={footerCta.style || 'text-arrow-white'}>
            {footerCta.label}
          </Btn>
        ) : null}
      </div>
    </section>
  );
}

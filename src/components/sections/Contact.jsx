import React from 'react';
import Btn from '../Btn';
import { ContactIcon } from '../icons';

export default function Contact({ tag, heading, subtitle, contactItems = [], map }) {
  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div>
          {tag ? <p className="contact__tag">{tag}</p> : null}
          {heading ? <h2 className="contact__heading">{heading}</h2> : null}
          {subtitle ? <p className="contact__subtitle">{subtitle}</p> : null}

          <div className="contact__items">
            {contactItems.map((item, index) => (
              <article key={`${item.label}-${index}`}>
                <div className="contact__item-icon">
                  <ContactIcon name={item.icon} />
                </div>
                <h3 className="contact__item-label">{item.label}</h3>
                {item.sub ? <p className="contact__item-sub">{item.sub}</p> : null}

                {item.cta?.label ? (
                  <Btn href={item.cta.href || '#'} style={item.cta.style || 'outline-white'} size={item.cta.size} external>
                    {item.cta.label}
                  </Btn>
                ) : item.value ? (
                  <a className="contact__item-link" href={item.href || '#'}>
                    {item.value}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        <div className="contact__map">
          {map?.embedUrl ? (
            <iframe title={map.alt || 'Map'} src={map.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : null}
        </div>
      </div>
    </section>
  );
}

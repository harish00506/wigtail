import React, { useMemo, useState } from 'react';
import Btn from '../Btn';

export default function FAQ({ heading, subtitle, items = [], footerCta }) {
  const firstOpenIndex = useMemo(() => {
    const idx = items.findIndex((item) => item.defaultOpen);
    return idx >= 0 ? idx : items.length > 0 ? 0 : -1;
  }, [items]);

  const [openIndex, setOpenIndex] = useState(firstOpenIndex);

  return (
    <section className="faq" id="more">
      <div className="faq__inner">
        {heading ? <h2 className="faq__heading">{heading}</h2> : null}
        {subtitle ? <p className="faq__subtitle">{subtitle}</p> : null}

        <div>
          {items.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <article className={`faq__item ${isOpen ? 'is-open' : ''}`} key={`${item.question}-${index}`}>
                <button
                  type="button"
                  className="faq__question"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="faq__chevron" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" strokeWidth="1.8" />
                    </svg>
                  </span>
                </button>
                <p className="faq__answer">{item.answer}</p>
              </article>
            );
          })}
        </div>

        {footerCta?.heading || footerCta?.cta?.label ? (
          <div className="faq__still">
            {footerCta?.heading ? <h3 className="faq__still-heading">{footerCta.heading}</h3> : null}
            {footerCta?.body ? <p className="faq__still-body">{footerCta.body}</p> : null}
            {footerCta?.cta?.label ? (
              <Btn href={footerCta.cta.href || '#'} style={footerCta.cta.style || 'primary-blue'}>
                {footerCta.cta.label}
              </Btn>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

import React from 'react';

export default function Process({ tag, heading, subtitle, steps = [] }) {
  return (
    <section className="process">
      <div className="process__container">
        {tag ? <p className="process__tag">{tag}</p> : null}
        {heading ? <h2 className="process__heading">{heading}</h2> : null}
        {subtitle ? <p className="process__subtitle">{subtitle}</p> : null}

        <div className="process__steps">
          {steps.map((step, index) => (
            <article className="process__step" key={`${step.number}-${index}`}>
              {step.image?.src ? (
                <img className="process__step-img" src={step.image.src} alt={step.image.alt || step.heading || 'Process image'} loading="lazy" />
              ) : null}
              <div className="process__step-overlay" />
              <div className="process__step-content">
                {step.number ? <p className="process__step-number">{step.number}</p> : null}
                {step.heading ? <h3 className="process__step-heading">{step.heading}</h3> : null}
                {step.subline ? <p className="process__step-subline">{step.subline}</p> : null}
                {step.cta?.label ? (
                  <a className="process__step-cta" href={step.cta.href || '#'}>
                    {step.cta.label}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

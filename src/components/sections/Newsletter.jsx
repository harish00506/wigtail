import React, { useState } from 'react';

export default function Newsletter({ heading, subtitle, inputPlaceholder = 'Enter your email', submitLabel = 'Sign up', disclaimer }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) {
      setMessage('Please enter an email address.');
      return;
    }

    setMessage('Thanks. We have received your email.');
    setEmail('');
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter__inner">
        {heading ? <h2 className="newsletter__heading">{heading}</h2> : null}
        {subtitle ? <p className="newsletter__subtitle">{subtitle}</p> : null}

        <form className="newsletter__form" onSubmit={handleSubmit}>
          <input
            className="newsletter__input"
            type="email"
            placeholder={inputPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-label="Email"
          />
          <button className="newsletter__submit" type="submit">
            {submitLabel}
          </button>
        </form>

        {disclaimer ? <p className="newsletter__note">{disclaimer}</p> : null}
        {message ? <p className="newsletter__note" style={{ marginTop: '6px' }}>{message}</p> : null}
      </div>
    </section>
  );
}

import React from 'react';

function BaseIcon({ children, stroke = 'currentColor', fill = 'none' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill={fill} stroke={stroke}>
      {children}
    </svg>
  );
}

export function RetreatIcon({ name }) {
  if (name === 'hot-tub') {
    return (
      <BaseIcon>
        <path d="M3 12h18" strokeWidth="1.8" />
        <path d="M5 12v3a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3" strokeWidth="1.8" />
        <path d="M8 8c0-1 1-1.5 1-2.5S8 4 8 3" strokeWidth="1.6" />
        <path d="M12 8c0-1 1-1.5 1-2.5S12 4 12 3" strokeWidth="1.6" />
        <path d="M16 8c0-1 1-1.5 1-2.5S16 4 16 3" strokeWidth="1.6" />
      </BaseIcon>
    );
  }

  return (
    <BaseIcon>
      <path d="M4 18h16" strokeWidth="1.8" />
      <path d="M6 18V9l6-4 6 4v9" strokeWidth="1.8" />
      <path d="M12 5v13" strokeWidth="1.8" />
    </BaseIcon>
  );
}

export function AmenityIcon({ name }) {
  if (name === 'kitchen') {
    return (
      <BaseIcon>
        <rect x="4" y="5" width="7" height="14" strokeWidth="1.6" />
        <rect x="13" y="10" width="7" height="9" strokeWidth="1.6" />
        <path d="M6 8h3" strokeWidth="1.6" />
        <path d="M15 13h3" strokeWidth="1.6" />
      </BaseIcon>
    );
  }

  if (name === 'outdoor') {
    return (
      <BaseIcon>
        <path d="M12 3v18" strokeWidth="1.7" />
        <path d="M6 9h12" strokeWidth="1.7" />
        <path d="M6 15h12" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
      </BaseIcon>
    );
  }

  if (name === 'location') {
    return (
      <BaseIcon>
        <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" strokeWidth="1.6" />
        <circle cx="12" cy="10" r="2.5" strokeWidth="1.6" />
      </BaseIcon>
    );
  }

  return (
    <BaseIcon>
      <rect x="5" y="6" width="14" height="12" rx="2" strokeWidth="1.6" />
      <path d="M5 10h14" strokeWidth="1.6" />
      <path d="M9 6V4" strokeWidth="1.6" />
      <path d="M15 6V4" strokeWidth="1.6" />
    </BaseIcon>
  );
}

export function ContactIcon({ name }) {
  if (name === 'email') {
    return (
      <BaseIcon>
        <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.6" />
        <path d="M4 8l8 6 8-6" strokeWidth="1.6" />
      </BaseIcon>
    );
  }

  if (name === 'phone') {
    return (
      <BaseIcon>
        <path d="M7 4h4l1 4-2 1a13 13 0 0 0 5 5l1-2 4 1v4a2 2 0 0 1-2 2A14 14 0 0 1 5 6a2 2 0 0 1 2-2z" strokeWidth="1.4" />
      </BaseIcon>
    );
  }

  return (
    <BaseIcon>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" strokeWidth="1.6" />
      <circle cx="12" cy="10" r="2.5" strokeWidth="1.6" />
    </BaseIcon>
  );
}

export function SocialIcon({ platform }) {
  const letter = (platform || '?').slice(0, 1).toUpperCase();
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#3366dd" fontWeight="700" fontFamily="Arial, sans-serif">
        {letter}
      </text>
    </svg>
  );
}

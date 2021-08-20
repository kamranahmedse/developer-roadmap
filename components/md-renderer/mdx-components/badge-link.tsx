import React from 'react';

type BadgeLinkType = {
  target: string;
  variant: string;
  badgeText: string;
  href: string;
  children: React.ReactNode
};

export function BadgeLink(props: BadgeLinkType) {
  const { target = '_blank', variant = 'success', badgeText, href, children } = props;

  return (
    <p className='mb-0'>
      <a href={href} target={target}>
        <span style={{ position: 'relative', top: '-2px' }}
              className={`badge badge-${variant}`}>{badgeText}</span> {children}
      </a>
    </p>
  );
}

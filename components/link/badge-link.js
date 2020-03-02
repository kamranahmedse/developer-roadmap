export function BadgeLink({ target='_blank', variant ='success', badgeText, href, children }) {
  return (
    <p className='mb-0'>
      <a href={href} target={ target }>
        <span style={{ position: 'relative', top: '-2px'}} className={`badge badge-${variant}`}>{badgeText}</span> { children }
      </a>
    </p>
  );
}

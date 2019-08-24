import Link from 'next/link';

const Header = () => (
  <div>
    <Link href="/">
      <a title="Homepage">Home</a>
    </Link>
    &nbsp; |&nbsp;
    <Link href="/about">
      <a title="About Page">About Page</a>
    </Link>
  </div>
);

export default Header;
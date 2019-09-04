import './style.scss';

const Header = () => (
  <div className='page-header'>
    <div className="d-flex">
      <div className="flex-grow-1 brand">
        <a href="#">roadmap.sh</a>
      </div>
      <div className="nav-links">
        <a href="#">Roadmaps</a>
        <a href="#">Articles</a>
        <a href="#">Journeys</a>
        <a href="#">FAQs</a>
        <a href="#" className='signup'>Sign Up</a>
      </div>
    </div>
  </div>
);

export default Header;
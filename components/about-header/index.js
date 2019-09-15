import './style.scss';

const AboutHeader = () => (
  <div className='about-header'>
    <div className="container">
      <h2>Hello, I'm Kamran Ahmed.</h2>
      <p>I created <span className='flow-black'>roadmap.sh</span> to help people grow their careers.</p>

      <img className='author-img' src="/static/kamran.jpeg" alt="" />
    </div>
  </div>
);

export default AboutHeader;
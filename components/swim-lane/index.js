import './style.scss';

const SwimLane = (props) => (
  <div className="lane-wrap bg-light">
    <div className="container">
      <div className="lane-head">
        <h3>Featured Roadmaps</h3>
        <p>List of roadmaps mostly visited by the community. There are <a href="#">more roadmaps also</a>.</p>
      </div>
      <div className={ `swim-lane ${props.className}` }>
        <a className="lane-item" href='#'>
          <h4>Frontend Developer</h4>
          <p>Step by step guide to becoming a modern frontend developer in 2019</p>
        </a>
        <a className="lane-item" href='#'>
          <h4>Backend Developer</h4>
          <p>Step by step guide to becoming a modern backend developer in 2019</p>
        </a>
        <a className="lane-item" href='#'>
          <h4>DevOps Roadmap</h4>
          <p>Step by step guide to become an SRE or for any operations role</p>
        </a>
      </div>
    </div>
  </div>
);

SwimLane.defaultProps = {
  className: '',
};

export default SwimLane;
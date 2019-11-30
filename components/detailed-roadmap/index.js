import { Sidebar, Summary, SummaryContainer } from './style';

const DetailedRoadmap = ({ roadmap }) => {
  const RoadmapPages = Object.keys(roadmap.sidebar || {}).map(groupTitle => {
    return (
      <div className='links-group'>
        <h3>{ groupTitle }</h3>
        <ul>
          { roadmap.sidebar[groupTitle].map(page => {
            return (
              <li>
                <a href={ page.url }>
                  <span className="bullet"></span>
                  { page.title }
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });

  return (
    <SummaryContainer className="border-top">
      <Summary className="container text-left">
        <Sidebar className="sidebar">
          { RoadmapPages }
        </Sidebar>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae blanditiis commodi, consequatur, dicta distinctio esse et id, ipsa labore libero nisi odit placeat possimus saepe sed vel vitae voluptate?</p>
        </div>
      </Summary>
    </SummaryContainer>
  )
};

export default DetailedRoadmap;

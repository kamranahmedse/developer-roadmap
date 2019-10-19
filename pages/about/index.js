import AboutHeader from '../../components/about-header';
import PageFooter from '../../components/page-footer';
import PageHeader from '../../components/page-header';
import { FaqContainer } from './style';
import DefaultLayout from '../../layouts/default';

const About = () => (
  <DefaultLayout>
    <PageHeader />
    <AboutHeader />
    <FaqContainer className='border-top border-bottom bg-light'>
      <div className="faq-item">
        <div className="container container-small">
          <h4 className='font-weight-bolder'>What is roadmap.sh?</h4>
          <p>Roadmap.sh is the community curated roadmaps and paths for the budding developers. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda iure maiores nemo nihil odio perspiciatis recusandae repellendus sed vero. Adipisci consectetur esse explicabo illum natus neque perferendis quis ullam.</p>
          <p>If you really want to Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores commodi consequatur, culpa cumque dolorum, eos hic illo obcaecati odit quam quod reiciendis, rem reprehenderit saepe sed tempore tenetur vitae!</p>
        </div>
      </div>
      <div className="faq-item">
        <div className="container container-small">
          <h4 className="font-weight-bolder">What are the plans for roadmap.sh?</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore eaque eius esse, facere id ipsum, minima nam, nisi quos reprehenderit saepe tempora vitae voluptate. Atque deleniti dolores eos laboriosam repellat.</p>
        </div>
      </div>
      <div className="faq-item">
        <div className="container container-small">
          <h4 className="font-weight-bolder">What is the source of revenue?</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur, harum impedit numquam porro quod unde! Aperiam dolorum ducimus expedita fugiat, impedit nesciunt, quaerat qui recusandae repellendus tenetur ut voluptatibus!</p>
        </div>
      </div>
      <div className="faq-item">
        <div className="container container-small">
          <h4 className="font-weight-bolder">Can I contribute?</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur, harum impedit numquam porro quod unde! Aperiam dolorum ducimus expedita fugiat, impedit nesciunt, quaerat qui recusandae repellendus tenetur ut voluptatibus!</p>
        </div>
      </div>
    </FaqContainer>
    <PageFooter />
  </DefaultLayout>
);

export default About;
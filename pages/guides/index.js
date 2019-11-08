import DefaultLayout from 'layouts/default/index';
import SiteNav from 'components/site-nav';
import PageHeader from 'components/page-header';
import PageFooter from 'components/page-footer';

const Roadmap = () => (
  <DefaultLayout>
    <SiteNav />
    <PageHeader
      title="Guides"
      subtitle="Community written guides, <a href='/signup'>subscribe to get new guides</a>"
    />
    <div className="border-top bg-light">
      <div className="container">
        <p>Show all guides here</p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis eaque mollitia nobis perferendis perspiciatis, quas sed vitae. Ad commodi culpa dolorum id iusto natus nesciunt quam ratione repudiandae sed? Ab!
      </div>
    </div>
    <PageFooter />
  </DefaultLayout>
);

export default Roadmap;

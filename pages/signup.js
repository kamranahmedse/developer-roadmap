import DefaultLayout from 'layouts/default';
import PageFooter from 'components/page-footer';
import SiteNav from 'components/site-nav';
import SignUpForm from 'components/signup-form';
import Helmet from 'components/helmet';

const SignUp = () => (
  <DefaultLayout>
    <Helmet />
    <SiteNav />
    <SignUpForm />
    <PageFooter />
  </DefaultLayout>
);

export default SignUp;

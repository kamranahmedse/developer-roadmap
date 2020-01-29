import DefaultLayout from 'layouts/default';
import PageFooter from 'components/page-footer';
import SiteNav from 'components/site-nav';
import SignUpForm from 'components/signup-form';
import Helmet from 'components/helmet';

const SignUp = () => (
  <DefaultLayout>
    <Helmet title={'Sign Up: Be a part of the community'} />
    <SiteNav />
    <SignUpForm />
    <PageFooter />
  </DefaultLayout>
);

export default SignUp;

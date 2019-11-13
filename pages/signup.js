import DefaultLayout from 'layouts/default';
import PageFooter from 'components/page-footer';
import SiteNav from 'components/site-nav';
import SignUpForm from 'components/signup-form';

const SignUp = () => (
  <DefaultLayout>
    <SiteNav />
    <SignUpForm />
    <PageFooter />
  </DefaultLayout>
);

export default SignUp;

import DefaultLayout from 'layouts/default';
import PageFooter from 'components/page-footer';
import SiteNav from 'components/site-nav';

const SignUp = () => (
  <DefaultLayout>
    <SiteNav />
    <div className="container">
      <div className="text-center" style={{ maxWidth: '400px', margin: '200px auto'}}>
        <h1 className="font-weight-bolder">Sign Up</h1>
        <p>You have caught us before we are ready, enter your email below and we will notify you once you are in</p>
        <input type="text" className="form-control" />
        <button className="btn btn-dark btn-block mb-5 mt-2">Subscribe</button>
      </div>
    </div>
    <PageFooter />
  </DefaultLayout>
);

export default SignUp;

import { SignUpWrap, Title, Subtitle, Textbox, Button } from './style';

const SignUpForm = () => (
  <SignUpWrap>
    <Title>Subscribe</Title>
    <Subtitle>You have caught us before we are ready, enter your email below and we will keep you posted</Subtitle>
    <Textbox type="text" placeholder="Your email" />
    <Button>Subscribe</Button>
  </SignUpWrap>
);

export default SignUpForm;

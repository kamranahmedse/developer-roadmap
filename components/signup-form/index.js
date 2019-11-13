import { SignUpWrap, Title, Subtitle, Textbox, Button } from './style';

const SignUpForm = () => (
  <SignUpWrap>
    <Title>Subscribe</Title>
    <Subtitle>You have caught us before we are ready, enter your email below and we will keep you posted</Subtitle>
    <form action="https://kamranahmed.us9.list-manage.com/subscribe/post?u=6f57b741a6a939744f1f203a0&amp;id=f9ca4d6aee" target="_blank" method="post">
      <Textbox type="email" name="EMAIL" required placeholder="Your email" />
      <div style={{position: 'absolute', left: '-5000px'}}>
        <input type="text" name="b_6f57b741a6a939744f1f203a0_f9ca4d6aee" tabIndex="-1" value="" />
      </div>
      <Button type="submit">Subscribe</Button>
    </form>
  </SignUpWrap>
);

export default SignUpForm;

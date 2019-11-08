import { HeaderWrap, HeaderButtons, HeaderButton, Subtitle, Title } from './style';

const PageHeader = ({
  title,
  subtitle,
  children,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
}) => (
  <HeaderWrap>
    <Title>{ title }</Title>
    <Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />

    {
      (primaryButtonText || secondaryButtonText) &&
      <HeaderButtons>
        { primaryButtonText && <HeaderButton primary href={primaryButtonUrl}>{ primaryButtonText }</HeaderButton> }
        { secondaryButtonText && <HeaderButton href={secondaryButtonUrl}>{ secondaryButtonText }</HeaderButton> }
      </HeaderButtons>
    }

    { children }
  </HeaderWrap>
);

export default PageHeader;

import { Badge, BlockItem, ItemSubtitle, ItemTitle, ItemWrap } from './style';

const RowBlock = ({
  title,
  subtitle,
  url,
  badge,
  openExternal = false,
  disabled = false,
  children = null
}) => (
  <ItemWrap className="col-md-6 col-lg-4 col-xl-4">
    <BlockItem href={ url } disabled={ disabled } target={openExternal ? '_blank' : '_self'}>
      { !children && (
        <>
          <ItemTitle>
            { title }
            { badge && <Badge>{ badge }</Badge>}
          </ItemTitle>
          <ItemSubtitle>{ subtitle }</ItemSubtitle>
        </>
      ) }
      { children }
    </BlockItem>
  </ItemWrap>
);

export default RowBlock;

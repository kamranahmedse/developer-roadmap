import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RowBlock from 'components/row-block';
import { SubmitText, SubmitWrap } from './style';

const IconRowBlock = ({ url, icon, text, openExternal=false }) => (
  <RowBlock url={ url } openExternal={openExternal}>
    <SubmitWrap>
      <FontAwesomeIcon icon={ icon } />
      <SubmitText>{ text }</SubmitText>
    </SubmitWrap>
  </RowBlock>
);

export default IconRowBlock;

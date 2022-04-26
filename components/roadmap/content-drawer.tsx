import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { RemoveScroll } from 'react-remove-scroll';
import { RoadmapType } from '../../lib/roadmap';
import RoadmapGroup from '../../pages/[roadmap]/[group]';
import { CheckIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { queryGroupElementsById } from '../../lib/renderer/utils';

type ContentDrawerProps = {
  roadmap: RoadmapType;
  groupId: string;
  onClose?: () => void;
};

export function ContentDrawer(props: ContentDrawerProps) {
  const { roadmap, groupId, onClose = () => null } = props;
  if (!groupId) {
    return null;
  }

  const localData = localStorage.getItem(groupId);

  return (
    <Box zIndex={99999} pos="relative">
      <Box
        onClick={onClose}
        pos="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="black"
        opacity={0.4}
      />
      <RemoveScroll allowPinchZoom>
        <Box
          p="0px 30px 30px"
          position="fixed"
          w={['100%', '60%', '40%']}
          bg="white"
          top={0}
          right={0}
          bottom={0}
          borderLeftWidth={'1px'}
          overflowY="scroll"
        >
          <Flex
            mt="20px"
            justifyContent="space-between"
            alignItems="center"
            zIndex={1}
          >
            {localData !== 'dontHave' &&(<Button
                onClick={() => {
                  localStorage.setItem(groupId, 'dontHave');
                  queryGroupElementsById(groupId).forEach((item) =>{                    
                    item?.classList?.remove('basicknowledge')
                    item?.classList?.remove('goodKnowledge')
                    item?.classList?.add('dontHave')}
                  );
                  onClose();
                }}
                colorScheme="red"  size="xs" iconSpacing={0}  >
                <Text as="span" d={['block', 'none', 'none', 'block']}  ml="10px" >Don't have</Text>
            </Button>)}

            {localData === 'dontHave' &&(
            <Button disabled
                onClick={() => {
                  localStorage.setItem(groupId, 'dontHave');
                  onClose();
                }}
                colorScheme="red" leftIcon={<CheckIcon />} size="xs" iconSpacing={0}  >
                <Text as="span" d={['block', 'none', 'none', 'block']}  ml="10px" >Don't have</Text>
            </Button>)}

            {localData !== 'basicknowledge' &&(
                <Button
                  onClick={() => {
                    localStorage.setItem(groupId, 'basicknowledge');
                    queryGroupElementsById(groupId).forEach((item) =>{                    
                      item?.classList?.remove('dontHave')
                      item?.classList?.remove('goodKnowledge')
                      item?.classList?.add('basicknowledge')}
                    );
                    onClose();
                  }}
                  colorScheme="green" size="xs" iconSpacing={0}  >
                  <Text as="span" d={['block', 'none', 'none', 'block']}  ml="10px" >Basic knowledge</Text>
                </Button>
            )}

            {localData === 'basicknowledge' &&(
                <Button disabled
                  onClick={() => {
                    localStorage.setItem(groupId, 'basicknowledge');
                    queryGroupElementsById(groupId).forEach((item) =>
                      item?.classList?.add('done')
                    );
                    onClose();
                  }}
                  colorScheme="green" leftIcon={<CheckIcon />} size="xs" iconSpacing={0}  >
                  <Text as="span" d={['block', 'none', 'none', 'block']}  ml="10px" >Basic knowledge</Text>
                </Button>
            )}    

            {localData !== 'goodKnowledge' &&(
              <Button
                  onClick={() => {
                    localStorage.setItem(groupId, 'goodKnowledge');
                    queryGroupElementsById(groupId).forEach((item) =>{                    
                      item?.classList?.remove('dontHave')
                      item?.classList?.remove('basicknowledge')
                      item?.classList?.add('goodKnowledge')}
                    );
                    onClose();
                  }}
                  colorScheme="blue" size="xs" iconSpacing={0}  >
                  <Text as="span" d={['block', 'none', 'none', 'block']}  ml="10px" >Good knowledge</Text>
              </Button>
            )}

            {localData === 'goodKnowledge' &&(
              <Button disabled
                  onClick={() => {
                    localStorage.setItem(groupId, 'goodKnowledge');
                    queryGroupElementsById(groupId).forEach((item) =>
                      item?.classList?.add('done')
                    );
                    onClose();
                  }}
                  colorScheme="blue" leftIcon={<CheckIcon />} size="xs" iconSpacing={0}  >
                  <Text as="span" d={['block', 'none', 'none', 'block']}  ml="10px" >Good knowledge</Text>
              </Button>
            )}


            <Button onClick={onClose} colorScheme="yellow" ml="5px" leftIcon={<CloseIcon width="8px" />} iconSpacing={0} size="xs" > 
            <Text as="span" d={['none', 'none', 'none', 'block']} ml="10px"> Close </Text> 
            </Button>
          </Flex>
          <RoadmapGroup isOutlet roadmap={roadmap} group={groupId} />
        </Box>
      </RemoveScroll>
    </Box>
  );
}

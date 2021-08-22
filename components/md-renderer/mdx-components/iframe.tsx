import { AspectRatio } from '@chakra-ui/react';

type IFrameProps = {
  title: string;
  src: string;
};

export default function IFrame(props: IFrameProps) {
  return (
    <AspectRatio maxW='100%' ratio={2} mb='18px'>
      <iframe
        frameBorder={0}
        title={props.title}
        src={props.src}
        allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
        allowFullScreen
      />
    </AspectRatio>
  );
}

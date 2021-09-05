import styled from 'styled-components';

type IFrameProps = {
  title: string;
  src: string;
};

const AspectRatioBox = styled.div`
  position: relative;
  max-width: 100%;
  margin-bottom: 18px;

  &:before {
    height: 0;
    content: "";
    display: block;
    padding-bottom: 50%;
  }

  & > iframe {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

export default function IFrame(props: IFrameProps) {
  return (
    <AspectRatioBox>
      <iframe
        frameBorder={0}
        title={props.title}
        src={props.src}
        allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
        allowFullScreen
      />
    </AspectRatioBox>
  );
}

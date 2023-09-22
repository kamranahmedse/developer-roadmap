import { Spinner } from '../ReactIcons/Spinner';

type NextButtonProps = {
  isLoading?: boolean;
  loadingMessage?: string;
  text: string;
  hasNextArrow?: boolean;
  onClick?: () => void;
  type?: string;
};

export function NextButton(props: NextButtonProps) {
  const {
    isLoading = false,
    text = 'Next Step',
    type = 'button',
    loadingMessage = 'Please wait ..',
    onClick = () => null,
    hasNextArrow = true,
  } = props;

  return (
    <button
      type={type as any}
      onClick={onClick}
      disabled={isLoading}
      className={
        'rounded-md border border-black bg-black px-4 py-2 text-white disabled:opacity-50'
      }
    >
      {isLoading ? (
        <span className={'flex items-center justify-center'}>
          <Spinner />
          <span className="ml-2">{loadingMessage}</span>
        </span>
      ) : (
        <>
          {text}
          {hasNextArrow && <span className="ml-1">&rarr;</span>}
        </>
      )}
    </button>
  );
}

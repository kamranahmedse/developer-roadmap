import { useCopyText } from '../../hooks/use-copy-text';
import CopyIcon from '../../icons/copy.svg';

type EditorProps = {
  title: string;
  text: string;
};

export function Editor(props: EditorProps) {
  const { text, title } = props;

  const { isCopied, copyText } = useCopyText();

  return (
    <div className="flex w-full flex-grow flex-col overflow-hidden rounded border border-gray-300 bg-gray-50">
      <div className="flex items-center justify-between gap-2 border-b border-gray-300 px-3 py-2">
        <span className="text-xs uppercase leading-none text-gray-400">
          {title}
        </span>
        <button className="flex items-center" onClick={() => copyText(text)}>
          {isCopied && (
            <span className="mr-1 text-xs leading-none text-gray-700">
              Copied!
            </span>
          )}

          <img src={CopyIcon} alt="Copy" className="inline-block h-4 w-4" />
        </button>
      </div>
      <textarea
        className="no-scrollbar block h-12 w-full overflow-x-auto whitespace-nowrap bg-gray-200/70 p-3 text-sm text-gray-900 focus:bg-gray-50 focus:outline-0"
        readOnly
        onClick={(e: any) => {
          e.target.select();
          copyText(e.target.value);
        }}
      >
        {text}
      </textarea>
    </div>
  );
}

import { cn } from '../../lib/classname';

type EmptyStackMessageProps = {
  number: number | string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bodyClassName?: string;
};

export function EmptyStackMessage(props: EmptyStackMessageProps) {
  const { number, title, description, buttonText, buttonLink, bodyClassName } =
    props;

  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50">
      <div
        className={cn(
          'flex max-w-[200px] flex-col items-center justify-center rounded-md bg-white p-4 shadow-xs',
          bodyClassName,
        )}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white">
          {number}
        </span>
        <div className="my-3 text-center">
          <h3 className="text-sm font-medium text-black">{title}</h3>
          <p className="text-center text-xs text-gray-500">{description}</p>
        </div>

        <a
          href={buttonLink}
          className="rounded-md bg-black px-3 py-1 text-xs text-white transition-transform hover:scale-105 hover:bg-gray-900"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}

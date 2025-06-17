import { cn } from '../../lib/classname';

type AICourseFooterProps = {
  className?: string;
};
export function AICourseFooter(props: AICourseFooterProps) {
  const { className } = props;

  return (
    <div
      className={cn(
        'mx-auto mb-10 mt-5 text-center text-sm text-gray-400',
        className,
      )}
    >
      AI can make mistakes, check important info.
    </div>
  );
}

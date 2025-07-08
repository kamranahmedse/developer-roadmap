import { cn } from '../../lib/classname';

type CircularProgressProps = {
  accuracy: number;
  color: 'emerald' | 'green' | 'blue' | 'orange' | 'red';
  size?: 'sm' | 'md' | 'lg';
};

export function CircularProgress(props: CircularProgressProps) {
  const { accuracy, color, size = 'md' } = props;

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (accuracy / 100) * circumference;

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-20 w-20 md:h-24 md:w-24',
    lg: 'h-28 w-28 md:h-32 md:w-32',
  };

  const textSizeClasses = {
    sm: 'text-base font-bold',
    md: 'text-lg md:text-xl font-bold',
    lg: 'text-xl md:text-2xl font-bold',
  };

  return (
    <div className="relative flex max-md:hidden flex-shrink-0 self-center">
      <svg
        className={cn(sizeClasses[size], '-rotate-90 transform')}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            'transition-all duration-1000 ease-out',
            color === 'emerald' && 'text-emerald-500',
            color === 'green' && 'text-green-500',
            color === 'blue' && 'text-blue-500',
            color === 'orange' && 'text-orange-500',
            color === 'red' && 'text-red-500',
          )}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn(textSizeClasses[size], 'text-gray-900')}>
          {accuracy}%
        </span>
      </div>
    </div>
  );
}

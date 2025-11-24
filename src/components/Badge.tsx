type BadgeProps = {
  variant: 'blue' | 'green' | 'red' | 'yellow' | 'grey' | 'white';
  text: string;
};

export function Badge(type: BadgeProps) {
  const { variant, text } = type;

  const colors = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    grey: 'bg-gray-100 text-gray-700 border-gray-200',
    white: 'bg-white text-black border-gray-200',
    teal: 'bg-teal-100 text-teal-700 border-teal-200',
    black: 'bg-gray-500 text-white border-gray-500',
  };

  return (
    <span
      className={`rounded-md border capitalize ${colors[variant]} px-1 py-0.5 text-xs tracking-wide`}
    >
      {text}
    </span>
  );
}

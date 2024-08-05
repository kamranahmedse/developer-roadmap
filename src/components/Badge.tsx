type BadgeProps = {
  variant: 'blue' | 'green' | 'red' | 'yellow' | 'grey' | 'white';
  text: string;
};

export function Badge(type: BadgeProps) {
  const { variant, text } = type;

  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    grey: 'bg-gray-100 text-gray-700',
    white: 'bg-white text-black',
  };

  return (
    <span
      className={`rounded-md border ${colors[variant]} px-1 py-0.5 text-xs tracking-wide`}
    >
      {text}
    </span>
  );
}

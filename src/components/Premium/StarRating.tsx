import { Star } from 'lucide-react';

export function StarRating() {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
      ))}
    </div>
  );
} 
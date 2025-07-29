import { StarRating } from './StarRating';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
}

export function Testimonial({ name, role, content }: TestimonialProps) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-700 bg-slate-800/50 p-6">
      <StarRating />
      <p className="mt-4 mb-auto leading-relaxed text-slate-400">{content}</p>
      <div className="mt-4">
        <div className="font-medium text-white">{name}</div>
        <div className="text-sm text-slate-500">{role}</div>
      </div>
    </div>
  );
} 
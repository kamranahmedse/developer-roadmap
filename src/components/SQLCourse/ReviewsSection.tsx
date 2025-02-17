import { StarIcon, User2Icon } from 'lucide-react';

type Review = {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatarUrl?: string;
};

export function ReviewsSection() {
  const reviews: Review[] = [
    {
      name: 'Tomáš Janků',
      role: 'Software Engineer',
      rating: 5,
      text: "The course and it's interactivity is excellent and I'd honestly say it's one of the best on the SQL theme I've seen out there.",
      avatarUrl: 'https://github.com/jankudev.png',
    },
    {
      name: 'Gourav Khunger',
      role: 'Software Engineer',
      rating: 5,
      text: 'This course was absolutely brilliant! The integrated database environment to practice what I learned was the best part.',
      avatarUrl: 'https://github.com/gouravkhunger.png',
    },
    {
      name: 'Meabed',
      role: 'CTO',
      rating: 5,
      text: 'Kamran has clearly put a lot of thought into this course. The content, structure and exercises were all great.',
      avatarUrl: 'https://github.com/meabed.png',
    },
    {
      name: 'Mohsin Aheer',
      role: 'Software Engineer',
      rating: 5,
      text: 'I already knew SQL but this course taught me a bunch of new things. Practical examples and challenges were great. Highly recommended!',
      avatarUrl: 'https://github.com/aheermohsinse.png',
    },
    {
      name: 'Reeve Tee',
      role: 'Software Engineer',
      rating: 5,
      text: 'I found the course highly comprehensive and incredibly valuable. I would love to see more courses like this!',
      avatarUrl: '',
    },
    {
      name: 'Zeeshan',
      role: 'Software Engineer',
      rating: 5,
      text: 'Loved the teaching style and the way the course was structured. The AI tutor was a great help when I got stuck.',
      avatarUrl: 'https://github.com/ziishaned.png',
    },
    {
      name: 'Adnan Ahmed',
      role: 'Engineering Manager',
      rating: 5,
      text: 'Having the integrated IDE made a huge difference. Being able to immediately practice what I learned was invaluable.',
      avatarUrl: 'https://github.com/idnan.png',
    },
    {
      name: 'Faisal Ahsan',
      role: 'Software Engineer',
      rating: 5,
      text: 'The course and the learning experience was great. What I really liked was the no-fluff explanations and practical examples.',
      avatarUrl: 'https://github.com/faisalahsan.png',
    },
    {
      name: 'Mian Asif',
      role: 'Software Engineering Lead',
      rating: 5,
      text: "Best SQL course I've taken. The progression from basic to advanced concepts is well thought out, and the challenges are excellent.",
      avatarUrl: 'https://github.com/mian.png',
    },
  ];

  return (
    <>
      <div className="ma-x-3xl mt-24 grid grid-cols-3 flex-row gap-4 overflow-hidden">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="max-w-[300px] flex-shrink-0 break-inside-avoid-column rounded-lg bg-zinc-800/30 p-6 backdrop-blur"
          >
            <div className="flex items-center gap-4">
              {review.avatarUrl && (
                <img
                  src={review.avatarUrl}
                  alt={review.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
              {!review.avatarUrl && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
                  <User2Icon className="h-6 w-6 text-zinc-400" />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-zinc-100">{review.name}</h3>
                <p className="text-sm text-zinc-400">{review.role}</p>
              </div>
            </div>
            <div className="mt-2 flex">
              {Array.from({ length: review.rating }).map((_, i) => (
                <StarIcon
                  key={i}
                  className="h-4 w-4 fill-yellow-500 text-yellow-500"
                />
              ))}
            </div>
            <p className="mt-4 text-zinc-300">{review.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

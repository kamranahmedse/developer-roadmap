import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  User2Icon,
} from 'lucide-react';
import { useState } from 'react';
import { markdownToHtml } from '../../lib/markdown';

type Review = {
  name: string;
  role: string;
  rating: number;
  text: string | string[];
  avatarUrl?: string;
  isProminent?: boolean;
  isSecondaryProminent?: boolean;
};

export function ReviewCarousel() {
  const reviews: Review[] = [
    {
      name: 'Robin Wieruch',
      role: 'Author - Multiple best-selling books',
      rating: 5,
      text: [
        'Kamran has been in the **educative space for a long time**, and it shows in the way he teaches SQL: clear, structured, and straight to the point.',
        "He breaks down SQL fundamentals in a way that's both **intuitive and practical**, helping you not just write queries, but truly understand how databases work.",
        "Even if you've used SQL before, this **course will fill in gaps you didn't even realize you had**. Get ready to level up your database skills!",
      ],
      avatarUrl: 'https://assets.roadmap.sh/guest/robin.jpeg',
      isProminent: true,
    },
    {
      name: 'William Imoh',
      role: 'Founder and Data Enthusiast',
      rating: 5,
      text: [
        'I have been working with SQL and databases for a long time, I bought this course for the advanced chapters but ended up completing the entire course. I learned a lot of new things and it was **well worth the investment**.',
        'No matter your SQL experience, this course is **a must-have** if you want to level up your SQL and data analysis skills. Highly recommended!',
      ],
      avatarUrl: 'https://assets.roadmap.sh/guest/william-imoh-sd2dk.jpg',
      isProminent: true,
    },
    {
      name: 'Tomáš Janků',
      role: 'Software Engineer',
      rating: 5,
      text: "The course and it's interactivity is excellent and I'd honestly say it's **one of the best** on the SQL theme I've seen out there.",
      avatarUrl: 'https://assets.roadmap.sh/guest/tomas-janku-6bg89.jpeg',
    },
    {
      name: 'Gourav Khunger',
      role: 'Software Engineer',
      rating: 5,
      text: 'This course was **absolutely brilliant!** The integrated database environment to practice what I learned was the best part.',
      avatarUrl: 'https://assets.roadmap.sh/guest/gourav-h2f3a.png',
    },
    {
      name: 'Meabed',
      role: 'CTO',
      rating: 5,
      text: 'Kamran has **clearly put a lot of thought** into this course. The content, structure and exercises were all great.',
      avatarUrl: 'https://assets.roadmap.sh/guest/meabed-fu83q.jpeg',
    },
    {
      name: 'Mohsin Aheer',
      role: 'Sr. Software Engineer',
      rating: 5,
      text: 'I already knew SQL but this course **taught me a bunch of new things.** Practical examples and challenges were great. Highly recommended!',
      avatarUrl: 'https://assets.roadmap.sh/guest/mohsinaheer-szchu.jpeg',
    },
    {
      name: 'Reeve Tee',
      role: 'Software Engineer',
      rating: 5,
      text: 'I found the course **highly comprehensive and incredibly valuable**. I would love to see more courses like this!',
      avatarUrl: '',
    },
    {
      name: 'Zeeshan',
      role: 'Sr. Software Engineer',
      rating: 5,
      text: 'Loved the teaching style and the way the course was structured. The **AI tutor was a great help** when I got stuck.',
      avatarUrl: 'https://assets.roadmap.sh/guest/ziishaned-qjepj.png',
    },
    {
      name: 'Adnan Ahmed',
      role: 'Engineering Manager',
      rating: 5,
      text: 'Having the integrated IDE made a huge difference. Being able to **immediately practice** what I learned was **invaluable**.',
      avatarUrl: 'https://assets.roadmap.sh/guest/idnan-fzps5.jpeg',
    },
    {
      name: 'Kalvin Chakma',
      role: 'Jr. Software Engineer',
      rating: 5,
      text: "Best SQL course I've taken. The progression from basic to advanced concepts is **well thought out**, and the challenges are **excellent**.",
      avatarUrl: 'https://assets.roadmap.sh/guest/kalvin-d65ol.jpeg',
    },
    {
      name: 'Faisal Ahsan',
      role: 'Software Engineer',
      rating: 5,
      text: 'The course and the learning experience was great. What I really liked was the **no-fluff explanations** and **practical examples**.',
      avatarUrl: 'https://assets.roadmap.sh/guest/faisal-q78p2.jpeg',
    },
  ];

  const batchSize = 2;
  const maxBatchNumber = Math.ceil(reviews.length / batchSize);
  const [currentBatchNumber, setCurrentBatchNumber] = useState(0);

  const currentBatch = reviews.slice(
    currentBatchNumber * batchSize,
    (currentBatchNumber + 1) * batchSize,
  );

  const handleNextBatch = () => {
    setCurrentBatchNumber((prev) => (prev + 1) % maxBatchNumber);
  };

  const handlePreviousBatch = () => {
    setCurrentBatchNumber(
      (prev) => (prev - 1 + maxBatchNumber) % maxBatchNumber,
    );
  };

  return (
    <div className="mt-24">
      <h3 className="text-center text-2xl font-medium text-zinc-200 md:text-3xl">
        What other learners said
      </h3>

      <div className="mt-10 flex gap-4">
        <div className="flex shrink-0 flex-col items-center justify-center">
          <button
            onClick={handlePreviousBatch}
            className="flex items-center justify-center rounded-full bg-zinc-800 p-2 hover:bg-zinc-700"
          >
            <ChevronLeftIcon className="h-6 w-6 stroke-[2.5] text-white" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {currentBatch.map((review, index) => (
            <div
              key={index}
              className="review-testimonial relative overflow-hidden rounded-2xl bg-linear-to-br from-yellow-500/10 via-yellow-500/5 to-transparent p-8 backdrop-blur-sm [&_strong]:font-normal [&_strong]:text-yellow-300/70"
            >
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-yellow-500/5" />
              <div className="flex items-center gap-4">
                {review.avatarUrl && (
                  <img
                    src={review.avatarUrl}
                    alt={review.name}
                    className="h-16 w-16 rounded-full border-2 border-yellow-500/20 object-cover"
                  />
                )}
                {!review.avatarUrl && (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
                    <User2Icon className="h-8 w-8 text-zinc-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {review.name}
                  </h3>
                  <p className="text-sm text-yellow-500/70">{review.role}</p>
                  <div className="mt-1 flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {(typeof review.text === 'string'
                  ? [review.text]
                  : review.text
                ).map((text, index) => (
                  <p
                    key={index}
                    className="text-zinc-400 [&_strong]:font-semibold! [&_strong]:text-white!"
                    dangerouslySetInnerHTML={{
                      __html: markdownToHtml(text),
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex shrink-0 flex-col items-center justify-center">
          <button
            onClick={handleNextBatch}
            className="flex items-center justify-center rounded-full bg-zinc-800 p-2 hover:bg-zinc-700"
          >
            <ChevronRightIcon className="h-6 w-6 stroke-[2.5] text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

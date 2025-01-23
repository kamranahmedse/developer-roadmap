import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { SectionHeader } from './SectionHeader';

type FAQItem = {
  question: string;
  answer: string;
};

function FAQRow({ question, answer }: FAQItem) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <h3 className="text-xl font-normal text-white">{question}</h3>
        <ChevronDownIcon
          className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && (
        <div className="border-t border-zinc-800 p-6 pt-4 text-lg leading-relaxed">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  const faqs: FAQItem[] = [
    {
      question: 'What is the format of the course?',
      answer:
        'The course is written in textual format. There are several chapters; each chapter has a set of lessons, followed by a set of practice problems and quizzes. You can learn at your own pace and revisit the content anytime.',
    },
    {
      question: 'What prerequisites do I need for this course?',
      answer:
        'No prior SQL knowledge is required. The course starts from the basics and gradually progresses to advanced topics.',
    },
    {
      question: 'Do I need to have a local database to follow the course?',
      answer:
        'No, we have an integrated coding playground, populated with a sample databases depending on the lesson, that you can use to follow the course. You can also use your own database if you have one.',
    },
    {
      question: 'How long do I have access to the course?',
      answer:
        'You get lifetime access to the course including all future updates. Once you purchase, you can learn at your own pace and revisit the content anytime.',
    },
    {
      question: 'What kind of support is available?',
      answer:
        'You get access to an AI tutor within the course that can help you with queries 24/7. Additionally, you can use the community forums to discuss problems and get help from other learners.',
    },
    {
      question: 'Will I get a certificate upon completion?',
      answer:
        "Yes, upon completing the course and its challenges, you'll receive a certificate of completion that you can share with employers or add to your LinkedIn profile.",
    },
    {
      question: 'Can I use this for job interviews?',
      answer:
        'Absolutely! The course covers common SQL interview topics and includes practical challenges similar to what you might face in technical interviews. The hands-on experience will prepare you well for real-world scenarios.',
    },
    {
      question: "What if I don't like the course?",
      answer:
        'I will refund your purchase within 7 days of the purchase. No questions asked. However, I would love to hear your feedback so that I can improve the course. Send me an email at kamran@roadmap.sh',
    },
    {
      question: 'I already know SQL, can I still take this course?',
      answer:
        'Yes! The course starts from the basics and gradually progresses to advanced topics. You can skip the chapters that you already know and focus on the ones that you need.',
    },
    {
      question: 'Do you offer any team licenses?',
      answer: 'Yes, please contact me at kamran@roadmap.sh',
    },
    {
      question: 'How do I gift this course to someone?',
      answer:
        'Send me an email at kamran@roadmap.sh and I will be happy to help you.',
    },
    {
      question: 'What if I have a question that is not answered here?',
      answer:
        'Please contact me at kamran@roadmap.sh and I will be happy to help you.',
    },
  ];

  return (
    <>
      <SectionHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about the course below."
      />

      <div className="mt-8 w-full max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <FAQRow key={index} {...faq} />
        ))}
      </div>
    </>
  );
}

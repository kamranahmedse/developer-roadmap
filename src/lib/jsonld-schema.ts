// Ensure the correct path to the module or create the module if it doesn't exist
import type { FAQType } from '../components/GenerateCourse/FAQs';
// // Adjusted path as an example
type ArticleSchemaProps = {
  url: string;
  headline: string;
  description: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
};

export function generateArticleSchema(article: ArticleSchemaProps) {
  const { url, headline, description, imageUrl, datePublished, dateModified } =
    article;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: headline,
    description: description,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: 'Kamran Ahmed',
      url: 'https://twitter.com/kamrify',
    },
    publisher: {
      '@type': 'Organization',
      name: 'roadmap.sh',
      logo: {
        '@type': 'ImageObject',
        url: 'https://roadmap.sh/images/brand-square.png',
      },
    },
    datePublished: datePublished,
    dateModified: dateModified,
  };
}

export function generateFAQSchema(faqs: FAQType[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: Array.isArray(faq.answer) ? faq.answer.join(' ') : faq.answer,
      },
    })),
  };
}

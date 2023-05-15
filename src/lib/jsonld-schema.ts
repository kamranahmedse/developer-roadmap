import type { FAQType } from '../components/FAQs/FAQs.astro';

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
        text: faq.answer.join(' '),
      },
    })),
  };
}

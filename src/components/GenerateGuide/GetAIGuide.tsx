import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { queryClient } from '../../stores/query-client';
import { AIGuideContent } from './AIGuideContent';
import { getAiGuideOptions } from '../../queries/ai-guide';

type GetAIGuideProps = {
  slug: string;
};

export function GetAIGuide(props: GetAIGuideProps) {
  const { slug: documentSlug } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const [error, setError] = useState('');
  const { data: aiGuide, error: queryError } = useQuery(
    {
      ...getAiGuideOptions(documentSlug),
      enabled: !!documentSlug,
    },
    queryClient,
  );

  useEffect(() => {
    if (!aiGuide) {
      return;
    }

    setIsLoading(false);
  }, [aiGuide]);

  useEffect(() => {
    if (!queryError) {
      return;
    }

    setIsLoading(false);
    setError(queryError.message);
  }, [queryError]);

  const handleRegenerateDocument = async (prompt?: string) => {
    // if (!aiDocument) {
    //   return;
    // }
    // queryClient.setQueryData(
    //   getAiDocumentOptions({ documentSlug: documentSlug }).queryKey,
    //   {
    //     ...aiDocument,
    //     title: '',
    //     difficulty: '',
    //     modules: [],
    //   },
    // );
    // await generateDocument({
    //   term: aiDocument.keyword,
    //   difficulty: aiDocument.difficulty,
    //   slug: documentSlug,
    //   prompt,
    //   onDocumentChange: (document) => {
    //     queryClient.setQueryData(
    //       getAiDocumentOptions({ documentSlug: documentSlug }).queryKey,
    //       {
    //         ...aiDocument,
    //         title: aiDocument.title,
    //         difficulty: aiDocument.difficulty,
    //         content: document,
    //       },
    //     );
    //   },
    //   onLoadingChange: (isNewLoading) => {
    //     setIsRegenerating(isNewLoading);
    //     if (!isNewLoading) {
    //       // TODO: Update progress
    //     }
    //   },
    //   onError: setError,
    //   isForce: true,
    // });
  };

  return <AIGuideContent html={aiGuide?.html || ''} />;
}

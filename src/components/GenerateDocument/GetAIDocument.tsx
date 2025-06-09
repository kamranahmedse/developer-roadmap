import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { generateDocument } from '../../helper/generate-ai-document';
import { queryClient } from '../../stores/query-client';
import { getAiDocumentOptions } from '../../queries/ai-document';
import { AIDocumentContent } from './AIDocumentContent';

type GetAIDocumentProps = {
  slug: string;
};

export function GetAIDocument(props: GetAIDocumentProps) {
  const { slug: documentSlug } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const [error, setError] = useState('');
  const { data: aiDocument, error: queryError } = useQuery(
    {
      ...getAiDocumentOptions({ documentSlug: documentSlug }),
      enabled: !!documentSlug,
    },
    queryClient,
  );

  useEffect(() => {
    if (!aiDocument) {
      return;
    }

    setIsLoading(false);
  }, [aiDocument]);

  useEffect(() => {
    if (!queryError) {
      return;
    }

    setIsLoading(false);
    setError(queryError.message);
  }, [queryError]);

  const handleRegenerateDocument = async (prompt?: string) => {
    if (!aiDocument) {
      return;
    }

    queryClient.setQueryData(
      getAiDocumentOptions({ documentSlug: documentSlug }).queryKey,
      {
        ...aiDocument,
        title: '',
        difficulty: '',
        modules: [],
      },
    );

    await generateDocument({
      term: aiDocument.keyword,
      difficulty: aiDocument.difficulty,
      slug: documentSlug,
      prompt,
      onDocumentChange: (document) => {
        queryClient.setQueryData(
          getAiDocumentOptions({ documentSlug: documentSlug }).queryKey,
          {
            ...aiDocument,
            title: aiDocument.title,
            difficulty: aiDocument.difficulty,
            content: document,
          },
        );
      },
      onLoadingChange: (isNewLoading) => {
        setIsRegenerating(isNewLoading);
        if (!isNewLoading) {
          // TODO: Update progress
        }
      },
      onError: setError,
      isForce: true,
    });
  };

  return <AIDocumentContent document={aiDocument?.content || ''} />;
}

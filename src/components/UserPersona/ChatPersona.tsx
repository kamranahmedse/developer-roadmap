import { useMutation, useQuery } from '@tanstack/react-query';
import { UserPersonaForm, type UserPersonaFormData } from './UserPersonaForm';
import { roadmapJSONOptions } from '../../queries/roadmap';
import { queryClient } from '../../stores/query-client';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { userRoadmapPersonaOptions } from '../../queries/user-persona';

type ChatPersonaProps = {
  roadmapId: string;
};

export function ChatPersona(props: ChatPersonaProps) {
  const { roadmapId } = props;

  const toast = useToast();

  const { data: roadmap } = useQuery(
    roadmapJSONOptions(roadmapId),
    queryClient,
  );

  const { mutate: createUserPersona, isPending: isCreatingUserPersona } =
    useMutation(
      {
        mutationFn: async (data: UserPersonaFormData) => {
          return httpPost('/v1-set-user-persona', {
            ...data,
            roadmapId,
          });
        },
        onError: (error) => {
          toast.error(error?.message || 'Something went wrong');
        },
        onSettled: () => {
          return queryClient.invalidateQueries(
            userRoadmapPersonaOptions(roadmapId),
          );
        },
      },
      queryClient,
    );

  const roadmapTitle = roadmap?.json.title ?? '';

  return (
    <div className="relative mx-auto flex h-auto max-w-[400px] grow flex-col justify-center p-4 px-2 px-4 sm:h-full sm:p-4">
      <div className="mb-4 text-left sm:mb-8 sm:text-center">
        <img
          src="/images/gifs/wave.gif"
          alt="Wave"
          className="mx-auto mb-3 hidden h-16 w-16 sm:mb-5 sm:block sm:h-24 sm:w-24"
        />
        <h2 className="text-lg font-semibold sm:text-xl">
          Welcome to the AI Tutor
        </h2>
        <p className="mt-1 pr-8 text-xs text-balance text-gray-500 sm:px-0 sm:text-sm">
          Before we start, answer these questions so we can help you better.
        </p>
      </div>

      <UserPersonaForm
        roadmapTitle={roadmapTitle}
        onSubmit={(data) => {
          const trimmedGoal = data?.goal?.trim();
          if (!trimmedGoal) {
            toast.error('Please describe your goal');
            return;
          }

          const trimmedCommit = data?.commit?.trim();
          if (!trimmedCommit) {
            toast.error(
              'Please enter how many hours per week you can commit to learning',
            );
            return;
          }

          createUserPersona(data);
        }}
        isLoading={isCreatingUserPersona}
      />
    </div>
  );
}

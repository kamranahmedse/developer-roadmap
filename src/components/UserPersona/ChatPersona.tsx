import { useMutation, useQuery } from '@tanstack/react-query';
import { UserPersonaForm, type UserPersonaFormData } from './UserPersonaForm';
import { roadmapJSONOptions } from '../../queries/roadmap';
import { queryClient } from '../../stores/query-client';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';
import { userPersonaOptions } from '../../queries/user-persona';

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
          return queryClient.invalidateQueries(userPersonaOptions(roadmapId));
        },
      },
      queryClient,
    );

  const roadmapTitle = roadmap?.json.title ?? '';

  return (
    <div className="relative mx-auto flex h-full max-w-[400px] grow flex-col justify-center p-4">
      <div className="mb-8 text-center">
        <h2 className="text-lg font-semibold">Welcome to the AI Tutor</h2>
        <p className="mt-1 text-sm text-balance text-gray-500">
          Before we get started, tell me about your current experience with
          roadmap.
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

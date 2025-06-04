import { useMutation, useQuery } from '@tanstack/react-query';

import { userRoadmapPersonaOptions } from '../../queries/user-persona';
import { queryClient } from '../../stores/query-client';
import { roadmapJSONOptions } from '../../queries/roadmap';
import { Modal } from '../Modal';
import { UserPersonaForm, type UserPersonaFormData } from './UserPersonaForm';
import { httpPost } from '../../lib/query-http';
import { useToast } from '../../hooks/use-toast';

type UpdatePersonaModalProps = {
  roadmapId: string;
  onClose: () => void;
};

export function UpdatePersonaModal(props: UpdatePersonaModalProps) {
  const { roadmapId, onClose } = props;

  const toast = useToast();
  const { data: roadmap } = useQuery(
    roadmapJSONOptions(roadmapId),
    queryClient,
  );
  const { data: userPersona } = useQuery(
    userRoadmapPersonaOptions(roadmapId),
    queryClient,
  );

  const { mutate: setUserPersona, isPending: isSettingUserPersona } =
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
        onSuccess: () => {
          onClose();
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
    <Modal
      onClose={onClose}
      wrapperClassName="max-w-[450px]"
      bodyClassName="p-4"
    >
      <div className="mb-4 text-left">
        <h2 className="text-lg font-semibold">Tell us more about yourself</h2>
        <p className="mt-1 text-sm text-balance text-gray-500">
          We'll use this information to help you get the best out of the AI
          Tutor.
        </p>
      </div>

      <UserPersonaForm
        className="space-y-4"
        roadmapTitle={roadmapTitle}
        defaultValues={userPersona ?? undefined}
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

          setUserPersona(data);
        }}
        isLoading={isSettingUserPersona}
      />
    </Modal>
  );
}

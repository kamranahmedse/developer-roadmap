import { ArrowUpRight, Check } from 'lucide-react';
import { Modal } from '../Modal';
import { cn } from '../../lib/classname';
import { useEffect, useMemo, useState } from 'react';
import type { AllowedOnboardingStatus } from '../../api/user';
import { pageProgressMessage } from '../../stores/page';
import { httpPatch } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import type { OnboardingConfig } from './AccountDropdown';
import { setAuthToken } from '../../lib/jwt';

type Task = {
  id: string;
  title: string;
  description: string;
  status: AllowedOnboardingStatus;
  url: string;
};

type OnboardingModalProps = {
  onClose: () => void;
  onboardingConfig: OnboardingConfig;
  onIgnoreTask?: (taskId: string, status: AllowedOnboardingStatus) => void;
};

export function OnboardingModal(props: OnboardingModalProps) {
  const { onboardingConfig, onClose, onIgnoreTask } = props;

  const toast = useToast();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const tasks = useMemo(() => {
    return [
      {
        id: 'updateProgress',
        title: 'Update your Progress',
        description: 'Mark your progress on the roadmap',
        status: onboardingConfig?.onboarding?.updateProgress || 'pending',
        url: '/roadmaps',
      },
      {
        id: 'publishProfile',
        title: 'Publish your Profile',
        description: 'Public profile to showcase your skills on roadmaps',
        status: onboardingConfig?.onboarding?.publishProfile || 'pending',
        url: '/account/update-profile',
      },
      {
        id: 'customRoadmap',
        title: 'Create a Custom Roadmap',
        description: 'Create your own roadmap to share with others',
        status: onboardingConfig?.onboarding?.customRoadmap || 'pending',
        url: import.meta.env.DEV
          ? 'http://localhost:4321'
          : 'https://draw.roadmap.sh',
      },
      {
        id: 'addFriends',
        title: 'Add your Friends',
        description: 'Invite friends to join you on roadmaps',
        status: onboardingConfig?.onboarding?.addFriends || 'pending',
        url: '/account/friends',
      },
      {
        id: 'roadCard',
        title: 'Create your Roadmap Card',
        description: 'Share your roadmap card with others',
        status: onboardingConfig?.onboarding?.roadCard || 'pending',
        url: '/account/road-card',
      },
      {
        id: 'inviteTeam',
        title: 'Invite your Team',
        description: 'Invite your team to collaborate on roadmaps',
        status: onboardingConfig?.onboarding?.inviteTeam || 'pending',
        url: '/team',
      },
    ];
  }, [onboardingConfig]);

  const ignoreOnboardingTask = async (
    taskId: string,
    status: AllowedOnboardingStatus,
  ) => {
    pageProgressMessage.set('Ignoring Task');
    const { response, error } = await httpPatch(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-onboarding-config`,
      {
        id: taskId,
        status,
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to ignore task');
      return;
    }

    toast.success('Task ignored successfully');
    onIgnoreTask?.(taskId, status);
    setSelectedTask(null);
  };

  const ignoreForever = async () => {
    const { response, error } = await httpPatch<{ token: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-ignore-onboarding-forever`,
      {},
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to ignore onboarding');
      return;
    }

    setAuthToken(response.token);
    window.location.reload();
  };

  const isAllTasksDone = tasks.every(
    (task) => task.status === 'done' || task.status === 'ignored',
  );
  useEffect(() => {
    if (!isAllTasksDone) {
      return;
    }

    pageProgressMessage.set('Finishing Onboarding');
    ignoreForever().finally(() => {});
  }, [isAllTasksDone]);

  return (
    <Modal onClose={onClose} bodyClassName="text-black p-3">
      <h2 className="text-lg font-medium tracking-tight">
        Complete your Onboarding
      </h2>
      <p className="mt-0.5 text-balance text-sm text-gray-500">
        Complete the following tasks to get started with roadmaps.
      </p>

      <ul className="mt-4">
        {tasks.map((task) => {
          const isDone = task.status === 'done';
          const isActive = selectedTask?.id === task.id;

          return (
            <li
              key={task.id}
              data-active={isActive}
              data-status={task.status}
              className={cn(
                'group/task mt-3',
                isActive ? '-mx-1 mt-2 rounded-md ring-1 ring-gray-200' : '',
              )}
            >
              <div className="flex items-start gap-2 group-data-[active=true]/task:p-1">
                <button
                  className="flex h-5 w-5 items-center justify-center"
                  onClick={() => setSelectedTask(isActive ? null : task)}
                  disabled={task.status !== 'pending'}
                >
                  {isDone ? (
                    <Check className="h-4 w-4 stroke-[3px] text-green-500" />
                  ) : (
                    <div
                      className={cn(
                        'h-4 w-4 rounded-md border border-gray-300',
                        task.status === 'ignored'
                          ? 'bg-gray-200'
                          : 'bg-transparent',
                      )}
                    />
                  )}
                </button>
                <div className="group-data-[status=ignored]/task:text-gray-400">
                  <h3 className="flex items-center text-sm font-medium group-data-[status=done]/task:line-through">
                    {task.title}

                    <a
                      href={task.url}
                      target="_blank"
                      className="ml-1 inline-block text-gray-400 hover:text-black"
                      aria-label="Open task in new tab"
                    >
                      <ArrowUpRight className="inline-block h-4 w-4 stroke-[3px]" />
                    </a>
                  </h3>
                  <p className="text-xs text-gray-500 group-data-[status=ignored]/task:text-gray-400">
                    {task.description}
                  </p>
                </div>
              </div>
              {isActive && (
                <div className="border-t p-1.5 pl-8">
                  <p className="text-balance text-xs">
                    We highly recommend you to complete this.
                  </p>
                  <p className="mt-0.5 text-xs">
                    Are you sure to ignore this?&nbsp;
                    <button
                      className="font-medium text-red-600 underline underline-offset-1 hover:no-underline"
                      onClick={() =>
                        ignoreOnboardingTask(task.id, 'ignored').finally(() =>
                          pageProgressMessage.set(''),
                        )
                      }
                    >
                      Yes
                    </button>
                    &nbsp;/&nbsp;
                    <button
                      className="font-medium text-red-600 underline underline-offset-1 hover:no-underline"
                      onClick={() => setSelectedTask(null)}
                    >
                      No
                    </button>
                  </p>

                  <p className="mt-2.5 text-xs">
                    Follow this{' '}
                    <a
                      href={task.url}
                      target="_blank"
                      className="text-blue-600 underline underline-offset-1 hover:no-underline"
                    >
                      link
                    </a>{' '}
                    to complete this task.
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-6">
        <button
          className="text-sm text-gray-600 underline underline-offset-2 hover:text-black hover:no-underline"
          onClick={() => {
            pageProgressMessage.set('Ignoring Onboarding');
            ignoreForever().finally();
          }}
        >
          Ignore forever
        </button>
      </div>
    </Modal>
  );
}

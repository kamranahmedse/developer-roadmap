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
import { NUDGE_ONBOARDING_KEY } from '../OnboardingNudge.tsx';

type Task = {
  id: string;
  title: string;
  description: string;
  status: AllowedOnboardingStatus;
  url: string;
  urlText: string;
  onClick?: () => void;
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
        description: 'Mark your progress on roadmaps',
        status: onboardingConfig?.onboarding?.updateProgress || 'pending',
        url: '/roadmaps',
        urlText: 'Roadmaps List',
      },
      {
        id: 'publishProfile',
        title: 'Claim a Username',
        description: 'Optionally create a public profile to share your skills',
        status: onboardingConfig?.onboarding?.publishProfile || 'pending',
        url: '/account/update-profile',
        urlText: 'Update Profile',
      },
      {
        id: 'customRoadmap',
        title: 'Custom Roadmaps',
        description: 'Create your own roadmap from scratch',
        status: onboardingConfig?.onboarding?.customRoadmap || 'pending',
        url: import.meta.env.DEV
          ? 'http://localhost:4321'
          : 'https://draw.roadmap.sh',
        urlText: 'Create Roadmap',
      },
      {
        id: 'addFriends',
        title: 'Invite your Friends',
        description: 'Invite friends to join you on roadmaps',
        status: onboardingConfig?.onboarding?.addFriends || 'pending',
        url: '/account/friends',
        urlText: 'Add Friends',
        onClick: () => {
          ignoreOnboardingTask(
            'addFriends',
            'done',
            'Updating status..',
          ).finally(() => pageProgressMessage.set(''));
        },
      },
      {
        id: 'roadCard',
        title: 'Create your Roadmap Card',
        description: 'Embed your skill card on your github or website',
        status: onboardingConfig?.onboarding?.roadCard || 'pending',
        url: '/account/road-card',
        urlText: 'Create Road Card',
        onClick: () => {
          ignoreOnboardingTask('roadCard', 'done', 'Updating status..').finally(
            () => pageProgressMessage.set(''),
          );
        },
      },
      {
        id: 'inviteTeam',
        title: 'Invite your Team',
        description: 'Invite your team to collaborate on roadmaps',
        status: onboardingConfig?.onboarding?.inviteTeam || 'pending',
        url: '/team/new',
        urlText: 'Create Team',
      },
    ];
  }, [onboardingConfig]);

  const ignoreOnboardingTask = async (
    taskId: string,
    status: AllowedOnboardingStatus,
    message: string = 'Ignoring Task',
  ) => {
    pageProgressMessage.set(message);
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
    <Modal onClose={onClose} bodyClassName="text-black h-auto">
      <div className="px-4 pb-2 pl-11 pt-4">
        <h2 className="mb-0.5 text-xl font-semibold">Welcome to roadmap.sh</h2>
        <p className="text-balance text-sm text-gray-500">
          Complete the tasks below to get started!
        </p>
      </div>

      <ul
        className={cn('flex flex-col divide-y', {
          'border-b': tasks[tasks.length - 1]?.status === 'done',
        })}
      >
        {/*sort to put completed tasks at the end */}
        {tasks.map((task, taskCounter) => {
          const isDone = task.status === 'done';
          const isActive = selectedTask?.id === task.id;

          return (
            <li
              key={task.id}
              data-active={isActive}
              data-status={task.status}
              className={cn('group/task px-4 py-2.5', {
                'bg-gray-100': isDone,
                'border-t': taskCounter === 0 && isDone,
              })}
            >
              <div
                className={cn('flex items-start gap-2', {
                  'opacity-50': task.status === 'done',
                })}
              >
                <span className="relative top-px flex h-5 w-5 items-center justify-center">
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
                </span>
                <div className="group-data-[status=ignored]/task:text-gray-400">
                  <h3 className="flex items-center text-sm font-semibold group-data-[status=done]/task:line-through">
                    {task.title}

                    <a
                      href={task.url}
                      target="_blank"
                      className={cn(
                        'ml-1 inline-block rounded-xl border border-black bg-white pl-1.5 pr-1 text-xs font-normal text-black hover:bg-black hover:text-white',
                      )}
                      aria-label="Open task in new tab"
                      onClick={() => {
                        if (!task?.onClick) {
                          return;
                        }

                        task.onClick();
                      }}
                    >
                      {task.urlText}
                      <ArrowUpRight className="relative -top-[0.5px] ml-0.5 inline-block h-3.5 w-3.5 stroke-[2px]" />
                    </a>
                  </h3>
                  <p className="text-xs text-gray-500 group-data-[status=ignored]/task:text-gray-400">
                    {task.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-2 px-11 pb-5">
        <button
          className="w-full rounded-md bg-linear-to-r from-purple-500 to-purple-700 px-4 py-2 text-sm font-medium text-white hover:from-purple-500 hover:to-purple-600"
          onClick={onClose}
        >
          Do it later
        </button>

        <button
          className="mt-3 text-sm text-gray-500 underline underline-offset-2 hover:text-black"
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

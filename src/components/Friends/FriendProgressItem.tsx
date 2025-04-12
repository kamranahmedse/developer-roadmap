import { useState } from 'react';
import type { ListFriendsResponse } from './FriendsPage';
import { DeleteUserIcon } from '../ReactIcons/DeleteUserIcon';
import { pageProgressMessage } from '../../stores/page';
import { httpDelete, httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { TrashIcon } from '../ReactIcons/TrashIcon';
import { AddedUserIcon } from '../ReactIcons/AddedUserIcon';
import { AddUserIcon } from '../ReactIcons/AddUserIcon';
import type { AllowedRoadmapRenderer } from '../../lib/roadmap';

type FriendProgressItemProps = {
  friend: ListFriendsResponse[0];
  onShowResourceProgress: (
    resourceId: string,
    isCustomResource?: boolean,
    renderer?: AllowedRoadmapRenderer,
  ) => void;
  onReload: () => void;
};

export function FriendProgressItem(props: FriendProgressItemProps) {
  const { friend, onShowResourceProgress, onReload } = props;
  const toast = useToast();
  const [isConfirming, setIsConfirming] =
    useState<ListFriendsResponse[0]['status']>();

  async function deleteFriend(userId: string, successMessage: string) {
    pageProgressMessage.set('Please wait...');
    const { response, error } = await httpDelete(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-friend/${userId}`,
      {},
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    toast.success(successMessage);
    onReload();
  }

  async function addFriend(userId: string, successMessage: string) {
    pageProgressMessage.set('Please wait...');
    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-add-friend/${userId}`,
      {},
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    toast.success(successMessage);
    onReload();
  }

  const roadmaps = (friend?.roadmaps || []).sort((a, b) => {
    return b.done - a.done;
  });

  const [showAll, setShowAll] = useState(false);
  const status = friend.status;

  return (
    <>
      <div
        className={`flex h-full min-h-[270px] flex-col overflow-hidden rounded-md border`}
        key={friend.userId}
      >
        <div className={`relative flex items-center gap-3 border-b p-3`}>
          <img
            src={
              friend.avatar
                ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${friend.avatar}`
                : '/images/default-avatar.png'
            }
            alt={friend.name || ''}
            className="h-8 w-8 rounded-full"
          />
          <div className="inline-grid w-full">
            <h3 className="truncate font-medium">{friend.name}</h3>
            <p className="truncate text-sm text-gray-500">{friend.email}</p>
          </div>
        </div>
        {friend.status === 'accepted' && (
          <>
            <div className="relative flex grow flex-col space-y-2 p-3">
              {(showAll ? roadmaps : roadmaps.slice(0, 4)).map((progress) => {
                return (
                  <button
                    onClick={() =>
                      onShowResourceProgress(
                        progress.resourceId,
                        progress.isCustomResource,
                        progress?.renderer,
                      )
                    }
                    className="group relative overflow-hidden rounded-md border p-2 hover:border-gray-300 hover:text-black focus:outline-hidden"
                    key={progress.resourceId}
                  >
                    <span className="relative z-10 flex items-center justify-between text-sm">
                      <span className="inline-grid">
                        <span className={'truncate'}>{progress.title}</span>
                      </span>
                      <span className="ml-1.5 shrink-0 text-xs text-gray-400">
                        {progress.done} / {progress.total}
                      </span>
                    </span>
                    <span
                      className="absolute inset-0 bg-gray-100 group-hover:bg-gray-200"
                      style={{
                        width: `${(progress.done / progress.total) * 100}%`,
                      }}
                    />
                  </button>
                );
              })}

              {roadmaps.length > 4 && !showAll && (
                <button
                  onClick={() => setShowAll(true)}
                  className={'text-xs text-gray-400 underline'}
                >
                  + {roadmaps.length - 4} more
                </button>
              )}

              {showAll && (
                <button
                  onClick={() => setShowAll(false)}
                  className={'text-sm text-gray-400 underline'}
                >
                  - Show less
                </button>
              )}

              {roadmaps.length === 0 && (
                <div className="text-sm text-gray-500">No progress</div>
              )}
            </div>
            <>
              {isConfirming !== 'accepted' && (
                <button
                  className="flex w-full items-center justify-center border-t py-2 text-sm font-medium text-red-700 hover:bg-red-50/50 hover:text-red-500"
                  onClick={() => {
                    setIsConfirming('accepted');
                  }}
                >
                  <TrashIcon className="mr-1 h-4 w-4" />
                  Remove Friend
                </button>
              )}

              {isConfirming === 'accepted' && (
                <span className="flex w-full items-center justify-center border-t py-2 text-sm text-red-700">
                  Are you sure?{' '}
                  <button
                    className="ml-2 font-medium text-red-700 underline underline-offset-2 hover:text-red-500"
                    onClick={() => {
                      deleteFriend(friend.userId, 'Friend removed').finally(
                        () => {
                          pageProgressMessage.set('');
                        },
                      );
                    }}
                  >
                    Yes
                  </button>{' '}
                  <button
                    className="ml-2 font-medium text-red-700 underline underline-offset-2 hover:text-red-500"
                    onClick={() => {
                      setIsConfirming(undefined);
                    }}
                  >
                    No
                  </button>
                </span>
              )}
            </>
          </>
        )}

        {friend.status === 'rejected' && (
          <>
            <div
              className={'flex w-full grow items-center justify-center'}
            >
              <span className=" flex flex-col items-center text-red-500">
                <DeleteUserIcon additionalClasses="mr-2 h-8 w-8 mb-1" />
                Request Rejected
              </span>
            </div>
            <span className="flex cursor-default items-center justify-center border-t py-2 text-center text-sm">
              Changed your mind?{' '}
              <button
                className="ml-2 font-medium text-red-700 underline underline-offset-2 hover:text-red-500"
                onClick={() => {
                  addFriend(friend.userId, 'Friend request accepted').finally(
                    () => {
                      pageProgressMessage.set('');
                    },
                  );
                }}
              >
                Accept
              </button>
            </span>
          </>
        )}

        {friend.status === 'got_rejected' && (
          <>
            <div
              className={'flex w-full grow items-center justify-center'}
            >
              <span className=" flex flex-col items-center text-sm text-red-500">
                <DeleteUserIcon additionalClasses="mr-2 h-8 w-8 mb-1" />
                Request Rejected
              </span>
            </div>
            <span className="flex cursor-default items-center justify-center border-t py-2.5 text-center text-sm">
              <button
                className="ml-2 flex items-center font-medium text-red-700 underline underline-offset-2 hover:text-red-500"
                onClick={() => {
                  deleteFriend(friend.userId, 'Friend request removed').finally(
                    () => {
                      pageProgressMessage.set('');
                    },
                  );
                }}
              >
                <TrashIcon className="mr-1 h-4 w-4" />
                Delete Request
              </button>
            </span>
          </>
        )}

        {friend.status === 'sent' && (
          <>
            <div
              className={'flex w-full grow items-center justify-center'}
            >
              <span className=" flex flex-col items-center text-green-500">
                <AddedUserIcon additionalClasses="mr-2 h-8 w-8 mb-1" />
                Request Sent
              </span>
            </div>
            <>
              {isConfirming !== 'sent' && (
                <button
                  className="flex w-full items-center justify-center border-t py-2 text-sm font-medium text-red-700 hover:bg-red-50/50 hover:text-red-500"
                  onClick={() => {
                    setIsConfirming('sent');
                  }}
                >
                  <TrashIcon className="mr-1 h-4 w-4" />
                  Withdraw Request
                </button>
              )}

              {isConfirming === 'sent' && (
                <span className="flex w-full items-center justify-center border-t py-2 text-sm text-red-700">
                  Are you sure?{' '}
                  <button
                    className="ml-2 font-medium text-red-700 underline underline-offset-2 hover:text-red-500"
                    onClick={() => {
                      deleteFriend(
                        friend.userId,
                        'Friend request withdrawn',
                      ).finally(() => {
                        pageProgressMessage.set('');
                      });
                    }}
                  >
                    Yes
                  </button>{' '}
                  <button
                    className="ml-2 font-medium text-red-700 underline underline-offset-2 hover:text-red-500"
                    onClick={() => {
                      setIsConfirming(undefined);
                    }}
                  >
                    No
                  </button>
                </span>
              )}
            </>
          </>
        )}

        {friend.status === 'received' && (
          <>
            <div
              className={
                'flex w-full grow flex-col items-center justify-center px-4'
              }
            >
              <AddUserIcon additionalClasses="mr-2 h-8 w-8 mb-1 text-green-500" />
              <span className="mb-3 text-green-600">Request Received</span>

              <button
                onClick={() => {
                  addFriend(friend.userId, 'Friend request accepted').finally(
                    () => {
                      pageProgressMessage.set('');
                    },
                  );
                }}
                className="mb-1 block w-full max-w-[150px] rounded-md bg-black py-1.5 text-sm text-white"
              >
                Accept
              </button>

              <button
                onClick={() => {
                  deleteFriend(
                    friend.userId,
                    'Friend request rejected',
                  ).finally(() => {
                    pageProgressMessage.set('');
                  });
                }}
                className="block w-full max-w-[150px] rounded-md border border-red-500 py-1 text-sm text-red-500"
              >
                Reject
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

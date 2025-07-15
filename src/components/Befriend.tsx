import { useEffect, useState } from 'react';
import { httpDelete, httpGet, httpPost } from '../lib/http';
import { pageProgressMessage } from '../stores/page';
import { isLoggedIn } from '../lib/jwt';
import { showLoginPopup } from '../lib/popup';
import { getUrlParams } from '../lib/browser';
import { CheckIcon } from './ReactIcons/CheckIcon';
import { DeleteUserIcon } from './ReactIcons/DeleteUserIcon';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../hooks/use-auth';
import { AddedUserIcon } from './ReactIcons/AddedUserIcon';
import { StopIcon } from './ReactIcons/StopIcon';
import { ErrorIcon } from './ReactIcons/ErrorIcon';

export type FriendshipStatus =
  | 'none'
  | 'sent'
  | 'received'
  | 'accepted'
  | 'rejected'
  | 'got_rejected';

type UserResponse = {
  id: string;
  links: Record<string, string>;
  avatar: string;
  name: string;
  status: FriendshipStatus;
};

export function Befriend() {
  const { u: inviteId } = getUrlParams();

  const toast = useToast();
  const currentUser = useAuth();

  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<UserResponse>();
  const isAuthenticated = isLoggedIn();

  async function loadUser(userId: string) {
    const { response, error } = await httpGet<UserResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-friend/${userId}`
    );
    if (error || !response) {
      setError(error?.message || 'Something went wrong');
      return;
    }

    if (response.status === 'accepted') {
      window.location.href = '/account/friends?c=fa';
      return;
    }

    setUser(response);
  }

  useEffect(() => {
    if (inviteId) {
      loadUser(inviteId).finally(() => {
        pageProgressMessage.set('');
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      setError('Missing invite ID in URL');
      pageProgressMessage.set('');
    }
  }, [inviteId]);

  async function addFriend(userId: string, successMessage: string) {
    pageProgressMessage.set('Please wait...');
    setError('');
    const { response, error } = await httpPost<UserResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-add-friend/${userId}`,
      {}
    );

    if (error || !response) {
      setError(error?.message || 'Something went wrong');
      return;
    }

    if (response.status === 'accepted') {
      window.location.href = '/account/friends?c=fa';
      return;
    }

    setUser(response);
  }

  async function deleteFriend(userId: string, successMessage: string) {
    pageProgressMessage.set('Please wait...');
    setError('');
    const { response, error } = await httpDelete<UserResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-friend/${userId}`,
      {}
    );

    if (error || !response) {
      setError(error?.message || 'Something went wrong');
      return;
    }

    setUser(response);
    toast.success(successMessage);
  }

  if (isLoading) {
    return null;
  }

  if (!user) {
    return (
      <div className="container text-center">
        <ErrorIcon additionalClasses="mx-auto mb-4 mt-24 w-20 opacity-20" />

        <h2 className={'mb-1 text-2xl font-bold'}>Error</h2>
        <p className="mb-4 text-base leading-6 text-gray-600">
          {error || 'There was a problem, please try again.'}
        </p>

        <div>
          <a
            href="/"
            className="grow cursor-pointer rounded-lg bg-gray-200 px-3 py-2 text-center"
          >
            Back to home
          </a>
        </div>
      </div>
    );
  }

  const userAvatar = user.avatar
    ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${user.avatar}`
    : '/images/default-avatar.png';

  const isMe = currentUser?.id === user.id;

  return (
    <div className="container max-w-[400px]! text-center">
      <img
        alt={'join team'}
        src={userAvatar}
        className="mx-auto mb-4 mt-24 w-28 rounded-full"
      />

      <h2 className={'mb-1 text-3xl font-bold'}>{user.name}</h2>
      <p className="mb-6 text-base leading-6 text-gray-600">
        After you add {user.name} as a friend, you will be able to view each
        other's skills and progress.
      </p>

      <div className="mx-auto w-full duration-500 sm:max-w-md">
        <div className="flex w-full flex-col items-center gap-2">
          {user.status === 'none' && (
            <button
              disabled={isMe}
              onClick={() => {
                if (!isAuthenticated) {
                  return showLoginPopup();
                }

                addFriend(user.id, 'Friend request sent').finally(() => {
                  pageProgressMessage.set('');
                });
              }}
              type="button"
              className="w-full grow cursor-pointer rounded-lg bg-black px-3 py-2 text-center text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isMe ? "You can't add yourself" : 'Add Friend'}
            </button>
          )}

          {user.status === 'sent' && (
            <>
              <span className="flex w-full grow cursor-default items-center justify-center rounded-lg border  border-gray-300 px-3 py-2 text-center text-black">
                <CheckIcon additionalClasses="mr-2 h-4 w-4" />
                Request Sent
              </span>

              {!isConfirming && (
                <button
                  onClick={() => {
                    setIsConfirming(true);
                  }}
                  type="button"
                  className="flex w-full grow cursor-pointer items-center justify-center rounded-lg border border-red-600 bg-red-600 px-3 py-2 text-center text-white hover:bg-red-700"
                >
                  <DeleteUserIcon additionalClasses="mr-2 h-[19px] w-[19px]" />
                  Withdraw Request
                </button>
              )}

              {isConfirming && (
                <span className="flex w-full grow cursor-default items-center justify-center rounded-lg border border-red-600 px-3 py-2.5 text-center text-sm text-red-600">
                  Are you sure?{' '}
                  <button
                    className="ml-2 text-red-700 underline"
                    onClick={() => {
                      deleteFriend(user.id, 'Friend request withdrawn').finally(
                        () => {
                          pageProgressMessage.set('');
                        }
                      );
                    }}
                  >
                    Yes
                  </button>{' '}
                  <button
                    onClick={() => {
                      setIsConfirming(false);
                    }}
                    className="ml-2 text-red-600 underline"
                  >
                    No
                  </button>
                </span>
              )}
            </>
          )}

          {user.status === 'accepted' && (
            <>
              <span className="flex w-full grow cursor-default items-center justify-center rounded-lg border  border-gray-300 px-3 py-2 text-center text-black">
                <AddedUserIcon additionalClasses="mr-2 h-5 w-5" />
                You are friends
              </span>

              {!isConfirming && (
                <button
                  onClick={() => {
                    setIsConfirming(true);
                  }}
                  type="button"
                  className="flex w-full grow cursor-pointer items-center justify-center rounded-lg border border-red-600 bg-red-600 px-3 py-2 text-center text-white hover:bg-red-700"
                >
                  <DeleteUserIcon additionalClasses="mr-2 h-[19px] w-[19px]" />
                  Remove Friend
                </button>
              )}

              {isConfirming && (
                <span className="flex w-full grow cursor-default items-center justify-center rounded-lg border border-red-600 px-3 py-2.5 text-center text-sm text-red-600">
                  Are you sure?{' '}
                  <button
                    className="ml-2 text-red-700 underline"
                    onClick={() => {
                      deleteFriend(user.id, 'Friend removed').finally(() => {
                        pageProgressMessage.set('');
                      });
                    }}
                  >
                    Yes
                  </button>{' '}
                  <button
                    onClick={() => {
                      setIsConfirming(false);
                    }}
                    className="ml-2 text-red-600 underline"
                  >
                    No
                  </button>
                </span>
              )}
            </>
          )}

          {user.status === 'rejected' && (
            <>
              <span className="flex w-full grow cursor-default items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-center text-black">
                <DeleteUserIcon additionalClasses="mr-2 h-4 w-4" />
                Request Rejected
              </span>

              <span className="flex w-full grow cursor-default items-center justify-center rounded-lg border border-red-600 px-3 py-2.5 text-center text-sm text-red-600">
                Changed your mind?{' '}
                <button
                  className="ml-2 text-red-700 underline"
                  onClick={() => {
                    addFriend(user.id, 'Friend request accepted').finally(
                      () => {
                        pageProgressMessage.set('');
                      }
                    );
                  }}
                >
                  Click here to Accept
                </button>
              </span>
            </>
          )}

          {user.status === 'got_rejected' && (
            <>
              <span className="flex w-full grow cursor-default items-center justify-center rounded-lg border border-red-500 px-3 py-2 text-center text-red-500">
                <StopIcon additionalClasses="mr-2 h-4 w-4" />
                Request Rejected
              </span>
            </>
          )}

          {user.status === 'received' && (
            <>
              <button
                onClick={() => {
                  addFriend(user.id, 'Friend request accepted').finally(() => {
                    pageProgressMessage.set('');
                  });
                }}
                className="flex w-full grow cursor-pointer items-center justify-center rounded-lg border  border-gray-800 bg-gray-800 px-3 py-2 text-center text-white hover:bg-black"
              >
                <CheckIcon additionalClasses="mr-2 h-4 w-4" />
                Accept Request
              </button>

              {!isConfirming && (
                <button
                  onClick={() => {
                    setIsConfirming(true);
                  }}
                  type="button"
                  className="flex w-full grow cursor-pointer items-center justify-center rounded-lg border border-red-600 bg-white px-3 py-2 text-center text-red-600 hover:bg-red-100"
                >
                  <DeleteUserIcon additionalClasses="mr-2 h-[19px] w-[19px]" />
                  Reject Request
                </button>
              )}

              {isConfirming && (
                <span className="flex w-full grow cursor-default items-center justify-center rounded-lg border border-red-600 px-3 py-2.5 text-center text-sm text-red-600">
                  Are you sure?{' '}
                  <button
                    className="ml-2 text-red-700 underline"
                    onClick={() => {
                      deleteFriend(user.id, 'Friend request rejected').finally(
                        () => {
                          pageProgressMessage.set('');
                        }
                      );
                    }}
                  >
                    Yes
                  </button>{' '}
                  <button
                    onClick={() => {
                      setIsConfirming(false);
                    }}
                    className="ml-2 text-red-600 underline"
                  >
                    No
                  </button>
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">{error}</p>
      )}
    </div>
  );
}

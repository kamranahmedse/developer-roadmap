import { useEffect, useState } from 'react';
import { httpGet, httpPatch } from '../lib/http';
import { pageProgressMessage } from '../stores/page';
import type { TeamDocument } from './CreateTeam/CreateTeamForm';
import type { AllowedRoles } from './CreateTeam/RoleDropdown';
import type { AllowedMemberStatus } from './TeamDropdown/TeamDropdown';
import { isLoggedIn } from '../lib/jwt';
import { showLoginPopup } from '../lib/popup';
import { getUrlParams } from '../lib/browser';
import { ErrorIcon2 } from './ReactIcons/ErrorIcon2';
import { BuildingIcon } from './ReactIcons/BuildingIcon';

type InvitationResponse = {
  team: TeamDocument;
  invite: {
    _id?: string;
    userId?: string;
    invitedEmail?: string;
    teamId: string;
    role: AllowedRoles;
    status: AllowedMemberStatus;
    createdAt: Date;
    updatedAt: Date;
  };
};

export function RespondInviteForm() {
  const { i: inviteId } = getUrlParams();

  const [isLoadingInvite, setIsLoadingInvite] = useState(true);
  const [error, setError] = useState('');
  const [invite, setInvite] = useState<InvitationResponse>();
  const isAuthenticated = isLoggedIn();

  async function loadInvitation(inviteId: string) {
    const { response, error } = await httpGet<InvitationResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-invitation/${inviteId}`
    );
    if (error || !response) {
      setError(error?.message || 'Something went wrong');
      return;
    }

    setInvite(response);
  }

  useEffect(() => {
    if (inviteId) {
      loadInvitation(inviteId).finally(() => {
        pageProgressMessage.set('');
        setIsLoadingInvite(false);
      });
    } else {
      setIsLoadingInvite(false);
      setError('Missing invite ID in URL');
      pageProgressMessage.set('');
    }
  }, [inviteId]);

  async function respondInvitation(status: 'accept' | 'reject') {
    pageProgressMessage.set('Please wait...');
    setError('');
    const { response, error } = await httpPatch<{ teamId: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-respond-invite/${inviteId}`,
      {
        status,
      }
    );
    if (error || !response) {
      setError(error?.message || 'Something went wrong');
      return;
    }

    if (status === 'reject') {
      window.location.href = '/';
      return;
    }
    window.location.href = `/team/activity?t=${response.teamId}`;
  }

  if (isLoadingInvite) {
    return null;
  }

  if (!invite) {
    return (
      <div className="container text-center">
        <ErrorIcon2 className="mx-auto mb-4 mt-24 w-20 opacity-20" />

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

  return (
    <div className="container text-center">
      <BuildingIcon className="mx-auto mb-4 mt-24 w-20 h-20 opacity-20" />

      <h2 className={'mb-1 text-2xl font-bold'}>Join Team</h2>
      <p className="mb-3 text-base leading-6 text-gray-600">
        You have been invited to join the team{' '}
        <strong id="team-name">{invite?.team?.name}</strong>.
      </p>

      {!isAuthenticated && (
        <div className="mx-auto w-full duration-500 sm:max-w-md">
          <div className="flex w-full items-center gap-2">
            <button
              onClick={() => showLoginPopup()}
              data-popup="login-popup"
              type="button"
              className="grow cursor-pointer rounded-lg bg-gray-200 px-3 py-2 text-center"
            >
              Login to respond
            </button>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div className={`mx-auto w-full max-w-md`}>
          <div className="flex w-full items-center gap-2">
            <button
              type="button"
              onClick={() =>
                respondInvitation('accept').finally(() => {
                  pageProgressMessage.set('');
                })
              }
              className="grow cursor-pointer rounded-lg hover:bg-gray-300 bg-gray-200 px-3 py-2 text-center"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() =>
                respondInvitation('reject').finally(() => {
                  pageProgressMessage.set('');
                })
              }
              className="grow cursor-pointer rounded-lg bg-red-500 hover:bg-red-600 px-3 py-2 text-white disabled:opacity-40"
            >
              Reject
            </button>
          </div>

          {error && (
            <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

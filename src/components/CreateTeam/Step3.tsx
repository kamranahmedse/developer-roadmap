import type { TeamDocument } from './CreateTeamForm';
import { NextButton } from './NextButton';
import { TrashIcon } from '../ReactIcons/TrashIcon';
import { type AllowedRoles, RoleDropdown } from './RoleDropdown';
import { useEffect, useRef, useState } from 'react';
import { httpPost } from '../../lib/http';

type Step3Props = {
  team?: TeamDocument;
  onNext: () => void;
  onBack: () => void;
};

type InviteType = {
  id: string;
  email: string;
  role: AllowedRoles;
};

function generateId() {
  return `${new Date().getTime()}`;
}

export function Step3(props: Step3Props) {
  const { onNext, onBack, team } = props;

  const [error, setError] = useState('');
  const [invitingTeam, setInvitingTeam] = useState(false);
  const emailInputRef = useRef(null);

  const [users, setUsers] = useState<InviteType[]>([
    {
      id: generateId(),
      email: '',
      role: 'member',
    },
  ]);

  async function inviteTeam() {
    setInvitingTeam(true);
    const { error, response } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-invite-team/${team?._id}`,
      {
        members: users,
      }
    );

    if (error || !response) {
      setError(error?.message || 'Something went wrong');
      setInvitingTeam(false);

      return;
    }

    onNext();
  }

  function focusLastEmailInput() {
    if (!emailInputRef.current) {
      return;
    }

    (emailInputRef.current as HTMLInputElement).focus();
  }

  function onSubmit(e: any) {
    e.preventDefault();

    inviteTeam().finally(() => null);
  }

  useEffect(() => {
    focusLastEmailInput();
  }, [users.length]);

  return (
    <form className="mt-4 flex w-full flex-col" onSubmit={onSubmit}>
      <div className="mb-1 mt-2">
        <h2 className="mb-1 md:mb-2 text-lg md:text-2xl font-bold">Invite your Team</h2>
        <p className="text-sm text-gray-700">
          Use the form below to invite your team members to your team. You can
          also invite them later.
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        {users.map((user, userCounter) => {
          return (
            <div className="flex flex-col sm:flex-row gap-2" key={user.id}>
              <input
                ref={userCounter === users.length - 1 ? emailInputRef : null}
                autoFocus={true}
                type="email"
                name="email"
                required
                id="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => {
                  const newUsers = users.map((u) => {
                    if (u.id === user.id) {
                      return {
                        ...u,
                        email: (e.target as HTMLInputElement)?.value,
                      };
                    }

                    return u;
                  });

                  setUsers(newUsers);
                }}
                className="grow rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900"
              />
              <RoleDropdown
                selectedRole={user.role}
                setSelectedRole={(role: AllowedRoles) => {
                  const newUsers = users.map((u) => {
                    if (u.id === user.id) {
                      return {
                        ...u,
                        role,
                      };
                    }

                    return u;
                  });

                  setUsers(newUsers);
                }}
              />
              <button
                disabled={users.length <= 1}
                type="button"
                className="rounded-md border border-red-200 bg-white px-4 py-2 text-red-500 hover:bg-red-100 disabled:opacity-30"
                onClick={() => {
                  setUsers(users.filter((u) => u.id !== user.id));
                }}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          );
        })}
      </div>
      {users.length <= 30 && (
        <button
          onClick={() => {
            setUsers([
              ...users,
              { id: generateId(), email: '', role: 'member' },
            ]);
          }}
          type="button"
          className="mt-2 rounded-md border border-dashed border-gray-400 py-2 text-sm text-gray-500 hover:border-gray-500 hover:text-gray-800"
        >
          + Add another
        </button>
      )}

      {error && (
        <div className="mt-2 text-sm font-medium text-red-500" role="alert">
          {error}
        </div>
      )}

      <div className="mt-4 flex flex-col sm:flex-row items-stretch md:items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className={
            'rounded-md border border-red-400 bg-white px-4 py-2 text-red-500'
          }
        >
          <span className="mr-1">&larr;</span>
          Previous Step
        </button>
        <div className={'flex gap-2'}>
          <button
            type="button"
            onClick={onNext}
            disabled={users.filter((u) => u.email).length !== 0}
            className={
              'rounded-md grow md:flex-auto border border-gray-300 bg-white px-4 py-2 text-gray-500 hover:border-gray-400 hover:text-black disabled:opacity-50 disabled:pointer-events-none'
            }
          >
            Skip for Now
          </button>
          <NextButton
            type={'submit'}
            isLoading={invitingTeam}
            text={'Send Invites'}
            loadingMessage={'Updating team ..'}
            hasNextArrow={false}
          />
        </div>
      </div>
    </form>
  );
}

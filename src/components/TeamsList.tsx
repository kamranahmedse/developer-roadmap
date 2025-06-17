import { useEffect, useState } from 'react';
import { httpGet } from '../lib/http';
import { useAuth } from '../hooks/use-auth';
import { pageProgressMessage } from '../stores/page';
import { useToast } from '../hooks/use-toast';
import { type UserTeamItem } from './TeamDropdown/TeamDropdown';

export function TeamsList() {
  const [teamList, setTeamList] = useState<UserTeamItem[]>([]);
  const user = useAuth();
  const toast = useToast();
  async function getAllTeam() {
    const { response, error } = await httpGet<UserTeamItem[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-user-teams`,
    );
    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    setTeamList(response);
  }

  useEffect(() => {
    getAllTeam().finally(() => {
      pageProgressMessage.set('');
    });
  }, []);

  return (
    <div className="relative mx-auto max-w-[500px]">
      <div className="w-full px-2 py-2">
        <div className={'mb-8 hidden md:block'}>
          <h2 className={'text-3xl font-bold sm:text-4xl'}>Teams</h2>
          <p className="mt-2 text-gray-400">
            Here are the teams you are part of
          </p>
        </div>

        <ul className="mb-3 flex flex-col gap-1">
          <li>
            <a
              className="flex w-full cursor-pointer items-center justify-between gap-2 truncate rounded-sm border p-2 text-sm font-medium hover:border-gray-300 hover:bg-gray-50"
              href="/account"
            >
              <span className="flex grow items-center gap-2">
                <img
                  src={
                    user?.avatar
                      ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${
                          user?.avatar
                        }`
                      : '/images/default-avatar.png'
                  }
                  alt={user?.name || ''}
                  className="h-6 w-6 rounded-full"
                />
                <span className="truncate">Personal Account</span>
              </span>
              <span>&rarr;</span>
            </a>
          </li>
          {teamList.map((team) => {
            let pageLink = '';
            if (team.status === 'invited') {
              pageLink = `/respond-invite?i=${team.memberId}`;
            } else if (team.status === 'joined') {
              pageLink = `/team/activity?t=${team._id}`;
            }

            return (
              <li key={team._id}>
                <a
                  className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm border p-2 text-sm font-medium hover:border-gray-300 hover:bg-gray-50"
                  href={pageLink}
                >
                  <span className="flex grow items-center gap-2">
                    <img
                      src={
                        team.avatar
                          ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${
                              team.avatar
                            }`
                          : '/images/default-avatar.png'
                      }
                      alt={team.name || ''}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="truncate">{team.name}</span>
                  </span>
                  <span>&rarr;</span>
                </a>
              </li>
            );
          })}
        </ul>
        <a
          className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-hidden focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
          href="/team/new"
        >
          <span className="mr-2">+</span>
          <span>New Team</span>
        </a>
      </div>
    </div>
  );
}

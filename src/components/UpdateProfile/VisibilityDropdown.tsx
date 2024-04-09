import { ChevronDown, Globe, LockIcon } from 'lucide-react';
import { type AllowedProfileVisibility } from '../../api/user.ts';
import { pageProgressMessage } from '../../stores/page.ts';
import { httpPatch } from '../../lib/http.ts';
import { useToast } from '../../hooks/use-toast.ts';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click.ts';
import { cn } from '../../lib/classname.ts';

type VisibilityDropdownProps = {
  visibility: AllowedProfileVisibility;
  setVisibility: (visibility: AllowedProfileVisibility) => void;
};

export function VisibilityDropdown(props: VisibilityDropdownProps) {
  const { visibility, setVisibility } = props;
  const toast = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    setIsVisibilityDropdownOpen(false);
  });

  const [isVisibilityDropdownOpen, setIsVisibilityDropdownOpen] =
    useState(false);

  async function updateProfileVisibility(visibility: AllowedProfileVisibility) {
    pageProgressMessage.set('Updating profile visibility');
    setIsVisibilityDropdownOpen(false);

    const { error } = await httpPatch(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-public-profile-visibility`,
      {
        profileVisibility: visibility,
      },
    );

    if (error) {
      toast.error(error.message || 'Something went wrong');

      return;
    }

    pageProgressMessage.set('');
    setVisibility(visibility);
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsVisibilityDropdownOpen(true);
        }}
        className={cn(
          'flex items-center gap-1 rounded-lg border border-black py-1 pl-1.5 pr-2 text-sm capitalize text-black',
          {
            invisible: isVisibilityDropdownOpen,
          },
        )}
      >
        {visibility === 'public' && <Globe className='mr-1' size={13} />}
        {visibility === 'private' && <LockIcon className='mr-1' size={13} />}
        {visibility}
        <ChevronDown size={13} className="ml-1" />
      </button>
      {isVisibilityDropdownOpen && (
        <div
          className="absolute right-0 top-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
          ref={dropdownRef}
        >
          <button
            className={cn(
              'flex w-full items-center gap-2 py-2.5 pl-3 pr-3.5 text-left text-sm hover:bg-gray-100',
              {
                'bg-gray-200': visibility === 'public',
              },
            )}
            onClick={() => updateProfileVisibility('public')}
          >
            <Globe size={13} />
            Public
          </button>
          <button
            className={cn(
              'flex w-full items-center gap-2 py-2.5 pl-3 pr-3.5 text-left text-sm hover:bg-gray-100',
              {
                'bg-gray-200': visibility === 'private',
              },
            )}
            onClick={() => updateProfileVisibility('private')}
          >
            <LockIcon size={13} />
            Private
          </button>
        </div>
      )}
    </div>
  );
}

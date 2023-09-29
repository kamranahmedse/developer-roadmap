import { cn } from '../../lib/classname';

type UserItemProps = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  onClick: () => void;
  isSelected: boolean;
};

export function UserItem(props: UserItemProps) {
  const { user, onClick, isSelected } = props;

  return (
    <button
      className={cn(
        'relative flex w-full items-center gap-2.5 rounded-lg border p-2.5',
        isSelected && 'border-gray-500 bg-gray-300 text-black'
      )}
      onClick={onClick}
    >
      <img
        src={
          user.avatar
            ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${user.avatar}`
            : '/images/default-avatar.png'
        }
        alt={user.name || ''}
        className="relative top-[1px] h-10 w-10 shrink-0 rounded-full"
      />
      <div className="inline-grid w-full">
        <h3 className="truncate text-left font-semibold">{user.name}</h3>
        <p
          className={cn(
            'truncate text-left text-sm text-gray-500',
            isSelected && 'text-gray-700'
          )}
        >
          {user.email}
        </p>
      </div>
    </button>
  );
}

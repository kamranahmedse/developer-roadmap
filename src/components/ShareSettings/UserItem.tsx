import { cn } from "../../lib/classname";

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
        'relative flex w-full items-center gap-2 rounded-md border p-2',
        isSelected && 'bg-gray-800 text-white'
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
        className="h-8 w-8 rounded-full"
      />
      <div className="inline-grid w-full">
        <h3 className="truncate text-left font-medium">{user.name}</h3>
        <p
          className={cn(
            'truncate text-left text-sm text-gray-500',
            isSelected && 'text-gray-300'
          )}
        >
          {user.email}
        </p>
      </div>
    </button>
  );
}

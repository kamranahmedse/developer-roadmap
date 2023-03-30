import { useAuth } from '../../hooks/use-auth';

export default function AccountNavigation() {
  const { user, isLoading } = useAuth();

  console.log('user', user, isLoading);

  return (
    <div>
      {user ? (
        <div>Authenticated: {user?.name}</div>
      ) : (
        <div>Not Authenticated</div>
      )}
    </div>
  );
}

import Cookies from 'js-cookie';
import { useEffect, useState } from 'preact/hooks';
import { TOKEN_COOKIE_NAME } from '../../lib/utils';
import { useAuth } from '../../hooks/use-auth';

export default function AccountNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, status } = useAuth();

  useEffect(() => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  console.log('user', user, status);

  return (
    <div>
      {isAuthenticated ? (
        <div>Authenticated: {user?.email}</div>
      ) : (
        <div>Not Authenticated</div>
      )}
    </div>
  );
}

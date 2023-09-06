import { ShieldBan } from 'lucide-react';
import type { FetchError } from '../../lib/http';

type RestrictedPageProps = {
  error: FetchError;
};

export function RestrictedPage(props: RestrictedPageProps) {
  const { error } = props;
  return (
    <div className="flex grow flex-col items-center justify-center">
      <ShieldBan className="h-16 w-16" />
      <h2 className="mt-4 text-2xl font-semibold">Restricted Access</h2>
      <p>
        {error?.message || 'This roadmap is not available for public access.'}
      </p>

      <a
        href="/"
        className="mt-4 font-medium underline underline-offset-2 hover:no-underline"
      >
        &larr; Go back to home
      </a>
    </div>
  );
}

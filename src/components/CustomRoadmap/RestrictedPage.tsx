import { ShieldBan } from 'lucide-react';
import type { FetchError } from '../../lib/http';

type RestrictedPageProps = {
  error: FetchError;
};

export function RestrictedPage(props: RestrictedPageProps) {
  const { error } = props;

  if (error.status === 404) {
    return (
      <ErrorMessage
        icon={<ShieldBan className="h-16 w-16" />}
        title="Roadmap not found"
        message="The roadmap you are looking for does not exist or has been deleted."
      />
    );
  }

  return (
    <ErrorMessage
      icon={<ShieldBan className="h-16 w-16" />}
      title="Restricted Access"
      message={error?.message}
    />
  );
}

type ErrorMessageProps = {
  title: string;
  message: string;
  icon: React.ReactNode;
};

function ErrorMessage(props: ErrorMessageProps) {
  const { title, message, icon } = props;
  return (
    <div className="flex grow flex-col items-center justify-center">
      {icon}
      <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
      <p>{message || 'This roadmap is not available for public access.'}</p>

      <a
        href="/"
        className="mt-4 font-medium underline underline-offset-2 hover:no-underline"
      >
        &larr; Go back to home
      </a>
    </div>
  );
}

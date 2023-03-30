import { useAuth } from '../../hooks/use-auth';

export default function ProfileDetails() {
  const { user, isLoading } = useAuth();
  return (
    <div className="py-10 pb-20">
      <h1 className="text-3xl font-bold sm:text-4xl">Profile</h1>
      <p className="mt-2">Here you can view your profile details.</p>
      <div className="mt-5 space-y-4">
        <div>
          <label className="text-slate-500">Name</label>
          <div className="mt-1">
            {isLoading || !user ? (
              <Skeleton />
            ) : (
              <h2 className="text-xl font-medium text-slate-800">
                {user?.name}
              </h2>
            )}
          </div>
        </div>
        <div>
          <label className="text-slate-500">Email</label>
          <div className="mt-1">
            {isLoading || !user ? (
              <Skeleton className="w-64" />
            ) : (
              <h2 className="text-xl font-medium text-slate-800">
                {user?.email}
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`h-7 w-36 animate-pulse rounded-md bg-slate-100 ${className}`}
    />
  );
}

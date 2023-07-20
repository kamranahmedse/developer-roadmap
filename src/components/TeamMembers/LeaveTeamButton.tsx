import { useState } from "preact/hooks";
import { httpDelete } from "../../lib/http";
import { Spinner } from "../ReactIcons/Spinner";
import { useToast } from "../../hooks/use-toast";

type LeaveTeamButtonProps = {
  teamId: string;
};

export function LeaveTeamButton(props: LeaveTeamButtonProps) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { teamId } = props;

  async function leaveTeam() {
    setIsLoading(true);
    const { response, error } = await httpDelete(
      `${import.meta.env.PUBLIC_API_URL}/v1-leave-team/${teamId}`,
      {}
    );

    if (error || !response) {
      setIsLoading(false);
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    window.location.href = '/account';
  }

  return (
    <button
      disabled={isLoading}
      onClick={leaveTeam}
      className="bg-gray-50 text-red-600 text-sm font-medium px-2 leading-none py-1.5 rounded-md border border-gray-200 h-7 flex items-center justify-center min-w-[95px]">
      {isLoading ? <Spinner isDualRing={false} /> : 'Leave team'}
    </button>
  )

}

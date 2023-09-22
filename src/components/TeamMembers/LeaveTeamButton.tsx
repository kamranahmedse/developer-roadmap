import { useState } from 'react';
import { LeaveTeamPopup } from './LeaveTeamPopup';

type LeaveTeamButtonProps = {
  teamId: string;
};

export function LeaveTeamButton(props: LeaveTeamButtonProps) {
  const [showLeaveTeamPopup, setShowLeaveTeamPopup] = useState(false);

  return (
    <>
      {showLeaveTeamPopup && (
        <LeaveTeamPopup
          onClose={() => {
            setShowLeaveTeamPopup(false);
          }}
        />
      )}
      <button
        onClick={() => {
          setShowLeaveTeamPopup(true);
        }}
        className="flex h-7 min-w-[95px] items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm font-medium leading-none text-red-600"
      >
        Leave team
      </button>
    </>
  );
}

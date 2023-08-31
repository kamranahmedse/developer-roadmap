import { useEffect, useState } from 'react';

export function useTeamId() {
  const [teamId, setTeamId] = useState<string | null>(null);
  useEffect(() => {
    const searchTeamId =
      new URLSearchParams(window.location.search).get('t') || null;
    setTeamId(searchTeamId);
  }, []);

  return { teamId };
}

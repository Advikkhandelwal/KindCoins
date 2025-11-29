import { useLeaderboard as useContextLeaderboard } from '../context/LeaderboardContext';

export const useLeaderboard = () => {
    return useContextLeaderboard();
};

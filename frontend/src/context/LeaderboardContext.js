import React, { createContext, useState, useContext } from 'react';
import { MOCK_LEADERS } from '../data/mockLeaders';

const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children }) => {
    const [leaders, setLeaders] = useState(MOCK_LEADERS);

    return (
        <LeaderboardContext.Provider value={{ leaders }}>
            {children}
        </LeaderboardContext.Provider>
    );
};

export const useLeaderboard = () => useContext(LeaderboardContext);

import React, { createContext, useState, useContext, useEffect } from 'react';

import { API_BASE_URL } from '../constants/config';

const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children }) => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/donations/leaderboard`);
            const data = await response.json();
            setLeaders(data);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        }
    };

    return (
        <LeaderboardContext.Provider value={{ leaders, fetchLeaderboard }}>
            {children}
        </LeaderboardContext.Provider>
    );
};

export const useLeaderboard = () => useContext(LeaderboardContext);

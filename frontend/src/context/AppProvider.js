import React from 'react';
import { DonationProvider } from './DonationContext';
import { CampaignProvider } from './CampaignContext';
import { LeaderboardProvider } from './LeaderboardContext';

export const AppProvider = ({ children }) => {
    return (
        <CampaignProvider>
            <DonationProvider>
                <LeaderboardProvider>{children}</LeaderboardProvider>
            </DonationProvider>
        </CampaignProvider>
    );
};
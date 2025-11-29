import React, { createContext, useState, useContext } from 'react';
import { MOCK_CAMPAIGNS } from '../data/mockCampaigns';

const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
    const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);

    return (
        <CampaignContext.Provider value={{ campaigns }}>
            {children}
        </CampaignContext.Provider>
    );
};

export const useCampaign = () => useContext(CampaignContext);
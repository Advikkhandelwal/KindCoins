import React, { createContext, useState, useContext, useEffect } from 'react';

import { API_BASE_URL } from '../constants/config';

const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/campaigns`);
            const data = await response.json();
            setCampaigns(data);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    return (
        <CampaignContext.Provider value={{ campaigns, fetchCampaigns }}>
            {children}
        </CampaignContext.Provider>
    );
};

export const useCampaign = () => useContext(CampaignContext);
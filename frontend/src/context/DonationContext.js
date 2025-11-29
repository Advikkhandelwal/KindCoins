import React, { createContext, useState, useContext, useEffect } from 'react';

import { API_BASE_URL } from '../constants/config';

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/donations`);
            const data = await response.json();
            setDonations(data);
        } catch (error) {
            console.error('Error fetching donations:', error);
        }
    };

    const addDonation = async (donation) => {
        // Optimistic update or refetch. For now, let's refetch to be safe with IDs.
        await fetchDonations();
    };

    const updateDonation = async (id, updatedDonation) => {
        await fetchDonations();
    };

    const deleteDonation = async (id) => {
        await fetchDonations();
    };

    return (
        <DonationContext.Provider
            value={{ donations, addDonation, updateDonation, deleteDonation, fetchDonations }}
        >
            {children}
        </DonationContext.Provider>
    );
};

export const useDonation = () => useContext(DonationContext);
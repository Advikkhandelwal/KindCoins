import React, { createContext, useState, useContext } from 'react';
import { MOCK_DONATIONS } from '../data/mockDonations';

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
    const [donations, setDonations] = useState(MOCK_DONATIONS);

    const addDonation = (donation) => {
        setDonations((prev) => [
            { id: Math.random().toString(), ...donation },
            ...prev,
        ]);
    };

    const updateDonation = (id, updatedDonation) => {
        setDonations((prev) =>
            prev.map((donation) =>
                donation.id === id ? { ...donation, ...updatedDonation } : donation
            )
        );
    };

    const deleteDonation = (id) => {
        setDonations((prev) => prev.filter((donation) => donation.id !== id));
    };

    return (
        <DonationContext.Provider
            value={{ donations, addDonation, updateDonation, deleteDonation }}
        >
            {children}
        </DonationContext.Provider>
    );
};

export const useDonation = () => useContext(DonationContext);
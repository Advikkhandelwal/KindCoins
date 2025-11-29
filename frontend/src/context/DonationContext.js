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

    const addDonation = async (donationData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/donations/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donationData),
            });
            if (response.ok) {
                const newDonation = await response.json();
                setDonations((prev) => [newDonation, ...prev]);
                return { success: true };
            } else {
                const error = await response.json();
                return { success: false, message: error.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const updateDonation = async (id, donationData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/donations/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donationData),
            });
            if (response.ok) {
                const updatedDonation = await response.json();
                setDonations((prev) => prev.map((d) => (d._id === id ? updatedDonation : d)));
                return { success: true };
            } else {
                const error = await response.json();
                return { success: false, message: error.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const deleteDonation = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/donations/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setDonations((prev) => prev.filter((d) => d._id !== id));
                return { success: true };
            } else {
                return { success: false, message: 'Failed to delete' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
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
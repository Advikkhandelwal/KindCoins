import { useDonation as useContextDonation } from '../context/DonationContext';

export const useDonations = () => {
    return useContextDonation();
};

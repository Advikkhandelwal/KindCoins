import { useCampaign as useContextCampaign } from '../context/CampaignContext';

export const useCampaigns = () => {
    return useContextCampaign();
};

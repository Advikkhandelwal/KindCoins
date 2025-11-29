import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CampaignsScreen from '../screens/Campaigns/CampaignsScreen';
import CampaignDetailsScreen from '../screens/Campaigns/CampaignDetailsScreen';

const Stack = createNativeStackNavigator();

const CampaignStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CampaignsScreen" component={CampaignsScreen} />
            <Stack.Screen name="CampaignDetails" component={CampaignDetailsScreen} />
        </Stack.Navigator>
    );
};

export default CampaignStack;
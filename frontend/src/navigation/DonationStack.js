import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DonationsScreen from '../screens/Donations/DonationsScreen';
import AddDonationScreen from '../screens/Donations/AddDonationScreen';
import EditDonationScreen from '../screens/Donations/EditDonationScreen';
import ThankYouScreen from '../screens/ThankYou/ThankYouScreen';

const Stack = createNativeStackNavigator();

const DonationStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DonationsScreen" component={DonationsScreen} />
            <Stack.Screen name="AddDonation" component={AddDonationScreen} />
            <Stack.Screen name="EditDonation" component={EditDonationScreen} />
            <Stack.Screen name="ThankYou" component={ThankYouScreen} />
        </Stack.Navigator>
    );
};

export default DonationStack;
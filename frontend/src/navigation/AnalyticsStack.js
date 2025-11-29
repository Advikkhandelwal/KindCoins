import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnalyticsScreen from '../screens/Analytics/AnalyticsScreen';

const Stack = createNativeStackNavigator();

const AnalyticsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} />
        </Stack.Navigator>
    );
};

export default AnalyticsStack;

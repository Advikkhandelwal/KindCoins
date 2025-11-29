import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeaderboardScreen from '../screens/Leaderboard/LeaderboardScreen';

const Stack = createNativeStackNavigator();

const LeaderStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LeaderboardScreen" component={LeaderboardScreen} />
        </Stack.Navigator>
    );
};

export default LeaderStack;
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import CampaignStack from './CampaignStack';
import DonationStack from './DonationStack';
import LeaderStack from './LeaderStack';
import AnalyticsStack from './AnalyticsStack';
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.darkGray,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Campaigns') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Donations') {
                        iconName = focused ? 'trending-up' : 'trending-up-outline';
                    } else if (route.name === 'Leaders') {
                        iconName = focused ? 'trophy' : 'trophy-outline';
                    } else if (route.name === 'Analytics') {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Campaigns" component={CampaignStack} />
            <Tab.Screen name="Donations" component={DonationStack} />
            <Tab.Screen name="Leaders" component={LeaderStack} />
            <Tab.Screen name="Analytics" component={AnalyticsStack} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
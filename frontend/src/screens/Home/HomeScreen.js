import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { METRICS } from '../../constants/metrics';
import StatCard from '../../components/Cards/StatCard';
import DonationCard from '../../components/Cards/DonationCard';
import SectionTitle from '../../components/UI/SectionTitle';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import { useDonation } from '../../context/DonationContext';
import { useCampaign } from '../../context/CampaignContext';
import { formatCurrency } from '../../utils/formatCurrency';

const QuickAction = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
        <Ionicons name={icon} size={24} color={COLORS.primary} />
        <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
);

import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const { donations, fetchDonations } = useDonation();
    const { campaigns, fetchCampaigns } = useCampaign();

    useFocusEffect(
        React.useCallback(() => {
            fetchDonations();
            fetchCampaigns();
        }, [])
    );

    const totalCollected = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalDonors = new Set(donations.map((d) => d.donorName)).size;
    const activeCampaigns = campaigns.length;

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.header}
                >
                    <Text style={styles.appName}>KindCoins</Text>
                    <Text style={styles.appTagline}>Track generosity, celebrate impact</Text>
                </LinearGradient>

                <View style={styles.contentContainer}>
                    <View style={styles.statsRow}>
                        <StatCard
                            title="Total Collected"
                            value={formatCurrency(totalCollected)}
                            icon="trending-up"
                            color={COLORS.success}
                        />
                        <StatCard
                            title="Total Donors"
                            value={totalDonors}
                            icon="people"
                            color={COLORS.warning}
                        />
                    </View>
                    <View style={styles.fullWidthCard}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="heart-outline" size={24} color={COLORS.warning} />
                            <Text style={styles.cardTitle}>Active Campaigns</Text>
                        </View>
                        <Text style={styles.cardValue}>{activeCampaigns}</Text>
                    </View>
                    <SectionTitle title="Quick Actions" style={styles.sectionTitle} />
                    <View style={styles.quickActionsGrid}>
                        <QuickAction
                            icon="add"
                            label="Add Donation"
                            onPress={() => navigation.navigate('Donations', { screen: 'AddDonation' })}
                        />
                        <QuickAction
                            icon="heart-outline"
                            label="Campaigns"
                            onPress={() => navigation.navigate('Campaigns')}
                        />
                        <QuickAction
                            icon="trophy-outline"
                            label="Leaderboard"
                            onPress={() => navigation.navigate('Leaderboard')}
                        />
                        <QuickAction
                            icon="bar-chart-outline"
                            label="Analytics"
                            onPress={() => navigation.navigate('Analytics')}
                        />
                    </View>
                    <SectionTitle title="Recent Donations" style={styles.sectionTitle} />
                    {donations.slice(0, 5).map((donation) => (
                        <DonationCard key={donation._id} donation={donation} />
                    ))}
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingBottom: 80,
        paddingHorizontal: METRICS.padding,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    appTagline: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        marginTop: 4,
    },
    contentContainer: {
        paddingHorizontal: METRICS.padding,
        marginTop: -60,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    fullWidthCard: {
        backgroundColor: COLORS.white,
        borderRadius: METRICS.borderRadius,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 14,
        color: COLORS.darkGray,
        marginLeft: 8,
    },
    cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.warning,
    },
    sectionTitle: {
        marginTop: 16,
        marginBottom: 12,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    quickAction: {
        width: '48%',
        backgroundColor: COLORS.white,
        borderRadius: METRICS.borderRadius,
        padding: 20,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    quickActionLabel: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
});

export default HomeScreen;
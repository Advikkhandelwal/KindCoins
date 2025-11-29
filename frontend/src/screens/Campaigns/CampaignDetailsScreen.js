import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import GradientHeader from '../../components/UI/GradientHeader';
import PrimaryButton from '../../components/UI/PrimaryButton';
import ProgressBar from '../../components/UI/ProgressBar';
import { COLORS } from '../../constants/colors';
import { METRICS } from '../../constants/metrics';
import { formatCurrency } from '../../utils/formatCurrency';

import { API_BASE_URL } from '../../constants/config';

import { useFocusEffect } from '@react-navigation/native';

const CampaignDetailsScreen = ({ route, navigation }) => {

    const { campaign: initialCampaign } = route.params;
    const [campaign, setCampaign] = React.useState(initialCampaign);

    useFocusEffect(
        React.useCallback(() => {
            fetchCampaignDetails();
        }, [])
    );

    const fetchCampaignDetails = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/campaigns/${initialCampaign._id}`);
            const data = await response.json();
            setCampaign(data);
        } catch (error) {
            console.error('Error fetching campaign details:', error);
        }
    };
    console.log(campaign);

    const collected = campaign.collectedAmount || 0;
    const target = campaign.targetAmount || 1;
    const progress = collected / target;
    const percentage = (progress * 100).toFixed(1);

    return (
        <ScreenWrapper>
            <GradientHeader title={campaign.name} showBack={true} />
            <ScrollView contentContainerStyle={styles.content}>
                <Image source={{ uri: campaign.image }} style={styles.image} />

                <View style={styles.card}>
                    <Text style={styles.description}>{campaign.description}</Text>

                    <View style={styles.progressSection}>
                        <View style={styles.statsRow}>
                            <Text style={styles.label}>Raised</Text>
                            <Text style={styles.label}>Goal</Text>
                        </View>
                        <View style={styles.statsRow}>
                            <Text style={styles.amount}>{formatCurrency(collected)}</Text>
                            <Text style={styles.target}>{formatCurrency(campaign.targetAmount)}</Text>
                        </View>
                        <ProgressBar progress={progress} height={12} />
                        <Text style={styles.percentage}>{percentage}% Funded</Text>
                    </View>

                    <View style={styles.infoRow}>
                        {/* <View style={styles.infoItem}>
                            <Text style={styles.infoValue}>{campaign.donors}</Text>
                            <Text style={styles.infoLabel}>Donors</Text>
                        </View> */}
                        <View style={styles.infoItem}>
                            <Text style={styles.infoValue}>24</Text>
                            <Text style={styles.infoLabel}>Days Left</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <PrimaryButton
                    title="Donate Now"
                    onPress={() => navigation.navigate('Donations', {
                        screen: 'AddDonation',
                        params: { campaignId: campaign._id }
                    })}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: METRICS.padding,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: METRICS.borderRadius,
        marginBottom: 16,
        backgroundColor: COLORS.lightGray,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: METRICS.borderRadius,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    description: {
        fontSize: 16,
        color: COLORS.text,
        lineHeight: 24,
        marginBottom: 24,
    },
    progressSection: {
        marginBottom: 24,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: COLORS.darkGray,
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    target: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    percentage: {
        marginTop: 8,
        textAlign: 'right',
        color: COLORS.primary,
        fontWeight: '600',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
        paddingTop: 16,
    },
    infoItem: {
        alignItems: 'center',
    },
    infoValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    infoLabel: {
        fontSize: 14,
        color: COLORS.darkGray,
    },
    footer: {
        padding: METRICS.padding,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
    },
});

export default CampaignDetailsScreen;

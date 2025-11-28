import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { METRICS } from '../../constants/metrics';
import ProgressBar from '../UI/ProgressBar';
import { formatCurrency } from '../../utils/formatCurrency';

const CampaignCard = ({ campaign, onPress }) => {
    const progress = campaign.collectedAmount / campaign.targetAmount;
    const percentage = (progress * 100).toFixed(1);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.header}>
                <Ionicons name="heart" size={20} color={COLORS.primary} />
                <Text style={styles.title}>{campaign.title}</Text>
            </View>

            <Text style={styles.description} numberOfLines={2}>
                {campaign.description}
            </Text>

            <View style={styles.progressContainer}>
                <ProgressBar progress={progress} />
            </View>

            <View style={styles.statsRow}>
                <View>
                    <Text style={styles.label}>Collected</Text>
                    <Text style={styles.amount}>{formatCurrency(campaign.collectedAmount)}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.label}>Target</Text>
                    <Text style={styles.target}>{formatCurrency(campaign.targetAmount)}</Text>
                </View>
            </View>

            <Text style={styles.percentage}>{percentage}% achieved</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: METRICS.borderRadius,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginLeft: 8,
    },
    description: {
        fontSize: 14,
        color: COLORS.darkGray,
        marginBottom: 16,
    },
    progressContainer: {
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        color: COLORS.darkGray,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    target: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    percentage: {
        fontSize: 12,
        color: COLORS.warning,
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default CampaignCard;

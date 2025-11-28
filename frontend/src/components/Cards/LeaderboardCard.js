import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { METRICS } from '../../constants/metrics';
import { formatCurrency } from '../../utils/formatCurrency';

const LeaderboardCard = ({ leader, rank }) => {
    const getRankIcon = (r) => {
        if (r === 1) return { name: 'trophy-outline', color: '#FFD700' }; // Gold
        if (r === 2) return { name: 'medal-outline', color: '#C0C0C0' }; // Silver
        if (r === 3) return { name: 'medal-outline', color: '#CD7F32' }; // Bronze
        return null;
    };

    const rankIcon = getRankIcon(rank);

    return (
        <View style={styles.card}>
            <View style={styles.rankContainer}>
                {rankIcon ? (
                    <View style={[styles.iconCircle, { backgroundColor: rankIcon.color + '20' }]}>
                        <Ionicons name={rankIcon.name} size={20} color={rankIcon.color} />
                    </View>
                ) : (
                    <View style={styles.rankCircle}>
                        <Text style={styles.rankText}>{rank}</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{leader.name}</Text>
                <Text style={styles.donationsCount}>
                    {leader.donationCount} {leader.donationCount === 1 ? 'donation' : 'donations'}
                </Text>
            </View>

            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{formatCurrency(leader.totalDonated)}</Text>
                <Text style={styles.totalLabel}>Total</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: METRICS.borderRadius,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    rankContainer: {
        marginRight: 16,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.gray,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    rankText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.darkGray,
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    donationsCount: {
        fontSize: 12,
        color: COLORS.darkGray,
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    totalLabel: {
        fontSize: 10,
        color: COLORS.darkGray,
        marginTop: 2,
    }
});

export default LeaderboardCard;

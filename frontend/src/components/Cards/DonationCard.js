import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { METRICS } from '../../constants/metrics';
import { formatCurrency } from '../../utils/formatCurrency';

const DonationCard = ({ donation }) => {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Ionicons name="person" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.content}>
                <Text style={styles.name}>{donation.donorName}</Text>
                <Text style={styles.message} numberOfLines={1}>
                    {donation.message || 'No message'}
                </Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{formatCurrency(donation.amount)}</Text>
                <Text style={styles.date}>{donation.date}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: METRICS.borderRadius,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    message: {
        fontSize: 12,
        color: COLORS.darkGray,
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    date: {
        fontSize: 10,
        color: COLORS.darkGray,
    },
});

export default DonationCard;

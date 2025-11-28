import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { METRICS } from '../../constants/metrics';

const StatCard = ({ title, value, icon, color, style }) => {
    return (
        <View style={[styles.card, style]}>
            <View style={styles.header}>
                <Ionicons name={icon} size={24} color={color} />
                <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={[styles.value, { color }]}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: METRICS.borderRadius,
        padding: 16,
        flex: 1,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 14,
        color: COLORS.darkGray,
        marginLeft: 8,
        flex: 1,
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default StatCard;

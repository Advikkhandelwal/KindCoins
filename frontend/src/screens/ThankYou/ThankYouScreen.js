import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import PrimaryButton from '../../components/UI/PrimaryButton';
import { COLORS } from '../../constants/colors';
import { METRICS } from '../../constants/metrics';
import { formatCurrency } from '../../utils/formatCurrency';

const ThankYouScreen = ({ navigation, route }) => {
    const { donation } = route.params;

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="checkmark-circle" size={100} color={COLORS.success} />
                </View>

                <Text style={styles.title}>Thank You!</Text>
                <Text style={styles.subtitle}>Your donation has been received.</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>Amount Donated</Text>
                    <Text style={styles.amount}>{formatCurrency(donation.amount)}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.message}>
                        "Generosity is the most natural outward expression of an inner attitude of compassion."
                    </Text>
                </View>

                <PrimaryButton
                    title="Back to Home"
                    onPress={() => navigation.navigate('Home')}
                    style={styles.button}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: METRICS.padding,
    },
    iconContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.darkGray,
        marginBottom: 32,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: METRICS.borderRadius,
        padding: 32,
        width: '100%',
        alignItems: 'center',
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        color: COLORS.darkGray,
        marginBottom: 8,
    },
    amount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: COLORS.lightGray,
        marginVertical: 24,
    },
    message: {
        fontSize: 14,
        color: COLORS.darkGray,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    button: {
        width: '100%',
    },
});

export default ThankYouScreen;

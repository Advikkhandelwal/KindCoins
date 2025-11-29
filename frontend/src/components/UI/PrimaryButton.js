import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { METRICS } from '../../constants/metrics';

const PrimaryButton = ({ title, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: METRICS.borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PrimaryButton;

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { METRICS } from '../../constants/metrics';

const SectionTitle = ({ title, style }) => {
    return <Text style={[styles.title, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 12,
    },
});

export default SectionTitle;

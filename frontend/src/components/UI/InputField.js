import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { METRICS } from '../../constants/metrics';

const InputField = ({ label, value, onChangeText, placeholder, keyboardType, multiline, style }) => {
    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, multiline && styles.multiline]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                multiline={multiline}
                placeholderTextColor={COLORS.darkGray}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: METRICS.borderRadius,
        padding: 12,
        fontSize: 16,
        color: COLORS.text,
    },
    multiline: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default InputField;

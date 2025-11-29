import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const Chip = ({ label, selected, onPress, style }) => {
    return (
        <TouchableOpacity
            style={[
                styles.chip,
                selected ? styles.selectedChip : styles.unselectedChip,
                style,
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.text,
                    selected ? styles.selectedText : styles.unselectedText,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
    },
    selectedChip: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    unselectedChip: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.lightGray,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
    },
    selectedText: {
        color: COLORS.white,
    },
    unselectedText: {
        color: COLORS.darkGray,
    },
});

export default Chip;


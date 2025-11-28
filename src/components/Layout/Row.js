import React from 'react';
import { View, StyleSheet } from 'react-native';

const Row = ({ children, style, justifyContent = 'space-between', alignItems = 'center' }) => {
    return (
        <View style={[styles.row, { justifyContent, alignItems }, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
});

export default Row;

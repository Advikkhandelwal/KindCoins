import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PerformanceCard = (props) => {
    return (
        <View style={styles.container}>
            <Text>PerformanceCard (Placeholder)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        margin: 10,
    },
});

export default PerformanceCard;

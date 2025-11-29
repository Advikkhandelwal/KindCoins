import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderComponent = ({ name }) => {
    return (
        <View style={styles.container}>
            <Text>Component: {name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 5,
    },
});

export default PlaceholderComponent;

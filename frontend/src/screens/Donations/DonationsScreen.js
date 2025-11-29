import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// API URL is handled in DonationContext

import { useDonation } from '../../context/DonationContext';

const DonationsScreen = ({ navigation }) => {
    const { donations, fetchDonations } = useDonation();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false); // Context handles initial load, but we can keep local loading for refresh if needed

    useFocusEffect(
        useCallback(() => {
            fetchDonations();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchDonations();
        setRefreshing(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EditDonation', { donation: item })}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.donorName}>{item.donorName}</Text>
                <Text style={styles.amount}>₹{item.amount}</Text>
            </View>
            <Text style={styles.campaign}>
                Campaign: {item.campaign ? item.campaign.name : 'General'}
            </Text>
            <View style={styles.metaRow}>
                <Text style={styles.metaText}>{item.paymentMode}</Text>
                <Text style={styles.metaText}> • </Text>
                <Text style={styles.metaText}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Donations</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddDonation')}>
                    <Ionicons name="add-circle" size={32} color="#4CAF50" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
            ) : (
                <FlatList
                    data={donations}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No donations found. Add one!</Text>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    donorName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    campaign: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        fontSize: 12,
        color: '#999',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    loader: {
        marginTop: 50,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#666',
    },
});

export default DonationsScreen;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const API_URL = 'http://localhost:5001/api/donations/analytics';

const AnalyticsScreen = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchAnalytics = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setAnalytics(data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchAnalytics();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchAnalytics();
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Text style={styles.title}>Analytics</Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Total Donations</Text>
                    <Text style={styles.bigNumber}>₹{analytics?.total?.totalAmount || 0}</Text>
                    <Text style={styles.subText}>{analytics?.total?.count || 0} donations</Text>
                </View>

                <Text style={styles.sectionTitle}>By Campaign</Text>
                {analytics?.byCampaign?.length > 0 ? (
                    analytics.byCampaign.map((item, index) => (
                        <View key={index} style={styles.rowCard}>
                            <View>
                                <Text style={styles.campaignName}>{item.campaignName || 'Unknown Campaign'}</Text>
                                <Text style={styles.campaignCount}>{item.count} donations</Text>
                            </View>
                            <Text style={styles.campaignAmount}>₹{item.totalAmount}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>No campaign data available.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    card: {
        backgroundColor: '#4CAF50',
        padding: 24,
        borderRadius: 16,
        marginBottom: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    cardTitle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 18,
        marginBottom: 8,
    },
    bigNumber: {
        color: '#fff',
        fontSize: 48,
        fontWeight: 'bold',
    },
    subText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    rowCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    campaignName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    campaignCount: {
        fontSize: 14,
        color: '#888',
    },
    campaignAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
    },
});

export default AnalyticsScreen;

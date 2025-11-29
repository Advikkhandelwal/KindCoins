import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://localhost:5001/api/donations/leaderboard';

const LeaderboardScreen = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setLeaderboard(data);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchLeaderboard();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchLeaderboard();
    };

    const renderItem = ({ item, index }) => {
        let rankColor = '#333';
        let iconName = null;

        if (index === 0) {
            rankColor = '#FFD700'; // Gold
            iconName = 'trophy';
        } else if (index === 1) {
            rankColor = '#C0C0C0'; // Silver
            iconName = 'medal';
        } else if (index === 2) {
            rankColor = '#CD7F32'; // Bronze
            iconName = 'medal-outline';
        }

        return (
            <View style={styles.card}>
                <View style={styles.rankContainer}>
                    {iconName ? (
                        <Ionicons name={iconName} size={24} color={rankColor} />
                    ) : (
                        <Text style={styles.rankText}>#{index + 1}</Text>
                    )}
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item._id || 'Anonymous'}</Text>
                    <Text style={styles.amount}>₹{item.totalDonated}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Leaderboard</Text>
                <Text style={styles.subtitle}>Top Contributors</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#FF8A65" style={styles.loader} />
            ) : (
                <FlatList
                    data={leaderboard}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No donations yet. Be the first!</Text>
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
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    list: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    rankText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF8A65',
    },
    loader: {
        marginTop: 50,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
    },
});

export default LeaderboardScreen;

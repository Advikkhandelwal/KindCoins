import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { PieChart } from 'react-native-chart-kit';

import { API_BASE_URL } from '../../constants/config';

const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchAnalytics = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/donations/analytics`);
            const data = await response.json();
            console.log("Frontend Analytics Data:", JSON.stringify(data, null, 2));
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
                <ActivityIndicator size="large" color="#FF8A65" />
            </View>
        );
    }

    const maxAmount = analytics?.byCampaign?.reduce((max, item) => Math.max(max, item.totalAmount), 0) || 1;

    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    const chartData = analytics?.byCampaign?.map((item, index) => ({
        name: item.campaignName,
        population: item.totalAmount,
        color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'][index % 6],
        legendFontColor: '#7F7F7F',
        legendFontSize: 12
    })) || [];

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

                {chartData.length > 0 && (
                    <View style={styles.chartContainer}>
                        <Text style={styles.sectionTitle}>Distribution</Text>
                        <PieChart
                            data={chartData}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"0"}
                            center={[screenWidth / 4, 0]}
                            absolute
                            hasLegend={false}
                        />
                        <View style={styles.legendContainer}>
                            {chartData.map((item, index) => (
                                <View key={index} style={styles.legendItem}>
                                    <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                                    <View style={styles.legendTextContainer}>
                                        <Text style={styles.legendLabel}>{item.name}</Text>
                                        <Text style={styles.legendValue}>
                                            ₹{item.population} ({((item.population / analytics.total.totalAmount) * 100).toFixed(1)}%)
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                <Text style={styles.sectionTitle}>Contributions by Campaign</Text>
                {analytics?.byCampaign?.length > 0 ? (
                    analytics.byCampaign.map((item, index) => {
                        const percentage = (item.totalAmount / analytics.total.totalAmount) * 100;
                        const width = (item.totalAmount / maxAmount) * 100;

                        return (
                            <View key={index} style={styles.campaignContainer}>
                                <View style={styles.rowHeader}>
                                    <Text style={styles.campaignName}>{item.campaignName || 'Unknown'}</Text>
                                    <Text style={styles.campaignAmount}>₹{item.totalAmount}</Text>
                                </View>
                                <Text style={styles.campaignCount}>{item.count} donations ({percentage.toFixed(1)}%)</Text>
                            </View>
                        );
                    })
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
    card: { // Pastel Coral - Warm & Caring
        backgroundColor: '#FF8A65',
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
    chartContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    campaignContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    campaignName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    campaignAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF8A65',
    },
    barBackground: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginBottom: 8,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        backgroundColor: '#FF8A65',
        borderRadius: 4,
    },
    campaignCount: {
        fontSize: 12,
        color: '#91af23ff',
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
    },
    legendContainer: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    legendColor: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 12,
    },
    legendTextContainer: {
        flex: 1,
    },
    legendLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    legendValue: {
        fontSize: 12,
        color: '#666',
    },
});

export default AnalyticsScreen;

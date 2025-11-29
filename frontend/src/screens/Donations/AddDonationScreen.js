import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { API_BASE_URL } from '../../constants/config';

const API_URL = `${API_BASE_URL}/donations/add`;
const CAMPAIGNS_URL = `${API_BASE_URL}/campaigns`;

const AddDonationScreen = ({ navigation, route }) => {
    const [donorName, setDonorName] = useState('');
    const [amount, setAmount] = useState('');
    const [campaign, setCampaign] = useState(null);
    const [paymentMode, setPaymentMode] = useState('UPI');
    const [donorType, setDonorType] = useState('Individual');
    const [notes, setNotes] = useState('');

    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [campaignModalVisible, setCampaignModalVisible] = useState(false);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await fetch(CAMPAIGNS_URL);
            const data = await response.json();
            setCampaigns(data);

            if (route.params?.campaignId) {
                const preSelected = data.find(c => c._id === route.params.campaignId);
                if (preSelected) setCampaign(preSelected);
            }
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    const handleAddDonation = async () => {
        if (!donorName || !amount || !campaign) {
            Alert.alert('Error', 'Please fill in all required fields (Name, Amount, Campaign)');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    donorName,
                    amount: parseFloat(amount),
                    campaign: campaign._id,
                    paymentMode,
                    donorType,
                    notes,
                    date: new Date(),
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Donation added successfully');
                navigation.goBack();
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to add donation');
            }
        } catch (error) {
            console.error('Error adding donation:', error);
            Alert.alert('Error', 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const renderSelectionButton = (label, value, currentValue, setValue) => (
        <TouchableOpacity
            style={[styles.selectionButton, currentValue === value && styles.selectionButtonActive]}
            onPress={() => setValue(value)}
        >
            <Text style={[styles.selectionButtonText, currentValue === value && styles.selectionButtonTextActive]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Donation</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Donor Name *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter donor name"
                        value={donorName}
                        onChangeText={setDonorName}
                    />

                    <Text style={styles.label}>Amount (₹) *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Campaign *</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setCampaignModalVisible(true)}
                    >
                        <Text style={campaign ? styles.dropdownText : styles.dropdownPlaceholder}>
                            {campaign ? campaign.name : 'Select Campaign'}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#666" />
                    </TouchableOpacity>

                    <Text style={styles.label}>Payment Mode *</Text>
                    <View style={styles.selectionRow}>
                        {renderSelectionButton('UPI', 'UPI', paymentMode, setPaymentMode)}
                        {renderSelectionButton('Cash', 'Cash', paymentMode, setPaymentMode)}
                        {renderSelectionButton('Bank', 'Bank', paymentMode, setPaymentMode)}
                    </View>

                    <Text style={styles.label}>Donor Type *</Text>
                    <View style={styles.selectionRow}>
                        {renderSelectionButton('Individual', 'Individual', donorType, setDonorType)}
                        {renderSelectionButton('Corporate', 'Corporate', donorType, setDonorType)}
                    </View>

                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Add notes (optional)"
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        numberOfLines={3}
                    />

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleAddDonation}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>{loading ? 'Adding...' : 'Add Donation'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal visible={campaignModalVisible} animationType="slide">
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Campaign</Text>
                        <TouchableOpacity onPress={() => setCampaignModalVisible(false)}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={campaigns}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => {
                                    setCampaign(item);
                                    setCampaignModalVisible(false);
                                }}
                            >
                                <Text style={styles.modalItemText}>{item.name}</Text>
                                {item.targetAmount && <Text style={styles.modalItemSub}>Target: ${item.targetAmount}</Text>}
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={<Text style={styles.emptyText}>No campaigns found.</Text>}
                    />
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 14,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 14,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
    dropdownPlaceholder: {
        fontSize: 16,
        color: '#999',
    },
    selectionRow: {
        flexDirection: 'row',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 10,
    },
    selectionButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    selectionButtonActive: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    selectionButtonText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    selectionButtonTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: '#a5d6a7',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50, // Avoid status bar
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalItemText: {
        fontSize: 18,
        color: '#333',
    },
    modalItemSub: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
    },
});

export default AddDonationScreen;

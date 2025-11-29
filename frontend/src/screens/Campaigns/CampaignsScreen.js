import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import GradientHeader from '../../components/UI/GradientHeader';
import CampaignCard from '../../components/Cards/CampaignCard';
import { useCampaign } from '../../context/CampaignContext';
import { METRICS } from '../../constants/metrics';

const CampaignsScreen = ({ navigation }) => {
    const { campaigns } = useCampaign();

    return (
        <ScreenWrapper>
            <GradientHeader
                title="Campaigns"
                subtitle="Support causes that matter"
                showBack={true}
            />
            <View style={styles.container}>
                <FlatList
                    data={campaigns}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <CampaignCard
                            campaign={item}
                            onPress={() => navigation.navigate('CampaignDetails', { campaign: item })}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: METRICS.padding,
    },
});

export default CampaignsScreen;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const ProgressBar = ({ progress, height = 8, color = COLORS.primary, trackColor = COLORS.lightGray }) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);

    return (
        <View style={[styles.track, { height, backgroundColor: trackColor }]}>
            <View
                style={[
                    styles.fill,
                    { width: `${clampedProgress * 100}%`, backgroundColor: color },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    track: {
        width: '100%',
        borderRadius: 4,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 4,
    },
});

export default ProgressBar;

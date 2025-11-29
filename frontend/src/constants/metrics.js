import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const METRICS = {
    screenWidth: width,
    screenHeight: height,
    padding: 16,
    borderRadius: 12,
    iconSize: 24,
    headerHeight: 60,
};

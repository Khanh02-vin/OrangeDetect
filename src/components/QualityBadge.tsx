import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

interface QualityBadgeProps {
  isGoodQuality: boolean;
  hasMold?: boolean;
  confidence?: number;
  size?: 'small' | 'medium' | 'large';
}

export const QualityBadge: React.FC<QualityBadgeProps> = ({
  isGoodQuality,
  hasMold = false,
  confidence,
  size = 'medium',
}) => {
  const getBadgeInfo = () => {
    if (hasMold) {
      return {
        text: 'Mold Detected',
        color: Colors.mold,
        backgroundColor: Colors.mold + '20',
      };
    }
    
    if (isGoodQuality) {
      return {
        text: 'Good Quality',
        color: Colors.goodQuality,
        backgroundColor: Colors.goodQuality + '20',
      };
    }
    
    return {
      text: 'Bad Quality',
      color: Colors.badQuality,
      backgroundColor: Colors.badQuality + '20',
    };
  };

  const badgeInfo = getBadgeInfo();

  return (
    <View style={[styles.container, styles[size], { backgroundColor: badgeInfo.backgroundColor }]}>
      <View style={[styles.dot, { backgroundColor: badgeInfo.color }]} />
      <Text style={[styles.text, styles[`${size}Text`], { color: badgeInfo.color }]}>
        {badgeInfo.text}
      </Text>
      {confidence && (
        <Text style={[styles.confidence, styles[`${size}Confidence`]]}>
          {Math.round(confidence * 100)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  
  // Sizes
  small: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  large: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  
  text: {
    fontWeight: '600',
    flex: 1,
  },
  
  // Text sizes
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  
  confidence: {
    marginLeft: 4,
    opacity: 0.8,
  },
  
  // Confidence sizes
  smallConfidence: {
    fontSize: 10,
  },
  mediumConfidence: {
    fontSize: 12,
  },
  largeConfidence: {
    fontSize: 14,
  },
});

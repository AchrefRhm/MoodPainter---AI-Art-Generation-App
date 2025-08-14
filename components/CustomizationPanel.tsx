import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';

interface CustomizationPanelProps {
  complexity: number;
  onComplexityChange: (value: number) => void;
}

export default function CustomizationPanel({ complexity, onComplexityChange }: CustomizationPanelProps) {
  const panelOpacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: panelOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>Customize Your Art</Text>
      
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Complexity</Text>
        <Text style={styles.sliderValue}>{Math.round(complexity * 100)}%</Text>
      </View>
      
      <Slider
        style={styles.slider}
        minimumValue={0.1}
        maximumValue={1}
        value={complexity}
        onValueChange={onComplexityChange}
        minimumTrackTintColor="#3498DB"
        maximumTrackTintColor="#BDC3C7"
        thumbStyle={styles.thumb}
      />
      
      <Text style={styles.description}>
        Adjust complexity to control the detail level of your artwork
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  sliderValue: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 12,
  },
  thumb: {
    backgroundColor: '#3498DB',
    borderRadius: 10,
    height: 20,
    width: 20,
  },
  description: {
    fontSize: 12,
    color: '#95A5A6',
    textAlign: 'center',
    lineHeight: 16,
  },
});
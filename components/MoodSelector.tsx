import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { Mood } from '@/types/mood';
import { MOODS } from '@/constants/moods';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 60) / 2;

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

export default function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      <View style={styles.grid}>
        {MOODS.map((mood) => (
          <MoodItem
            key={mood.id}
            mood={mood}
            isSelected={selectedMood?.id === mood.id}
            onSelect={() => onMoodSelect(mood)}
          />
        ))}
      </View>
    </View>
  );
}

interface MoodItemProps {
  mood: Mood;
  isSelected: boolean;
  onSelect: () => void;
}

function MoodItem({ mood, isSelected, onSelect }: MoodItemProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(1);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(0.8);
  };

  return (
    <TouchableOpacity
      onPress={onSelect}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          styles.moodItem,
          { backgroundColor: mood.color },
          isSelected && styles.selectedMood,
          animatedStyle,
        ]}
      >
        <Text style={styles.emoji}>{mood.emoji}</Text>
        <Text style={styles.moodName}>{mood.name}</Text>
        <Text style={styles.moodDescription}>{mood.description}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#2C3E50',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedMood: {
    borderWidth: 3,
    borderColor: '#2C3E50',
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  moodDescription: {
    fontSize: 12,
    color: '#34495E',
    textAlign: 'center',
    lineHeight: 16,
  },
});
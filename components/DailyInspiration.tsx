import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, ArrowRight } from 'lucide-react-native';
import { DailyInspiration as DailyInspirationType } from '@/types/mood';

interface DailyInspirationProps {
  inspiration: DailyInspirationType;
  onUseInspiration: () => void;
}

export default function DailyInspiration({ inspiration, onUseInspiration }: DailyInspirationProps) {
  return (
    <LinearGradient
      colors={[inspiration.mood.color + '20', inspiration.mood.color + '10']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Sparkles size={24} color={inspiration.mood.color} />
        <Text style={styles.title}>Daily Inspiration</Text>
      </View>
      
      <Text style={styles.prompt}>{inspiration.prompt}</Text>
      
      <View style={styles.moodInfo}>
        <Text style={styles.emoji}>{inspiration.mood.emoji}</Text>
        <View style={styles.moodDetails}>
          <Text style={styles.moodName}>{inspiration.mood.name}</Text>
          <Text style={styles.keywords}>
            {inspiration.keywords.join(' • ')}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.useButton} onPress={onUseInspiration}>
        <Text style={styles.useButtonText}>Create with this inspiration</Text>
        <ArrowRight size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
  },
  prompt: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  moodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  moodDetails: {
    flex: 1,
  },
  moodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  keywords: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  useButton: {
    backgroundColor: '#3498DB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  useButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export { DailyInspiration }
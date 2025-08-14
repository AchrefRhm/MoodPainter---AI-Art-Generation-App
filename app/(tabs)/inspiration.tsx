import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { RefreshCw, Calendar, Sparkles } from 'lucide-react-native';
import { DailyInspiration as DailyInspirationComponent } from '@/components/DailyInspiration';
import { DailyInspiration as DailyInspirationType } from '@/types/mood';
import { InspirationGenerator } from '@/utils/inspiration';
import { StorageManager } from '@/utils/storage';
import { router } from 'expo-router';

export default function InspirationScreen() {
  const [dailyInspiration, setDailyInspiration] = useState<DailyInspirationType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadDailyInspiration = async () => {
    try {
      const saved = await StorageManager.getDailyInspiration();
      
      if (!saved || InspirationGenerator.shouldGenerateNewInspiration(saved)) {
        const newInspiration = InspirationGenerator.generateDailyInspiration();
        await StorageManager.saveDailyInspiration(newInspiration);
        setDailyInspiration(newInspiration);
      } else {
        setDailyInspiration(saved);
      }
    } catch (error) {
      console.error('Error loading daily inspiration:', error);
      // Fallback to generating new inspiration
      const newInspiration = InspirationGenerator.generateDailyInspiration();
      setDailyInspiration(newInspiration);
    } finally {
      setIsLoading(false);
    }
  };

  const generateNewInspiration = async () => {
    setIsLoading(true);
    const newInspiration = InspirationGenerator.generateDailyInspiration();
    try {
      await StorageManager.saveDailyInspiration(newInspiration);
      setDailyInspiration(newInspiration);
    } catch (error) {
      console.error('Error saving new inspiration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const useInspiration = () => {
    if (dailyInspiration) {
      // Navigate to create tab with inspiration data
      router.navigate('/(tabs)/');
      Alert.alert(
        'Inspiration Applied',
        `Your mood has been set to ${dailyInspiration.mood.name}. Start creating!`
      );
    }
  };

  useEffect(() => {
    loadDailyInspiration();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Daily Inspiration</Text>
            <Text style={styles.subtitle}>Discover new creative directions</Text>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Generating inspiration...</Text>
            </View>
          ) : dailyInspiration ? (
            <DailyInspirationComponent
              inspiration={dailyInspiration}
              onUseInspiration={useInspiration}
            />
          ) : null}

          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={generateNewInspiration}
              disabled={isLoading}
            >
              <RefreshCw size={20} color="#3498DB" />
              <Text style={styles.refreshButtonText}>New Inspiration</Text>
            </TouchableOpacity>

            <View style={styles.tipContainer}>
              <Sparkles size={16} color="#E67E22" />
              <Text style={styles.tipText}>
                Each inspiration is unique and designed to spark your creativity in new ways
              </Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <LinearGradient
              colors={['#3498DB10', '#9B59B610']}
              style={styles.statsCard}
            >
              <Calendar size={24} color="#3498DB" />
              <Text style={styles.statsTitle}>Creative Journey</Text>
              <Text style={styles.statsDescription}>
                Daily inspirations help you explore different emotional expressions and artistic styles
              </Text>
            </LinearGradient>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  actionSection: {
    padding: 20,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#3498DB',
    marginBottom: 20,
  },
  refreshButtonText: {
    color: '#3498DB',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF9E7',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#E67E22',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#8B4513',
    lineHeight: 20,
    marginLeft: 8,
  },
  statsContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 8,
    marginBottom: 8,
  },
  statsDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
  },
});
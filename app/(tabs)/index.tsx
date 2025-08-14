import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Wand as Wand2, Save, RefreshCw } from 'lucide-react-native';
import { Mood, ArtStyle, ArtworkConfig } from '@/types/mood';
import { MOODS, ART_STYLES } from '@/constants/moods';
import { ArtGenerator } from '@/utils/artGenerator';
import { StorageManager } from '@/utils/storage';
import MoodSelector from '@/components/MoodSelector';
import StyleSelector from '@/components/StyleSelector';
import ArtworkCanvas from '@/components/ArtworkCanvas';
import CustomizationPanel from '@/components/CustomizationPanel';

export default function CreateScreen() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>(ART_STYLES[0]);
  const [keywords, setKeywords] = useState<string>('');
  const [complexity, setComplexity] = useState<number>(0.5);
  const [currentArtwork, setCurrentArtwork] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const triggerHaptics = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const generateArtwork = async () => {
    if (!selectedMood) {
      Alert.alert('Select a Mood', 'Please select your current mood first');
      return;
    }

    triggerHaptics();
    setIsGenerating(true);

    // Simulate generation time for better UX
    setTimeout(() => {
      const config: ArtworkConfig = {
        mood: selectedMood,
        keywords: keywords.split(',').map(k => k.trim()).filter(k => k.length > 0),
        style: selectedStyle,
        colorPalette: [],
        complexity,
      };

      const artwork = ArtGenerator.generateArtwork(config);
      setCurrentArtwork(artwork.svgData);
      setIsGenerating(false);
    }, 1500);
  };

  const saveArtwork = async () => {
    if (!currentArtwork || !selectedMood) {
      Alert.alert('No Artwork', 'Generate an artwork first before saving');
      return;
    }

    try {
      const config: ArtworkConfig = {
        mood: selectedMood,
        keywords: keywords.split(',').map(k => k.trim()).filter(k => k.length > 0),
        style: selectedStyle,
        colorPalette: [],
        complexity,
      };

      const artwork = ArtGenerator.generateArtwork(config);
      artwork.svgData = currentArtwork; // Use the current displayed artwork

      await StorageManager.saveArtwork(artwork);
      triggerHaptics();
      Alert.alert('Saved!', 'Your artwork has been saved to the gallery');
    } catch (error) {
      Alert.alert('Error', 'Failed to save artwork');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.appTitle}>MoodPainter</Text>
            <Text style={styles.subtitle}>Transform your emotions into art</Text>
          </View>

          <MoodSelector
            selectedMood={selectedMood}
            onMoodSelect={setSelectedMood}
          />

          <View style={styles.keywordsSection}>
            <Text style={styles.sectionTitle}>Keywords (optional)</Text>
            <TextInput
              style={styles.keywordsInput}
              placeholder="nature, peaceful, flowing..."
              value={keywords}
              onChangeText={setKeywords}
              multiline
            />
          </View>

          <StyleSelector
            selectedStyle={selectedStyle}
            onStyleSelect={setSelectedStyle}
          />

          <CustomizationPanel
            complexity={complexity}
            onComplexityChange={setComplexity}
          />

          <ArtworkCanvas svgData={currentArtwork} isGenerating={isGenerating} />

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.generateButton]}
              onPress={generateArtwork}
              disabled={!selectedMood || isGenerating}
            >
              {isGenerating ? (
                <RefreshCw size={20} color="#FFFFFF" />
              ) : (
                <Wand2 size={20} color="#FFFFFF" />
              )}
              <Text style={styles.buttonText}>
                {isGenerating ? 'Generating...' : 'Generate Art'}
              </Text>
            </TouchableOpacity>

            {currentArtwork && (
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={saveArtwork}
              >
                <Save size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Save Artwork</Text>
              </TouchableOpacity>
            )}
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
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  keywordsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  keywordsInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#E1E8ED',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  actionButtons: {
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  generateButton: {
    backgroundColor: '#3498DB',
  },
  saveButton: {
    backgroundColor: '#27AE60',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
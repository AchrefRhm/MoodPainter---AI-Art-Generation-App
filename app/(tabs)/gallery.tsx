import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Artwork } from '@/types/mood';
import { StorageManager } from '@/utils/storage';
import ArtworkGallery from '@/components/ArtworkGallery';

export default function GalleryScreen() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadArtworks = async () => {
    try {
      const savedArtworks = await StorageManager.getArtworks();
      setArtworks(savedArtworks);
    } catch (error) {
      console.error('Error loading artworks:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadArtworks();
    setRefreshing(false);
  };

  const handleArtworkDelete = async (artworkId: string) => {
    try {
      await StorageManager.deleteArtwork(artworkId);
      await loadArtworks();
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Gallery</Text>
          <Text style={styles.subtitle}>
            {artworks.length} artwork{artworks.length !== 1 ? 's' : ''} created
          </Text>
        </View>

        <ArtworkGallery
          artworks={artworks}
          onArtworkDelete={handleArtworkDelete}
        />
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
});
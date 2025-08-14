import AsyncStorage from '@react-native-async-storage/async-storage';
import { Artwork, DailyInspiration } from '@/types/mood';

const STORAGE_KEYS = {
  ARTWORKS: 'moodpainter_artworks',
  DAILY_INSPIRATION: 'moodpainter_daily_inspiration',
  USER_PREFERENCES: 'moodpainter_preferences',
};

export class StorageManager {
  static async saveArtwork(artwork: Artwork): Promise<void> {
    try {
      const existingArtworks = await this.getArtworks();
      const updatedArtworks = [artwork, ...existingArtworks];
      await AsyncStorage.setItem(STORAGE_KEYS.ARTWORKS, JSON.stringify(updatedArtworks));
    } catch (error) {
      console.error('Error saving artwork:', error);
      throw error;
    }
  }

  static async getArtworks(): Promise<Artwork[]> {
    try {
      const artworksJson = await AsyncStorage.getItem(STORAGE_KEYS.ARTWORKS);
      if (!artworksJson) return [];
      
      const artworks = JSON.parse(artworksJson);
      return artworks.map((artwork: any) => ({
        ...artwork,
        createdAt: new Date(artwork.createdAt),
      }));
    } catch (error) {
      console.error('Error loading artworks:', error);
      return [];
    }
  }

  static async deleteArtwork(artworkId: string): Promise<void> {
    try {
      const artworks = await this.getArtworks();
      const filteredArtworks = artworks.filter(artwork => artwork.id !== artworkId);
      await AsyncStorage.setItem(STORAGE_KEYS.ARTWORKS, JSON.stringify(filteredArtworks));
    } catch (error) {
      console.error('Error deleting artwork:', error);
      throw error;
    }
  }

  static async saveDailyInspiration(inspiration: DailyInspiration): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.DAILY_INSPIRATION, JSON.stringify(inspiration));
    } catch (error) {
      console.error('Error saving daily inspiration:', error);
      throw error;
    }
  }

  static async getDailyInspiration(): Promise<DailyInspiration | null> {
    try {
      const inspirationJson = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_INSPIRATION);
      return inspirationJson ? JSON.parse(inspirationJson) : null;
    } catch (error) {
      console.error('Error loading daily inspiration:', error);
      return null;
    }
  }
}
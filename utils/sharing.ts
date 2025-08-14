import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Artwork } from '@/types/mood';

export class SharingManager {
  static async shareArtwork(artwork: Artwork): Promise<void> {
    try {
      // Convert SVG to a shareable format
      const svgContent = artwork.svgData;
      const fileName = `${artwork.title.replace(/\s+/g, '_')}.svg`;
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

      await FileSystem.writeAsStringAsync(fileUri, svgContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'image/svg+xml',
          dialogTitle: `Share ${artwork.title}`,
        });
      } else {
        throw new Error('Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error sharing artwork:', error);
      throw error;
    }
  }

  static async saveToGallery(artwork: Artwork): Promise<void> {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Media library permission not granted');
      }

      const svgContent = artwork.svgData;
      const fileName = `MoodPainter_${artwork.title.replace(/\s+/g, '_')}.svg`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.writeAsStringAsync(fileUri, svgContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      await MediaLibrary.saveToLibraryAsync(fileUri);
    } catch (error) {
      console.error('Error saving to gallery:', error);
      throw error;
    }
  }
}
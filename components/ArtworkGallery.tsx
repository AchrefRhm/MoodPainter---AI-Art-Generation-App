import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Trash2, Share, Download } from 'lucide-react-native';
import { Artwork } from '@/types/mood';
import { SharingManager } from '@/utils/sharing';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 60) / 2;

interface ArtworkGalleryProps {
  artworks: Artwork[];
  onArtworkDelete: (artworkId: string) => void;
  onArtworkSelect?: (artwork: Artwork) => void;
}

export default function ArtworkGallery({ artworks, onArtworkDelete, onArtworkSelect }: ArtworkGalleryProps) {
  const handleShare = async (artwork: Artwork) => {
    try {
      await SharingManager.shareArtwork(artwork);
    } catch (error) {
      Alert.alert('Error', 'Failed to share artwork');
    }
  };

  const handleSaveToGallery = async (artwork: Artwork) => {
    try {
      await SharingManager.saveToGallery(artwork);
      Alert.alert('Success', 'Artwork saved to gallery');
    } catch (error) {
      Alert.alert('Error', 'Failed to save artwork to gallery');
    }
  };

  const handleDelete = (artwork: Artwork) => {
    Alert.alert(
      'Delete Artwork',
      `Are you sure you want to delete "${artwork.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onArtworkDelete(artwork.id) },
      ]
    );
  };

  const renderArtwork = ({ item }: { item: Artwork }) => (
    <TouchableOpacity
      style={styles.artworkItem}
      onPress={() => onArtworkSelect?.(item)}
    >
      <View style={styles.artworkCanvas}>
        <SvgXml xml={item.svgData} width={ITEM_SIZE - 20} height={ITEM_SIZE - 60} />
      </View>
      <Text style={styles.artworkTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.artworkDate}>
        {item.createdAt.toLocaleDateString()}
      </Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleShare(item)} style={styles.actionButton}>
          <Share size={16} color="#7F8C8D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSaveToGallery(item)} style={styles.actionButton}>
          <Download size={16} color="#7F8C8D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.actionButton}>
          <Trash2 size={16} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (artworks.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No artworks yet</Text>
        <Text style={styles.emptyDescription}>
          Create your first mood-based artwork by visiting the Create tab
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={artworks}
      renderItem={renderArtwork}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  artworkItem: {
    width: ITEM_SIZE,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  artworkCanvas: {
    width: ITEM_SIZE,
    height: ITEM_SIZE - 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  artworkDate: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    padding: 6,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 22,
  },
});
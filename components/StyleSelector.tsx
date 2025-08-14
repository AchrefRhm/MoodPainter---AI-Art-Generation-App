import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArtStyle } from '@/types/mood';
import { ART_STYLES } from '@/constants/moods';

interface StyleSelectorProps {
  selectedStyle: ArtStyle;
  onStyleSelect: (style: ArtStyle) => void;
}

export default function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Art Style</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {ART_STYLES.map((style) => (
          <TouchableOpacity
            key={style.id}
            onPress={() => onStyleSelect(style)}
            style={[
              styles.styleItem,
              selectedStyle.id === style.id && styles.selectedStyle,
            ]}
          >
            <Text style={[
              styles.styleName,
              selectedStyle.id === style.id && styles.selectedStyleText,
            ]}>
              {style.name}
            </Text>
            <Text style={[
              styles.styleDescription,
              selectedStyle.id === style.id && styles.selectedStyleText,
            ]}>
              {style.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  scrollView: {
    flexDirection: 'row',
  },
  styleItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 120,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedStyle: {
    backgroundColor: '#3498DB',
    borderColor: '#2980B9',
  },
  styleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  styleDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    lineHeight: 16,
  },
  selectedStyleText: {
    color: '#FFFFFF',
  },
});
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width - 40;

interface ArtworkCanvasProps {
  svgData: string;
  isGenerating?: boolean;
}

export default function ArtworkCanvas({ svgData, isGenerating = false }: ArtworkCanvasProps) {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (isGenerating) {
      scale.value = withSpring(0.9);
    } else {
      scale.value = withSpring(1);
    }
  }, [isGenerating]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.canvas, animatedStyle]}>
        {svgData ? (
          <SvgXml xml={svgData} width={CANVAS_SIZE} height={CANVAS_SIZE} />
        ) : (
          <View style={styles.placeholder}>
            {/* Empty state */}
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  canvas: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});
import { Mood, ArtStyle } from '@/types/mood';

export const MOODS: Mood[] = [
  {
    id: 'happy',
    name: 'Happy',
    color: '#FFD93D',
    description: 'Bright, energetic, and joyful',
    emoji: '😊',
  },
  {
    id: 'calm',
    name: 'Calm',
    color: '#6BCF7F',
    description: 'Peaceful, serene, and balanced',
    emoji: '😌',
  },
  {
    id: 'energetic',
    name: 'Energetic',
    color: '#FF6B6B',
    description: 'Dynamic, vibrant, and powerful',
    emoji: '⚡',
  },
  {
    id: 'creative',
    name: 'Creative',
    color: '#9B59B6',
    description: 'Imaginative, artistic, and inspired',
    emoji: '🎨',
  },
  {
    id: 'melancholy',
    name: 'Melancholy',
    color: '#546E7A',
    description: 'Thoughtful, introspective, and deep',
    emoji: '🌧️',
  },
  {
    id: 'mysterious',
    name: 'Mysterious',
    color: '#2C3E50',
    description: 'Enigmatic, dark, and profound',
    emoji: '🌙',
  },
];

export const ART_STYLES: ArtStyle[] = [
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Flowing shapes and organic forms',
  },
  {
    id: 'geometric',
    name: 'Geometric',
    description: 'Sharp angles and structured patterns',
  },
  {
    id: 'mandala',
    name: 'Mandala',
    description: 'Circular, meditative patterns',
  },
  {
    id: 'waves',
    name: 'Waves',
    description: 'Fluid, wave-like movements',
  },
];

export const COLOR_PALETTES = {
  happy: ['#FFD93D', '#FF6B6B', '#4ECDC4', '#95E1D3'],
  calm: ['#6BCF7F', '#96CEB4', '#FFEAA7', '#DDA0DD'],
  energetic: ['#FF6B6B', '#FF8E53', '#FF6348', '#FFA502'],
  creative: ['#9B59B6', '#E17055', '#74B9FF', '#00CEC9'],
  melancholy: ['#546E7A', '#8395A7', '#B8860B', '#708090'],
  mysterious: ['#2C3E50', '#34495E', '#7F8C8D', '#95A5A6'],
};
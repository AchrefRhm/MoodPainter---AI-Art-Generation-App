export interface Mood {
  id: string;
  name: string;
  color: string;
  description: string;
  emoji: string;
}

export interface ArtworkConfig {
  mood: Mood;
  keywords: string[];
  style: ArtStyle;
  colorPalette: string[];
  complexity: number;
}

export interface ArtStyle {
  id: string;
  name: string;
  description: string;
}

export interface Artwork {
  id: string;
  title: string;
  config: ArtworkConfig;
  createdAt: Date;
  svgData: string;
  thumbnail: string;
}

export interface DailyInspiration {
  date: string;
  prompt: string;
  mood: Mood;
  keywords: string[];
}
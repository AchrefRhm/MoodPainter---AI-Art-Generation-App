import { DailyInspiration } from '@/types/mood';
import { MOODS } from '@/constants/moods';

const INSPIRATION_PROMPTS = [
  "What does your morning energy feel like?",
  "Capture the essence of your current thoughts",
  "Visualize your inner weather today",
  "Express the color of your emotions",
  "Paint your dreams from last night",
  "What shape does your mood take?",
  "Transform your feelings into flowing art",
  "Create something that represents your spirit",
  "Design your emotional landscape",
  "What patterns emerge from your heart?",
];

const KEYWORD_SETS = [
  ['flowing', 'gentle', 'soft'],
  ['bold', 'striking', 'powerful'],
  ['mysterious', 'deep', 'ethereal'],
  ['bright', 'radiant', 'luminous'],
  ['peaceful', 'tranquil', 'serene'],
  ['dynamic', 'energetic', 'vibrant'],
  ['dreamy', 'whimsical', 'floating'],
  ['grounded', 'stable', 'strong'],
];

export class InspirationGenerator {
  static generateDailyInspiration(): DailyInspiration {
    const today = new Date().toISOString().split('T')[0];
    const prompt = INSPIRATION_PROMPTS[Math.floor(Math.random() * INSPIRATION_PROMPTS.length)];
    const mood = MOODS[Math.floor(Math.random() * MOODS.length)];
    const keywords = KEYWORD_SETS[Math.floor(Math.random() * KEYWORD_SETS.length)];

    return {
      date: today,
      prompt,
      mood,
      keywords,
    };
  }

  static shouldGenerateNewInspiration(lastInspiration: DailyInspiration | null): boolean {
    if (!lastInspiration) return true;
    
    const today = new Date().toISOString().split('T')[0];
    return lastInspiration.date !== today;
  }
}
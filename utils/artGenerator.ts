import { ArtworkConfig, Artwork } from '@/types/mood';
import { COLOR_PALETTES } from '@/constants/moods';

export class ArtGenerator {
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  static generateArtwork(config: ArtworkConfig): Artwork {
    const svgData = this.generateSVG(config);
    const thumbnail = this.generateThumbnail(svgData);
    
    return {
      id: this.generateId(),
      title: this.generateTitle(config),
      config,
      createdAt: new Date(),
      svgData,
      thumbnail,
    };
  }

  private static generateSVG(config: ArtworkConfig): string {
    const { mood, style, complexity } = config;
    const colors = COLOR_PALETTES[mood.id as keyof typeof COLOR_PALETTES] || COLOR_PALETTES.happy;
    
    const width = 400;
    const height = 400;
    let shapes = '';

    // Generate different patterns based on style
    switch (style.id) {
      case 'abstract':
        shapes = this.generateAbstractShapes(colors, complexity, width, height);
        break;
      case 'geometric':
        shapes = this.generateGeometricShapes(colors, complexity, width, height);
        break;
      case 'mandala':
        shapes = this.generateMandalaPattern(colors, complexity, width, height);
        break;
      case 'waves':
        shapes = this.generateWavePattern(colors, complexity, width, height);
        break;
      default:
        shapes = this.generateAbstractShapes(colors, complexity, width, height);
    }

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:0.1" />
            <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:0.05" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)" />
        ${shapes}
      </svg>
    `;
  }

  private static generateAbstractShapes(colors: string[], complexity: number, width: number, height: number): string {
    let shapes = '';
    const numShapes = Math.floor(complexity * 15) + 5;

    for (let i = 0; i < numShapes; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = 0.3 + Math.random() * 0.4;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 20 + Math.random() * 80;

      if (Math.random() > 0.5) {
        shapes += `<circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="${opacity}" />`;
      } else {
        const path = this.generateBlobPath(x, y, size);
        shapes += `<path d="${path}" fill="${color}" opacity="${opacity}" />`;
      }
    }

    return shapes;
  }

  private static generateGeometricShapes(colors: string[], complexity: number, width: number, height: number): string {
    let shapes = '';
    const numShapes = Math.floor(complexity * 12) + 3;

    for (let i = 0; i < numShapes; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = 0.4 + Math.random() * 0.3;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 30 + Math.random() * 60;
      const rotation = Math.random() * 360;

      const shapeType = Math.floor(Math.random() * 3);
      
      if (shapeType === 0) {
        // Triangle
        const points = `${x},${y} ${x + size},${y} ${x + size/2},${y + size}`;
        shapes += `<polygon points="${points}" fill="${color}" opacity="${opacity}" transform="rotate(${rotation} ${x + size/2} ${y + size/3})" />`;
      } else if (shapeType === 1) {
        // Rectangle
        shapes += `<rect x="${x}" y="${y}" width="${size}" height="${size * 0.7}" fill="${color}" opacity="${opacity}" transform="rotate(${rotation} ${x + size/2} ${y + size/2})" />`;
      } else {
        // Hexagon
        const points = this.generateHexagonPoints(x, y, size);
        shapes += `<polygon points="${points}" fill="${color}" opacity="${opacity}" transform="rotate(${rotation} ${x} ${y})" />`;
      }
    }

    return shapes;
  }

  private static generateMandalaPattern(colors: string[], complexity: number, width: number, height: number): string {
    let shapes = '';
    const centerX = width / 2;
    const centerY = height / 2;
    const layers = Math.floor(complexity * 8) + 3;

    for (let layer = 0; layer < layers; layer++) {
      const radius = (layer + 1) * 25;
      const numElements = 8 + layer * 2;
      const color = colors[layer % colors.length];
      const opacity = 0.6 - (layer * 0.05);

      for (let i = 0; i < numElements; i++) {
        const angle = (i / numElements) * 2 * Math.PI;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const size = 8 + Math.random() * 12;

        shapes += `<circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="${opacity}" />`;
      }
    }

    return shapes;
  }

  private static generateWavePattern(colors: string[], complexity: number, width: number, height: number): string {
    let shapes = '';
    const numWaves = Math.floor(complexity * 6) + 2;

    for (let i = 0; i < numWaves; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = 0.3 + Math.random() * 0.3;
      const amplitude = 30 + Math.random() * 50;
      const frequency = 0.01 + Math.random() * 0.02;
      const yOffset = (i / numWaves) * height;

      let path = `M 0 ${yOffset}`;
      for (let x = 0; x <= width; x += 5) {
        const y = yOffset + Math.sin(x * frequency) * amplitude;
        path += ` L ${x} ${y}`;
      }
      path += ` L ${width} ${height} L 0 ${height} Z`;

      shapes += `<path d="${path}" fill="${color}" opacity="${opacity}" />`;
    }

    return shapes;
  }

  private static generateBlobPath(cx: number, cy: number, size: number): string {
    const points = 8;
    let path = '';
    
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * 2 * Math.PI;
      const radiusVariation = 0.7 + Math.random() * 0.6;
      const radius = size * radiusVariation;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      
      if (i === 0) {
        path = `M ${x} ${y}`;
      } else {
        path += ` Q ${x} ${y} `;
      }
    }
    path += ' Z';
    
    return path;
  }

  private static generateHexagonPoints(cx: number, cy: number, size: number): string {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * 2 * Math.PI;
      const x = cx + Math.cos(angle) * size;
      const y = cy + Math.sin(angle) * size;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  }

  private static generateThumbnail(svgData: string): string {
    // In a real app, this would generate a smaller version
    return svgData;
  }

  private static generateTitle(config: ArtworkConfig): string {
    const { mood, keywords } = config;
    const adjectives = ['Dreamy', 'Vibrant', 'Ethereal', 'Bold', 'Serene', 'Dynamic'];
    const nouns = ['Expression', 'Vision', 'Emotion', 'Feeling', 'Spirit', 'Essence'];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    if (keywords.length > 0) {
      const keyword = keywords[Math.floor(Math.random() * keywords.length)];
      return `${adjective} ${keyword} ${noun}`;
    }
    
    return `${adjective} ${mood.name} ${noun}`;
  }
}
export const Colors = {
  // Primary colors
  primary: '#FF8C00',
  primaryDark: '#E67E00',
  primaryLight: '#FFA500',
  
  // Background colors
  background: '#FFFFFF',
  backgroundDark: '#121212',
  surface: '#F5F5F5',
  surfaceDark: '#1E1E1E',
  
  // Card colors
  card: '#FFFFFF',
  cardDark: '#2C2C2C',
  
  // Text colors
  text: '#000000',
  textDark: '#FFFFFF',
  textSecondary: '#666666',
  textSecondaryDark: '#CCCCCC',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Quality colors
  goodQuality: '#4CAF50',
  badQuality: '#F44336',
  mold: '#8B4513',
  
  // Border colors
  border: '#E0E0E0',
  borderDark: '#404040',
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.3)',
} as const;

export type ColorKey = keyof typeof Colors;

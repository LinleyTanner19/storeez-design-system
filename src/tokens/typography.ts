export const typography = {
  display: {
    family: 'var(--font-display)',
    weights: [400, 500, 600] as const,
  },
  body: {
    family: 'Inter, sans-serif',
    weights: [400, 500, 600] as const,
  },
  mono: {
    family: 'JetBrains Mono, monospace',
    weights: [400, 500] as const,
  },
  scale: {
    displayLarge: '400 57px/64px var(--font-display)',
    displayMedium: '400 45px/52px var(--font-display)',
    displaySmall: '400 36px/44px var(--font-display)',
    headlineLarge: '400 32px/40px var(--font-display)',
    headlineMedium: '400 28px/36px var(--font-display)',
    headlineSmall: '600 24px/32px var(--font-display)',
    titleLarge: '500 22px/28px Inter, sans-serif',
    titleMedium: '500 16px/24px Inter, sans-serif',
    titleSmall: '500 14px/20px Inter, sans-serif',
    bodyLarge: '400 16px/24px Inter, sans-serif',
    bodyMedium: '400 14px/20px Inter, sans-serif',
    bodySmall: '400 12px/16px Inter, sans-serif',
    labelLarge: '500 14px/20px Inter, sans-serif',
    labelMedium: '500 12px/16px Inter, sans-serif',
    labelSmall: '500 11px/16px Inter, sans-serif',
    mono: '400 14px/20px JetBrains Mono, monospace',
  },
} as const;

export type TypeScaleKey = keyof typeof typography.scale;

export interface MotionTokens {
  fast: number;
  normal: number;
  slow: number;
}

export const motion = {
  fast: 140,
  normal: 220,
  slow: 320,
} as const satisfies MotionTokens;

export const reducedMotion = {
  fast: 0,
  normal: 0,
  slow: 0,
} as const satisfies MotionTokens;

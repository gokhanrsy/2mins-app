import type { ReactNode } from "react";

import type { darkColors, lightColors } from "./tokens/colors";
import type { MotionTokens } from "./tokens/motion";
import type { radius } from "./tokens/radius";
import type { shadows } from "./tokens/shadows";
import type { spacing } from "./tokens/spacing";
import type { typography } from "./tokens/typography";

export type AppThemeName = "light" | "dark";

export type ThemePreference = AppThemeName | "system";

export type AppThemeColors = typeof lightColors | typeof darkColors;

export type AppThemeSpacing = typeof spacing;

export type AppThemeRadius = typeof radius;

export type AppThemeTypography = typeof typography;

export type AppThemeMotion = MotionTokens;

export type AppThemeShadows = typeof shadows;

export interface AppTheme {
  name: AppThemeName;
  colors: AppThemeColors;
  spacing: AppThemeSpacing;
  radius: AppThemeRadius;
  typography: AppThemeTypography;
  motion: AppThemeMotion;
  shadows: AppThemeShadows;
}

export interface AppThemeProviderProps {
  children: ReactNode;
  initialThemePreference?: ThemePreference;
  themePreference?: ThemePreference;
  onThemePreferenceChange?: (themePreference: ThemePreference) => void;
}

export interface AppThemeContextValue {
  theme: AppTheme;
  themeName: AppThemeName;
  isDark: boolean;
  setThemePreference: (themePreference: ThemePreference) => void;
}

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AccessibilityInfo, useColorScheme } from "react-native";

import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";
import { reducedMotion } from "./tokens/motion";
import type {
  AppTheme,
  AppThemeContextValue,
  AppThemeName,
  AppThemeProviderProps,
  ThemePreference,
} from "./types";

export const AppThemeContext = createContext<AppThemeContextValue | undefined>(
  undefined,
);

const resolveThemeName = (
  themePreference: ThemePreference,
  systemThemeName: AppThemeName,
): AppThemeName => {
  if (themePreference === "system") {
    return systemThemeName;
  }

  return themePreference;
};

const applyReducedMotion = (
  theme: AppTheme,
  isReduceMotionEnabled: boolean,
): AppTheme => {
  if (!isReduceMotionEnabled) {
    return theme;
  }

  return {
    ...theme,
    motion: reducedMotion,
  };
};

export function ThemeProvider({
  children,
  initialThemePreference = "system",
  themePreference,
  onThemePreferenceChange,
}: AppThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const systemThemeName: AppThemeName =
    systemColorScheme === "dark" ? "dark" : "light";
  const [localThemePreference, setLocalThemePreference] =
    useState<ThemePreference>(initialThemePreference);
  const [isReduceMotionEnabled, setIsReduceMotionEnabled] = useState(false);
  const activeThemePreference = themePreference ?? localThemePreference;

  useEffect(() => {
    let isMounted = true;

    AccessibilityInfo.isReduceMotionEnabled().then((isEnabled) => {
      if (isMounted) {
        setIsReduceMotionEnabled(isEnabled);
      }
    });

    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setIsReduceMotionEnabled,
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  const setThemePreference = useCallback(
    (nextThemePreference: ThemePreference) => {
      if (themePreference === undefined) {
        setLocalThemePreference(nextThemePreference);
      }

      onThemePreferenceChange?.(nextThemePreference);
    },
    [onThemePreferenceChange, themePreference],
  );

  const value = useMemo<AppThemeContextValue>(() => {
    const themeName = resolveThemeName(activeThemePreference, systemThemeName);
    const baseTheme = themeName === "dark" ? darkTheme : lightTheme;
    const theme = applyReducedMotion(baseTheme, isReduceMotionEnabled);

    return {
      theme,
      themeName,
      isDark: themeName === "dark",
      setThemePreference,
    };
  }, [
    activeThemePreference,
    isReduceMotionEnabled,
    setThemePreference,
    systemThemeName,
  ]);

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

import { useContext } from "react";

import { AppThemeContext } from "./ThemeProvider";

export function useAppTheme() {
  const context = useContext(AppThemeContext);

  if (context === undefined) {
    throw new Error("useAppTheme must be used within ThemeProvider.");
  }

  return context;
}

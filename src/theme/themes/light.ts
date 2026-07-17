import { lightColors } from "../tokens/colors";
import { motion } from "../tokens/motion";
import { radius } from "../tokens/radius";
import { shadows } from "../tokens/shadows";
import { spacing } from "../tokens/spacing";
import { typography } from "../tokens/typography";
import type { AppTheme } from "../types";

export const lightTheme = {
  name: "light",
  colors: lightColors,
  spacing,
  radius,
  typography,
  motion,
  shadows,
} as const satisfies AppTheme;

import { darkColors } from "../tokens/colors";
import { motion } from "../tokens/motion";
import { radius } from "../tokens/radius";
import { shadows } from "../tokens/shadows";
import { spacing } from "../tokens/spacing";
import { typography } from "../tokens/typography";
import type { AppTheme } from "../types";

export const darkTheme = {
  name: "dark",
  colors: darkColors,
  spacing,
  radius,
  typography,
  motion,
  shadows,
} as const satisfies AppTheme;

import type { ReactNode } from "react";
import { Text, type TextProps } from "react-native";

import { useAppTheme, type AppTheme } from "@/theme";

export type AppTextVariant =
  | "display"
  | "headline"
  | "title"
  | "body"
  | "label"
  | "caption";

export interface AppTextProps extends TextProps {
  children: ReactNode;
  color?: keyof AppTheme["colors"];
  variant?: AppTextVariant;
}

const variantTokenMap = {
  display: "display",
  headline: "headline",
  title: "titleLarge",
  body: "body",
  label: "label",
  caption: "caption",
} as const satisfies Record<AppTextVariant, keyof AppTheme["typography"]>;

export function AppText({
  children,
  color = "textPrimary",
  style,
  variant = "body",
  ...textProps
}: AppTextProps) {
  const { theme } = useAppTheme();

  return (
    <Text
      {...textProps}
      style={[
        theme.typography[variantTokenMap[variant]],
        { color: theme.colors[color] },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

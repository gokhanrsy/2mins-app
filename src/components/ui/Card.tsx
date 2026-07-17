import type { ReactNode } from "react";
import { View, type ViewProps } from "react-native";

import { useAppTheme } from "@/theme";

export interface CardProps extends ViewProps {
  children: ReactNode;
  padded?: boolean;
}

export function Card({
  children,
  padded = true,
  style,
  ...viewProps
}: CardProps) {
  const { theme } = useAppTheme();

  return (
    <View
      {...viewProps}
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.card,
          borderWidth: 1,
          ...theme.shadows.small,
        },
        padded && {
          paddingHorizontal: theme.spacing[6],
          paddingVertical: theme.spacing[8],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

import { View, type ViewProps } from "react-native";

import { useAppTheme } from "@/theme";

export interface DividerProps extends ViewProps {
  inset?: boolean;
}

export function Divider({
  inset = false,
  style,
  ...viewProps
}: DividerProps) {
  const { theme } = useAppTheme();

  return (
    <View
      {...viewProps}
      style={[
        {
          backgroundColor: theme.colors.divider,
          height: 1,
        },
        inset && {
          marginHorizontal: theme.spacing[6],
        },
        style,
      ]}
    />
  );
}

import type { ReactNode } from "react";
import { Pressable, type PressableProps } from "react-native";

import { useAppTheme } from "@/theme";

import { AppText } from "./AppText";

export interface GhostButtonProps
  extends Omit<
    PressableProps,
    "accessibilityRole" | "children" | "disabled" | "onPress"
  > {
  children: ReactNode;
  disabled?: boolean;
  onPress: () => void;
}

const MIN_TOUCH_TARGET = 44;
const PRESSED_OPACITY = 0.72;

export function GhostButton({
  accessibilityState,
  children,
  disabled = false,
  onPress,
  style,
  ...pressableProps
}: GhostButtonProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      {...pressableProps}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={(state) => [
        {
          alignItems: "center",
          backgroundColor: "transparent",
          borderRadius: theme.radius.medium,
          justifyContent: "center",
          minHeight: MIN_TOUCH_TARGET,
          minWidth: MIN_TOUCH_TARGET,
          opacity: state.pressed && !disabled ? PRESSED_OPACITY : 1,
          paddingHorizontal: theme.spacing[4],
          paddingVertical: theme.spacing[3],
        },
        typeof style === "function" ? style(state) : style,
      ]}
    >
      <AppText color={disabled ? "disabled" : "textSecondary"} variant="label">
        {children}
      </AppText>
    </Pressable>
  );
}

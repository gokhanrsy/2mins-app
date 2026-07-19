import type { ReactNode } from "react";
import { Pressable, type PressableProps } from "react-native";

import { useAppTheme } from "@/theme";

import { AppText } from "./AppText";

export interface PrimaryButtonProps
  extends Omit<
    PressableProps,
    "accessibilityRole" | "children" | "disabled" | "onPress"
  > {
  children: ReactNode;
  disabled?: boolean;
  onPress: () => void;
}

const MIN_TOUCH_TARGET = 44;
const BUTTON_HEIGHT = 58;
const PRESSED_OPACITY = 0.92;
const PRESSED_SCALE = 0.98;

const isTextChild = (children: ReactNode): children is string | number =>
  typeof children === "string" || typeof children === "number";

export function PrimaryButton({
  accessibilityState,
  children,
  disabled = false,
  onPress,
  style,
  ...pressableProps
}: PrimaryButtonProps) {
  const { theme } = useAppTheme();
  const allowsScaleFeedback = theme.motion.fast > 0;

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
          backgroundColor: disabled
            ? theme.colors.disabled
            : state.pressed
              ? theme.colors.accentPressed
              : theme.colors.accent,
          borderRadius: theme.radius.medium,
          justifyContent: "center",
          minHeight: MIN_TOUCH_TARGET,
          minWidth: MIN_TOUCH_TARGET,
          height: BUTTON_HEIGHT,
          opacity: state.pressed && !disabled ? PRESSED_OPACITY : 1,
          paddingHorizontal: theme.spacing[6],
          transform:
            state.pressed && !disabled && allowsScaleFeedback
              ? [{ scale: PRESSED_SCALE }]
              : undefined,
        },
        typeof style === "function" ? style(state) : style,
      ]}
    >
      {isTextChild(children) ? (
        <AppText color="accentText" variant="label">
          {children}
        </AppText>
      ) : (
        children
      )}
    </Pressable>
  );
}

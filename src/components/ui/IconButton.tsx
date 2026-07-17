import { Pressable, type PressableProps } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import { useAppTheme } from "@/theme";

export interface IconButtonProps
  extends Omit<
    PressableProps,
    | "accessibilityLabel"
    | "accessibilityRole"
    | "children"
    | "disabled"
    | "onPress"
  > {
  accessibilityLabel: string;
  disabled?: boolean;
  icon: LucideIcon;
  onPress: () => void;
}

const ICON_SIZE = 20;
const ICON_STROKE_WIDTH = 1.75;
const MIN_TOUCH_TARGET = 44;
const PRESSED_OPACITY = 0.72;
const PRESSED_SCALE = 0.98;

export function IconButton({
  accessibilityLabel,
  accessibilityState,
  disabled = false,
  icon: Icon,
  onPress,
  style,
  ...pressableProps
}: IconButtonProps) {
  const { theme } = useAppTheme();
  const allowsScaleFeedback = theme.motion.fast > 0;

  return (
    <Pressable
      {...pressableProps}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={(state) => [
        {
          alignItems: "center",
          borderRadius: theme.radius.pill,
          justifyContent: "center",
          minHeight: MIN_TOUCH_TARGET,
          minWidth: MIN_TOUCH_TARGET,
          opacity: state.pressed && !disabled ? PRESSED_OPACITY : 1,
          transform:
            state.pressed && !disabled && allowsScaleFeedback
              ? [{ scale: PRESSED_SCALE }]
              : undefined,
        },
        typeof style === "function" ? style(state) : style,
      ]}
    >
      <Icon
        color={disabled ? theme.colors.disabled : theme.colors.textSecondary}
        size={ICON_SIZE}
        strokeWidth={ICON_STROKE_WIDTH}
      />
    </Pressable>
  );
}

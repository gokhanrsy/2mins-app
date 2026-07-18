import { useState } from "react";
import {
  Clock,
  Heart,
  Monitor,
  Moon,
  Settings,
  Sun,
  type LucideIcon,
} from "lucide-react-native";
import {
  AccessibilityInfo,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AppText,
  Card,
  GhostButton,
  IconButton,
  PrimaryButton,
} from "@/components/ui";
import { APP_NAME } from "@/constants/app";
import { useTaskSession } from "@/features/sessions/hooks";
import { useHomeTask } from "@/features/tasks/hooks";
import { ThemeProvider, useAppTheme, type ThemePreference } from "@/theme";

const MAX_CONTENT_WIDTH = 560;
const NAV_ICON_SIZE = 18;
const NAV_ICON_STROKE_WIDTH = 1.75;
const MIN_TOUCH_TARGET = 44;
const PRESSED_OPACITY = 0.72;
const EMPTY_TASK_COPY = "No task is available right now.";
const CONTEXT_COPY = "For right now.";
const ACTIVE_CONTEXT_COPY = "You started.";
const THEME_OPTIONS: {
  Icon: LucideIcon;
  label: string;
  value: ThemePreference;
}[] = [
  { Icon: Sun, label: "Light", value: "light" },
  { Icon: Monitor, label: "System", value: "system" },
  { Icon: Moon, label: "Dark", value: "dark" },
];

const noop = () => undefined;

export default function Index() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}

function HomeScreen() {
  const { setThemePreference, theme } = useAppTheme();
  const { currentTask, hasTask, replaceTask } = useHomeTask();
  const { isActive, startSession } = useTaskSession();
  const [activeTask, setActiveTask] =
    useState<typeof currentTask>(undefined);
  const [selectedThemePreference, setSelectedThemePreference] =
    useState<ThemePreference>("system");
  const { width } = useWindowDimensions();
  const horizontalPadding =
    width < 380 ? theme.spacing[5] : theme.spacing[6];
  const canStart = hasTask && !isActive;
  const canReplaceTask = hasTask && !isActive;
  const primaryButtonLabel = isActive ? "In progress" : "Start";
  const contextCopy = isActive ? ACTIVE_CONTEXT_COPY : CONTEXT_COPY;
  const displayedTask = activeTask ?? currentTask;

  const handleThemePreferenceChange = (
    nextThemePreference: ThemePreference,
  ) => {
    setSelectedThemePreference(nextThemePreference);
    setThemePreference(nextThemePreference);
  };

  const handleStart = () => {
    if (!canStart || currentTask === undefined) {
      return;
    }

    startSession(currentTask);
    setActiveTask(currentTask);
    AccessibilityInfo.announceForAccessibility("Task started.");
  };

  return (
    <SafeAreaView
      edges={["top", "right", "bottom", "left"]}
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: theme.spacing[4],
            paddingHorizontal: horizontalPadding,
            paddingTop: theme.spacing[4],
          },
        ]}
        style={{ backgroundColor: theme.colors.background }}
      >
        <View style={styles.content}>
          <View style={[styles.header, { gap: theme.spacing[2] }]}>
            <AppText
              style={[
                styles.appName,
                {
                  color: theme.colors.textPrimary,
                },
              ]}
              variant="label"
            >
              {APP_NAME}
            </AppText>
            <View style={[styles.headerControls, { gap: theme.spacing[1] }]}>
              <IconButton
                accessibilityLabel="Open settings"
                icon={Settings}
                onPress={noop}
                style={styles.settingsButton}
              />
              {__DEV__ ? (
                <View
                  accessibilityLabel="Developer theme switcher"
                  style={[
                    styles.themeSwitcher,
                    {
                      borderColor: theme.colors.border,
                      borderRadius: theme.radius.large,
                      gap: theme.spacing[1],
                      padding: theme.spacing[1],
                    },
                  ]}
                >
                  {THEME_OPTIONS.map((option) => (
                    <ThemePreferenceButton
                      Icon={option.Icon}
                      isActive={option.value === selectedThemePreference}
                      key={option.value}
                      label={option.label}
                      onPress={() =>
                        handleThemePreferenceChange(option.value)
                      }
                    />
                  ))}
                </View>
              ) : null}
            </View>
          </View>

          <View
            style={[
              styles.primaryContent,
              {
                gap: theme.spacing[6],
                paddingVertical: theme.spacing[6],
              },
            ]}
          >
            <View
              style={[
                styles.taskRegion,
                {
                  gap: theme.spacing[5],
                  minHeight: width < 380 ? 280 : 320,
                },
              ]}
            >
              <View style={styles.contextBlock}>
                <AppText color="textSecondary" variant="caption">
                  {contextCopy}
                </AppText>
              </View>

              <Card
                accessibilityRole="text"
                style={[
                  styles.taskCard,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    minHeight: 180,
                    paddingHorizontal: theme.spacing[6],
                    paddingVertical: theme.spacing[8],
                  },
                ]}
              >
                <AppText
                  accessibilityLiveRegion="polite"
                  style={[
                    styles.taskText,
                    {
                      color: theme.colors.textPrimary,
                    },
                  ]}
                  variant="display"
                >
                  {displayedTask?.title ?? EMPTY_TASK_COPY}
                </AppText>
              </Card>
            </View>

            <View style={[styles.actions, { gap: theme.spacing[1] }]}>
              <PrimaryButton disabled={!canStart} onPress={handleStart}>
                {primaryButtonLabel}
              </PrimaryButton>
              <GhostButton
                disabled={!canReplaceTask}
                onPress={canReplaceTask ? replaceTask : noop}
              >
                Not this one
              </GhostButton>
            </View>
          </View>

          <View
            accessibilityRole="toolbar"
            style={[
              styles.bottomPreview,
              {
                borderTopColor: theme.colors.divider,
                gap: theme.spacing[3],
                marginBottom: theme.spacing[4],
                paddingTop: theme.spacing[4],
              },
            ]}
          >
            <NavigationPreviewItem
              accessibilityLabel="Open favorites"
              icon={Heart}
              label="Favorites"
            />
            <NavigationPreviewItem
              accessibilityLabel="Open history"
              icon={Clock}
              label="History"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ThemePreferenceButton({
  Icon,
  isActive,
  label,
  onPress,
}: {
  Icon: LucideIcon;
  isActive: boolean;
  label: string;
  onPress: () => void;
}) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      accessibilityLabel={`Use ${label.toLowerCase()} theme`}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.themePreferenceButton,
        {
          backgroundColor: isActive
            ? theme.colors.accentSoft
            : "transparent",
          borderColor: isActive ? theme.colors.accent : "transparent",
          borderRadius: theme.radius.pill,
          borderWidth: 1,
          minHeight: MIN_TOUCH_TARGET,
          minWidth: MIN_TOUCH_TARGET,
          opacity: pressed ? PRESSED_OPACITY : 1,
        },
      ]}
    >
      <Icon
        color={isActive ? theme.colors.accent : theme.colors.textMuted}
        size={16}
        strokeWidth={NAV_ICON_STROKE_WIDTH}
      />
    </Pressable>
  );
}

function NavigationPreviewItem({
  accessibilityLabel,
  icon: Icon,
  label,
}: {
  accessibilityLabel: string;
  icon: LucideIcon;
  label: string;
}) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={noop}
      style={({ pressed }) => [
        styles.navPreviewItem,
        {
          borderRadius: theme.radius.medium,
          minHeight: MIN_TOUCH_TARGET,
          minWidth: MIN_TOUCH_TARGET,
          opacity: pressed ? PRESSED_OPACITY : 1,
          paddingHorizontal: theme.spacing[3],
          paddingVertical: theme.spacing[2],
        },
      ]}
    >
      <Icon
        color={theme.colors.textMuted}
        size={NAV_ICON_SIZE}
        strokeWidth={NAV_ICON_STROKE_WIDTH}
      />
      <AppText color="textMuted" variant="caption">
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    maxWidth: MAX_CONTENT_WIDTH,
    width: "100%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
  },
  headerControls: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 0,
  },
  settingsButton: {
    minHeight: MIN_TOUCH_TARGET,
    minWidth: MIN_TOUCH_TARGET,
  },
  themeSwitcher: {
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
  },
  themePreferenceButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  primaryContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  contextBlock: {
    alignItems: "center",
  },
  taskRegion: {
    justifyContent: "center",
    width: "100%",
  },
  taskCard: {
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    textAlign: "center",
  },
  actions: {
    width: "100%",
  },
  bottomPreview: {
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "center",
  },
  navPreviewItem: {
    alignItems: "center",
    justifyContent: "center",
  },
});

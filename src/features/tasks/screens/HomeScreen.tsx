import { useState } from "react";
import { useRouter } from "expo-router";
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
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText, IconButton, PrimaryButton } from "@/components/ui";
import { APP_NAME } from "@/constants/app";
import { useAppTheme, type ThemePreference } from "@/theme";

const MAX_CONTENT_WIDTH = 560;
const NAV_ICON_SIZE = 18;
const NAV_ICON_STROKE_WIDTH = 1.75;
const MIN_TOUCH_TARGET = 44;
const PRESSED_OPACITY = 0.72;
const LOGO_DOT_LARGE = 18;
const LOGO_DOT_SMALL = 12;

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

export function HomeScreen() {
  const router = useRouter();
  const { setThemePreference, theme } = useAppTheme();
  const [selectedThemePreference, setSelectedThemePreference] =
    useState<ThemePreference>("system");
  const { width } = useWindowDimensions();
  const horizontalPadding =
    width < 380 ? theme.spacing[5] : theme.spacing[6];

  const handleThemePreferenceChange = (
    nextThemePreference: ThemePreference,
  ) => {
    setSelectedThemePreference(nextThemePreference);
    setThemePreference(nextThemePreference);
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
            <View style={styles.headerSpacer} />
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
                gap: theme.spacing[10],
                paddingVertical: theme.spacing[10],
              },
            ]}
          >
            <View style={[styles.invitation, { gap: theme.spacing[6] }]}>
              <BrandLogo />
              <AppText
                accessibilityRole="header"
                style={styles.headline}
                variant="headline"
              >
                Got 2 minutes?
              </AppText>
              <AppText
                color="textSecondary"
                style={styles.supportingText}
                variant="body"
              >
                Pick one small thing.{"\n"}No pressure.
              </AppText>
            </View>

            <PrimaryButton
              accessibilityLabel="Give me a task"
              onPress={() => router.push("/task")}
            >
              Give me a task
            </PrimaryButton>
          </View>

          <View
            accessibilityRole="toolbar"
            style={[
              styles.bottomPreview,
              {
                gap: theme.spacing[3],
                marginBottom: theme.spacing[4],
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

          <AppText color="textMuted" style={styles.signature} variant="caption">
            2 MINS
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function BrandLogo() {
  const { theme } = useAppTheme();

  return (
    <View
      accessibilityLabel={APP_NAME}
      accessibilityRole="image"
      style={[styles.logoWrap, { gap: theme.spacing[3] }]}
    >
      <View style={styles.logoMark}>
        <View
          style={[
            styles.logoDot,
            {
              backgroundColor: theme.colors.textPrimary,
              height: LOGO_DOT_LARGE,
              width: LOGO_DOT_LARGE,
            },
          ]}
        />
        <View
          style={[
            styles.logoDot,
            {
              backgroundColor: theme.colors.accent,
              height: LOGO_DOT_SMALL,
              marginTop: LOGO_DOT_SMALL,
              width: LOGO_DOT_SMALL,
            },
          ]}
        />
      </View>
      <AppText style={styles.logoText} variant="label">
        {APP_NAME}
      </AppText>
    </View>
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
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.medium,
          borderWidth: StyleSheet.hairlineWidth,
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
    justifyContent: "flex-end",
  },
  headerSpacer: {
    flex: 1,
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
  logoWrap: {
    alignItems: "center",
  },
  logoMark: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 28,
  },
  logoDot: {
    borderRadius: 999,
  },
  logoText: {
    fontSize: 18,
    lineHeight: 24,
  },
  invitation: {
    alignItems: "center",
  },
  headline: {
    textAlign: "center",
  },
  supportingText: {
    textAlign: "center",
  },
  bottomPreview: {
    flexDirection: "row",
    justifyContent: "center",
  },
  navPreviewItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  signature: {
    fontSize: 11,
    letterSpacing: 0,
    paddingBottom: 4,
    textAlign: "center",
  },
});

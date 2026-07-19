import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  AccessibilityInfo,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText, IconButton, PrimaryButton } from "@/components/ui";
import { APP_NAME } from "@/constants/app";
import { createTaskCompletion } from "@/features/history";
import { useTaskSession } from "@/features/sessions/hooks";
import type { Task } from "@/features/tasks";
import { useHomeTask } from "@/features/tasks/hooks";
import { useAppTheme } from "@/theme";

const MAX_CONTENT_WIDTH = 560;
const EMPTY_TASK_COPY = "No task is available right now.";
const COMPLETED_STATUS_COPY = "Nice.";
const TASK_ENTRY_OFFSET = 8;
const TASK_SWAP_OFFSET = -8;
const TASK_COMPLETION_OFFSET = -6;
const BUTTON_LABEL_MIN_WIDTH = 128;
const BUTTON_LABEL_HEIGHT = 20;
const MIN_PRIMARY_ACTION_HEIGHT = 56;
const MIN_SECONDARY_ACTION_HEIGHT = 48;
const PRESSED_OPACITY = 0.76;
const PRESSED_SCALE = 0.98;

type TaskScreenState = "active" | "completed";
type TaskScreenStateCopy = Record<TaskScreenState, string>;

const noop = () => undefined;
const TASK_STATE_PROGRESS = {
  active: 0,
  completed: 1,
} as const satisfies Record<TaskScreenState, number>;
const PRIMARY_BUTTON_COPY_BY_STATE = {
  active: "Done",
  completed: "Another task",
} as const satisfies TaskScreenStateCopy;

export function TaskScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { currentTask, hasTask, replaceTask } = useHomeTask();
  const {
    completeSession,
    isCompleted,
    resetSession,
    session,
    startSession,
  } = useTaskSession();
  const [isReduceMotionEnabled, setIsReduceMotionEnabled] = useState(false);
  const [taskStateProgress] = useState(() => new Animated.Value(0));
  const [taskEntryProgress] = useState(() => new Animated.Value(0));
  const [taskSwapProgress] = useState(() => new Animated.Value(1));
  const [taskCompletionProgress] = useState(() => new Animated.Value(0));
  const { width } = useWindowDimensions();
  const horizontalPadding =
    width < 380 ? theme.spacing[5] : theme.spacing[6];
  const taskScreenState: TaskScreenState = isCompleted
    ? "completed"
    : "active";
  const displayedTask = currentTask;
  const primaryButtonLabel = PRIMARY_BUTTON_COPY_BY_STATE[taskScreenState];
  const canCompleteTask =
    taskScreenState === "active" && session?.status === "active";
  const canRequestAnotherTask = hasTask && taskScreenState === "completed";
  const canUsePrimaryAction =
    taskScreenState === "completed" ? canRequestAnotherTask : canCompleteTask;
  const taskEntryOpacity = taskEntryProgress;
  const taskEntryTranslateY = isReduceMotionEnabled
    ? 0
    : taskEntryProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [TASK_ENTRY_OFFSET, 0],
      });
  const taskSwapTranslateY = isReduceMotionEnabled
    ? 0
    : taskSwapProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [TASK_SWAP_OFFSET, 0],
      });
  const taskCompletionTranslateY = isReduceMotionEnabled
    ? 0
    : taskCompletionProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, TASK_COMPLETION_OFFSET],
      });
  const taskCompletionOpacity = taskCompletionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const runTaskEntryTransition = useCallback(() => {
    taskEntryProgress.stopAnimation();
    taskSwapProgress.stopAnimation();
    taskCompletionProgress.stopAnimation();
    taskStateProgress.stopAnimation();
    taskEntryProgress.setValue(0);
    taskSwapProgress.setValue(1);
    taskCompletionProgress.setValue(0);
    taskStateProgress.setValue(TASK_STATE_PROGRESS.active);

    Animated.timing(taskEntryProgress, {
      duration: isReduceMotionEnabled ? theme.motion.fast : theme.motion.normal,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [
    isReduceMotionEnabled,
    taskCompletionProgress,
    taskEntryProgress,
    taskStateProgress,
    taskSwapProgress,
    theme.motion.fast,
    theme.motion.normal,
  ]);

  const runTaskReplacementTransition = (replace: () => void) => {
    taskSwapProgress.stopAnimation();
    taskSwapProgress.setValue(1);

    Animated.timing(taskSwapProgress, {
      duration: isReduceMotionEnabled ? theme.motion.fast : 120,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      replace();
      Animated.timing(taskSwapProgress, {
        duration: isReduceMotionEnabled ? theme.motion.fast : 180,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  };

  const runCompletionTransition = () => {
    taskCompletionProgress.stopAnimation();
    taskStateProgress.stopAnimation();
    taskCompletionProgress.setValue(0);

    Animated.parallel([
      Animated.timing(taskStateProgress, {
        duration: isReduceMotionEnabled ? theme.motion.fast : theme.motion.normal,
        toValue: TASK_STATE_PROGRESS.completed,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(taskCompletionProgress, {
          duration: isReduceMotionEnabled ? theme.motion.fast : 140,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(taskCompletionProgress, {
          duration: isReduceMotionEnabled ? theme.motion.normal : 170,
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const startReplacementSession = () => {
    replaceTask();
    resetSession();
  };

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled()
      .then(setIsReduceMotionEnabled)
      .catch(noop);

    const reduceMotionSubscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setIsReduceMotionEnabled,
    );

    return () => {
      reduceMotionSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (currentTask === undefined || session !== undefined) {
      return;
    }

    startSession(currentTask);
    runTaskEntryTransition();
  }, [currentTask, runTaskEntryTransition, session, startSession]);

  const handleSkip = () => {
    if (!hasTask) {
      return;
    }

    runTaskReplacementTransition(startReplacementSession);
  };

  const handleBack = () => {
    router.replace("/");
  };

  const handleDone = () => {
    const completedSession = completeSession();

    if (completedSession === undefined) {
      return;
    }

    createTaskCompletion(completedSession);
    runCompletionTransition();
    AccessibilityInfo.announceForAccessibility("Task completed.");
  };

  const handleAnotherTask = () => {
    if (!hasTask) {
      return;
    }

    runTaskReplacementTransition(startReplacementSession);
  };

  const handlePrimaryAction = () => {
    if (taskScreenState === "completed") {
      handleAnotherTask();
      return;
    }

    handleDone();
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
            <IconButton
              accessibilityLabel="Go back"
              icon={ArrowLeft}
              onPress={handleBack}
              style={styles.backButton}
            />
            <AppText
              color="textSecondary"
              style={styles.headerTitle}
              variant="caption"
            >
              {APP_NAME}
            </AppText>
            <View style={styles.headerSpacer} />
          </View>

          <View
            style={[
              styles.primaryContent,
              {
                gap: theme.spacing[8],
                paddingBottom: theme.spacing[5],
                paddingTop: theme.spacing[10],
              },
            ]}
          >
            <Animated.View
              accessibilityLiveRegion="polite"
              style={[
                styles.taskRegion,
                {
                  minHeight: width < 380 ? 320 : 380,
                  opacity: taskEntryOpacity,
                  transform: [{ translateY: taskEntryTranslateY }],
                },
              ]}
            >
              <TaskStateCrossfadeText
                color={taskScreenState === "completed" ? "accent" : "textMuted"}
                currentState={taskScreenState}
                progress={taskStateProgress}
                style={styles.statusLabel}
                textByState={{
                  active:
                    displayedTask === undefined
                      ? ""
                      : formatTaskCategory(displayedTask.category),
                  completed: COMPLETED_STATUS_COPY,
                }}
                variant="caption"
              />

              <Animated.View
                style={[
                  styles.taskTextWrap,
                  {
                    marginTop: theme.spacing[6],
                    opacity: Animated.multiply(
                      taskSwapProgress,
                      taskCompletionOpacity,
                    ),
                    transform: [
                      { translateY: taskSwapTranslateY },
                      { translateY: taskCompletionTranslateY },
                    ],
                  },
                ]}
              >
                <AppText
                  accessibilityRole="text"
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
              </Animated.View>
            </Animated.View>

            <View style={[styles.actions, { gap: theme.spacing[3] }]}>
              <PrimaryButton
                accessibilityLabel={primaryButtonLabel}
                disabled={!canUsePrimaryAction}
                onPress={handlePrimaryAction}
                style={styles.primaryAction}
              >
                <TaskStateCrossfadeText
                  color="accentText"
                  currentState={taskScreenState}
                  minWidth={BUTTON_LABEL_MIN_WIDTH}
                  progress={taskStateProgress}
                  textByState={PRIMARY_BUTTON_COPY_BY_STATE}
                  variant="label"
                />
              </PrimaryButton>

              {taskScreenState === "active" ? (
                <View style={[styles.secondaryActions, { gap: theme.spacing[3] }]}>
                  <SecondaryTaskButton label="Skip" onPress={handleSkip} />
                  <SecondaryTaskButton label="Back" onPress={handleBack} />
                </View>
              ) : (
                <View style={[styles.secondaryActions, { gap: theme.spacing[3] }]}>
                  <SecondaryTaskButton label="Back" onPress={handleBack} />
                </View>
              )}
            </View>
          </View>

          <AppText color="textMuted" style={styles.signature} variant="caption">
            2 MINS
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TaskStateCrossfadeText({
  color,
  currentState,
  minWidth,
  progress,
  style,
  textByState,
  variant,
}: {
  color?: Parameters<typeof AppText>[0]["color"];
  currentState: TaskScreenState;
  minWidth?: number;
  progress: Animated.Value;
  style?: Parameters<typeof AppText>[0]["style"];
  textByState: TaskScreenStateCopy;
  variant: Parameters<typeof AppText>[0]["variant"];
}) {
  return (
    <View
      style={[
        styles.crossfadeTextContainer,
        minWidth === undefined
          ? null
          : { height: BUTTON_LABEL_HEIGHT, minWidth },
      ]}
    >
      <AppText
        color={color}
        style={[styles.crossfadeTextMeasure, style]}
        variant={variant}
      >
        {textByState[currentState]}
      </AppText>
      {(["active", "completed"] as const).map((state) => (
        <Animated.View
          importantForAccessibility="no-hide-descendants"
          key={state}
          pointerEvents="none"
          style={[
            styles.crossfadeTextLayer,
            {
              opacity: progress.interpolate({
                extrapolate: "clamp",
                inputRange: [
                  TASK_STATE_PROGRESS[state] - 1,
                  TASK_STATE_PROGRESS[state],
                  TASK_STATE_PROGRESS[state] + 1,
                ],
                outputRange: [0, 1, 0],
              }),
            },
          ]}
        >
          <AppText color={color} style={[styles.crossfadeText, style]} variant={variant}>
            {textByState[state]}
          </AppText>
        </Animated.View>
      ))}
    </View>
  );
}

function SecondaryTaskButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  const { theme } = useAppTheme();
  const allowsScaleFeedback = theme.motion.fast > 0;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={(state) => [
        styles.secondaryButton,
        {
          backgroundColor: theme.colors.surfaceSecondary,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.medium,
          minHeight: MIN_SECONDARY_ACTION_HEIGHT,
          opacity: state.pressed ? PRESSED_OPACITY : 1,
          paddingHorizontal: theme.spacing[4],
          transform:
            state.pressed && allowsScaleFeedback
              ? [{ scale: PRESSED_SCALE }]
              : undefined,
        },
      ]}
    >
      <AppText color="textSecondary" variant="label">
        {label}
      </AppText>
    </Pressable>
  );
}

function formatTaskCategory(category: Task["category"]): string {
  if (category === "selfCare") {
    return "Self care";
  }

  return category.slice(0, 1).toUpperCase() + category.slice(1);
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
  backButton: {
    minHeight: 44,
    minWidth: 44,
  },
  headerTitle: {
    fontWeight: "600",
    textAlign: "center",
  },
  headerSpacer: {
    minHeight: 44,
    minWidth: 44,
  },
  primaryContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  taskRegion: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  statusLabel: {
    fontWeight: "600",
    letterSpacing: 0,
    textAlign: "center",
  },
  taskTextWrap: {
    maxWidth: "100%",
  },
  taskText: {
    fontSize: 38,
    lineHeight: 46,
    textAlign: "center",
  },
  actions: {
    width: "100%",
  },
  primaryAction: {
    minHeight: MIN_PRIMARY_ACTION_HEIGHT,
  },
  secondaryActions: {
    flexDirection: "row",
  },
  secondaryButton: {
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: "center",
    minWidth: 44,
  },
  crossfadeText: {
    textAlign: "center",
  },
  crossfadeTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  crossfadeTextLayer: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  crossfadeTextMeasure: {
    opacity: 0,
    textAlign: "center",
  },
  signature: {
    fontSize: 11,
    letterSpacing: 0,
    paddingBottom: 4,
    textAlign: "center",
  },
});

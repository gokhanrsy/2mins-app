import { useCallback, useState } from "react";

import { seedTasks } from "@/data/tasks";
import {
  LocalTaskRepository,
  selectTask,
  type Task,
} from "@/features/tasks";

const MAX_RECENT_TASK_IDS = 5;

const taskRepository = new LocalTaskRepository(seedTasks);

interface HomeTaskState {
  currentTask: Task | undefined;
  recentTaskIds: readonly string[];
}

interface UseHomeTaskResult {
  currentTask: Task | undefined;
  hasTask: boolean;
  replaceTask: () => void;
}

function addRecentTaskId(
  recentTaskIds: readonly string[],
  taskId: string,
): readonly string[] {
  return [
    taskId,
    ...recentTaskIds.filter((recentTaskId) => recentTaskId !== taskId),
  ].slice(0, MAX_RECENT_TASK_IDS);
}

function selectHomeTask(recentlyShownTaskIds: readonly string[] = []) {
  return selectTask({
    tasks: taskRepository.getAll(),
    recentlyShownTaskIds,
  }).task;
}

function createInitialHomeTaskState(): HomeTaskState {
  const currentTask = selectHomeTask();

  return {
    currentTask,
    recentTaskIds:
      currentTask === undefined ? [] : addRecentTaskId([], currentTask.id),
  };
}

export function useHomeTask(): UseHomeTaskResult {
  const [homeTaskState, setHomeTaskState] = useState(
    createInitialHomeTaskState,
  );

  const replaceTask = useCallback(() => {
    setHomeTaskState((previousState) => {
      const recentTaskIds =
        previousState.currentTask === undefined
          ? previousState.recentTaskIds
          : addRecentTaskId(
              previousState.recentTaskIds,
              previousState.currentTask.id,
            );
      const currentTask = selectHomeTask(recentTaskIds);

      return {
        currentTask,
        recentTaskIds:
          currentTask === undefined
            ? recentTaskIds
            : addRecentTaskId(recentTaskIds, currentTask.id),
      };
    });
  }, []);

  return {
    currentTask: homeTaskState.currentTask,
    hasTask: homeTaskState.currentTask !== undefined,
    replaceTask,
  };
}

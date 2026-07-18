import type { Task } from "@/features/tasks/types";

import type { TaskSelectionInput, TaskSelectionResult } from "./types";

type MatchLevel = TaskSelectionResult["matchLevel"];

function selectRandomItem<TItem>(
  candidates: readonly TItem[],
  random: () => number,
): TItem | undefined {
  if (candidates.length === 0) {
    return undefined;
  }

  const randomValue = random();

  if (Number.isNaN(randomValue) || randomValue < 0) {
    return candidates[0];
  }

  const index = Math.min(Math.floor(randomValue * candidates.length), candidates.length - 1);

  return candidates[index];
}

function selectFromTier(
  candidates: readonly Task[],
  recentlyShownTaskIds: ReadonlySet<string>,
  random: () => number,
): Task | undefined {
  if (candidates.length === 0) {
    return undefined;
  }

  const nonRecentCandidates = candidates.filter((task) => !recentlyShownTaskIds.has(task.id));
  const selectableCandidates = nonRecentCandidates.length > 0 ? nonRecentCandidates : candidates;

  return selectRandomItem(selectableCandidates, random);
}

function createResult(task: Task | undefined, matchLevel: MatchLevel): TaskSelectionResult {
  return {
    task,
    matchLevel: task === undefined ? "none" : matchLevel,
  };
}

export function selectTask(input: TaskSelectionInput): TaskSelectionResult {
  const {
    context,
    energyLevel,
    excludedTaskIds = [],
    recentlyShownTaskIds = [],
  } = input;
  const random = input.random ?? Math.random;

  if (input.tasks.length === 0) {
    return {
      task: undefined,
      matchLevel: "none",
    };
  }

  const excludedIds = new Set(excludedTaskIds);
  const eligibleTasks = input.tasks.filter((task) => !excludedIds.has(task.id));

  if (eligibleTasks.length === 0) {
    return {
      task: undefined,
      matchLevel: "none",
    };
  }

  const recentlyShownIds = new Set(recentlyShownTaskIds);

  if (context !== undefined && energyLevel !== undefined) {
    const exactCandidates = eligibleTasks.filter(
      (task) => task.contexts.includes(context) && task.energyLevels.includes(energyLevel),
    );
    const exactTask = selectFromTier(exactCandidates, recentlyShownIds, random);

    if (exactTask !== undefined) {
      return createResult(exactTask, "exact");
    }
  }

  if (context !== undefined) {
    const contextCandidates = eligibleTasks.filter((task) => task.contexts.includes(context));
    const contextTask = selectFromTier(contextCandidates, recentlyShownIds, random);

    if (contextTask !== undefined) {
      return createResult(contextTask, "context");
    }
  }

  if (energyLevel !== undefined) {
    const energyCandidates = eligibleTasks.filter((task) =>
      task.energyLevels.includes(energyLevel),
    );
    const energyTask = selectFromTier(energyCandidates, recentlyShownIds, random);

    if (energyTask !== undefined) {
      return createResult(energyTask, "energy");
    }
  }

  return createResult(selectFromTier(eligibleTasks, recentlyShownIds, random), "fallback");
}

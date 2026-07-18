import {
  ENERGY_LEVELS,
  TASK_CATEGORIES,
  TASK_TYPES,
  USER_CONTEXTS,
  isTask,
  type EnergyLevel,
  type Task,
  type TaskCategory,
  type TaskType,
  type UserContext,
} from "@/features/tasks";

import { seedTasks } from "./seedTasks";

const EXPECTED_TOTAL = 120;

const EXPECTED_CATEGORY_COUNTS: Record<TaskCategory, number> = {
  mind: 18,
  body: 18,
  home: 18,
  digital: 16,
  social: 14,
  productivity: 18,
  selfCare: 18,
};

const MIN_TYPE_COUNTS: Record<TaskType, number> = {
  do: 60,
  think: 20,
  reset: 25,
};

const MAX_TYPE_COUNTS: Record<TaskType, number> = {
  do: 70,
  think: 30,
  reset: 35,
};

const MIN_ENERGY_COVERAGE: Record<EnergyLevel, number> = {
  low: 45,
  medium: 55,
  high: 35,
};

const MIN_CONTEXT_COVERAGE: Record<UserContext, number> = {
  home: 45,
  work: 35,
  outside: 25,
  resting: 35,
};

export interface SeedTaskLibraryStats {
  total: number;
  categoryCounts: Record<TaskCategory, number>;
  typeCounts: Record<TaskType, number>;
  energyCoverage: Record<EnergyLevel, number>;
  contextCoverage: Record<UserContext, number>;
  minDuration: number;
  maxDuration: number;
}

function countValues<TValue extends string>(
  values: readonly TValue[],
  keys: readonly TValue[],
): Record<TValue, number> {
  const counts = Object.fromEntries(keys.map((key) => [key, 0])) as Record<TValue, number>;

  values.forEach((value) => {
    counts[value] += 1;
  });

  return counts;
}

function assertCondition(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

export function validateSeedTasks(tasks: readonly Task[] = seedTasks): SeedTaskLibraryStats {
  assertCondition(tasks.length === EXPECTED_TOTAL, `Expected ${EXPECTED_TOTAL} seed tasks.`);

  const ids = new Set<string>();
  const titles = new Set<string>();

  tasks.forEach((task, index) => {
    assertCondition(isTask(task), `Invalid seed task at index ${index}.`);
    assertCondition(task.isPremium === false, `Seed task must be free: ${task.id}`);
    assertCondition(!ids.has(task.id), `Duplicate seed task id: ${task.id}`);
    assertCondition(!titles.has(task.title), `Duplicate seed task title: ${task.title}`);

    ids.add(task.id);
    titles.add(task.title);
  });

  const categoryCounts = countValues(
    tasks.map((task) => task.category),
    TASK_CATEGORIES,
  );
  const typeCounts = countValues(
    tasks.map((task) => task.type),
    TASK_TYPES,
  );
  const energyCoverage = countValues(
    tasks.flatMap((task) => task.energyLevels),
    ENERGY_LEVELS,
  );
  const contextCoverage = countValues(
    tasks.flatMap((task) => task.contexts),
    USER_CONTEXTS,
  );

  TASK_CATEGORIES.forEach((category) => {
    assertCondition(
      categoryCounts[category] === EXPECTED_CATEGORY_COUNTS[category],
      `Unexpected ${category} category count.`,
    );
  });

  TASK_TYPES.forEach((taskType) => {
    assertCondition(
      typeCounts[taskType] >= MIN_TYPE_COUNTS[taskType] &&
        typeCounts[taskType] <= MAX_TYPE_COUNTS[taskType],
      `Unexpected ${taskType} task type count.`,
    );
  });

  TASK_CATEGORIES.forEach((category) => {
    const categoryTypes = new Set(
      tasks.filter((task) => task.category === category).map((task) => task.type),
    );

    assertCondition(categoryTypes.size > 1, `${category} must include varied task types.`);
  });

  ENERGY_LEVELS.forEach((energyLevel) => {
    assertCondition(
      energyCoverage[energyLevel] >= MIN_ENERGY_COVERAGE[energyLevel],
      `Insufficient ${energyLevel} energy coverage.`,
    );
  });

  USER_CONTEXTS.forEach((context) => {
    assertCondition(
      contextCoverage[context] >= MIN_CONTEXT_COVERAGE[context],
      `Insufficient ${context} context coverage.`,
    );
  });

  const durations = tasks.map((task) => task.estimatedSeconds);

  return {
    total: tasks.length,
    categoryCounts,
    typeCounts,
    energyCoverage,
    contextCoverage,
    minDuration: Math.min(...durations),
    maxDuration: Math.max(...durations),
  };
}

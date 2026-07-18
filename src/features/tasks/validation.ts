import {
  ENERGY_LEVELS,
  MAX_TASK_SECONDS,
  MIN_TASK_SECONDS,
  TASK_CATEGORIES,
  TASK_TYPES,
  USER_CONTEXTS,
} from "./constants";
import type {
  EnergyLevel,
  Task,
  TaskCategory,
  TaskType,
  UserContext,
} from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isTaskCategory(value: unknown): value is TaskCategory {
  return TASK_CATEGORIES.some((category) => category === value);
}

export function isTaskType(value: unknown): value is TaskType {
  return TASK_TYPES.some((taskType) => taskType === value);
}

export function isEnergyLevel(value: unknown): value is EnergyLevel {
  return ENERGY_LEVELS.some((energyLevel) => energyLevel === value);
}

export function isUserContext(value: unknown): value is UserContext {
  return USER_CONTEXTS.some((userContext) => userContext === value);
}

export function isTask(value: unknown): value is Task {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    typeof value.title === "string" &&
    value.title.trim().length > 0 &&
    isTaskCategory(value.category) &&
    isTaskType(value.type) &&
    Array.isArray(value.energyLevels) &&
    value.energyLevels.length > 0 &&
    value.energyLevels.every(isEnergyLevel) &&
    Array.isArray(value.contexts) &&
    value.contexts.length > 0 &&
    value.contexts.every(isUserContext) &&
    typeof value.estimatedSeconds === "number" &&
    Number.isInteger(value.estimatedSeconds) &&
    value.estimatedSeconds >= MIN_TASK_SECONDS &&
    value.estimatedSeconds <= MAX_TASK_SECONDS &&
    typeof value.isPremium === "boolean"
  );
}

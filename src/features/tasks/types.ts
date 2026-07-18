import type {
  ENERGY_LEVELS,
  TASK_CATEGORIES,
  TASK_TYPES,
  USER_CONTEXTS,
} from "./constants";

export type TaskCategory = (typeof TASK_CATEGORIES)[number];

export type TaskType = (typeof TASK_TYPES)[number];

export type EnergyLevel = (typeof ENERGY_LEVELS)[number];

export type UserContext = (typeof USER_CONTEXTS)[number];

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  type: TaskType;
  energyLevels: readonly EnergyLevel[];
  contexts: readonly UserContext[];
  estimatedSeconds: number;
  isPremium: boolean;
}

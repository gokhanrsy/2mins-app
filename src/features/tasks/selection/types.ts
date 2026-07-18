import type { EnergyLevel, Task, UserContext } from "@/features/tasks/types";

export interface TaskSelectionInput {
  tasks: readonly Task[];
  context?: UserContext;
  energyLevel?: EnergyLevel;
  excludedTaskIds?: readonly string[];
  recentlyShownTaskIds?: readonly string[];
  random?: () => number;
}

export interface TaskSelectionResult {
  task: Task | undefined;
  matchLevel: "exact" | "context" | "energy" | "fallback" | "none";
}

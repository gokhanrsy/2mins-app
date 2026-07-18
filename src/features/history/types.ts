import type { EnergyLevel, UserContext } from "@/features/tasks";

export interface TaskCompletion {
  id: string;
  taskId: string;
  completedAt: string;
  context?: UserContext;
  energyLevel?: EnergyLevel;
}

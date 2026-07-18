import type { EnergyLevel, UserContext } from "@/features/tasks";

import type { SessionStatus } from "./constants";

export interface TaskSession {
  id: string;
  taskId: string;
  status: SessionStatus;
  startedAt: string;
  completedAt?: string;
  cancelledAt?: string;
  context?: UserContext;
  energyLevel?: EnergyLevel;
}

export interface CreateTaskSessionInput {
  id: string;
  taskId: string;
  startedAt: string;
  context?: UserContext;
  energyLevel?: EnergyLevel;
}

export interface CompleteTaskSessionInput {
  completedAt: string;
}

export interface CancelTaskSessionInput {
  cancelledAt: string;
}

import type { TaskSession } from "@/features/sessions";

import type { TaskCompletion } from "./types";

export function createTaskCompletion(
  session: TaskSession,
): TaskCompletion {
  if (session.status !== "completed" || session.completedAt === undefined) {
    throw new Error(
      "Cannot create a task completion from a non-completed session.",
    );
  }

  const completion: TaskCompletion = {
    id: `completion-${session.id}`,
    taskId: session.taskId,
    completedAt: session.completedAt,
  };

  if (session.context !== undefined) {
    completion.context = session.context;
  }

  if (session.energyLevel !== undefined) {
    completion.energyLevel = session.energyLevel;
  }

  return completion;
}

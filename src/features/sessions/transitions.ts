import type {
  CancelTaskSessionInput,
  CompleteTaskSessionInput,
  CreateTaskSessionInput,
  TaskSession,
} from "./types";

export function createTaskSession(input: CreateTaskSessionInput): TaskSession {
  const session: TaskSession = {
    id: input.id,
    taskId: input.taskId,
    status: "active",
    startedAt: input.startedAt,
  };

  if (input.context !== undefined) {
    session.context = input.context;
  }

  if (input.energyLevel !== undefined) {
    session.energyLevel = input.energyLevel;
  }

  return session;
}

export function completeTaskSession(
  session: TaskSession,
  input: CompleteTaskSessionInput,
): TaskSession {
  if (session.status !== "active") {
    throw new Error("Cannot complete a non-active session.");
  }

  const { cancelledAt: _cancelledAt, ...sessionWithoutCancellation } = session;

  return {
    ...sessionWithoutCancellation,
    status: "completed",
    completedAt: input.completedAt,
  };
}

export function cancelTaskSession(
  session: TaskSession,
  input: CancelTaskSessionInput,
): TaskSession {
  if (session.status !== "active") {
    throw new Error("Cannot cancel a non-active session.");
  }

  const { completedAt: _completedAt, ...sessionWithoutCompletion } = session;

  return {
    ...sessionWithoutCompletion,
    status: "cancelled",
    cancelledAt: input.cancelledAt,
  };
}

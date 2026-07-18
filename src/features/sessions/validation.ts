import { isEnergyLevel, isUserContext } from "@/features/tasks";

import { SESSION_STATUSES, type SessionStatus } from "./constants";
import type { TaskSession } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDateString(value: unknown): value is string {
  if (!isNonEmptyString(value)) {
    return false;
  }

  const date = new Date(value);

  return !Number.isNaN(date.getTime()) && date.toISOString() === value;
}

function hasOptionalValidSnapshots(value: Record<string, unknown>): boolean {
  return (
    (value.context === undefined || isUserContext(value.context)) &&
    (value.energyLevel === undefined || isEnergyLevel(value.energyLevel))
  );
}

function isAbsent(record: Record<string, unknown>, key: string): boolean {
  return !(key in record);
}

export function isSessionStatus(value: unknown): value is SessionStatus {
  return SESSION_STATUSES.some((status) => status === value);
}

export function isTaskSession(value: unknown): value is TaskSession {
  if (!isRecord(value)) {
    return false;
  }

  if (
    !isNonEmptyString(value.id) ||
    !isNonEmptyString(value.taskId) ||
    value.id === value.taskId ||
    !isSessionStatus(value.status) ||
    !isIsoDateString(value.startedAt) ||
    !hasOptionalValidSnapshots(value)
  ) {
    return false;
  }

  if (value.status === "active") {
    return isAbsent(value, "completedAt") && isAbsent(value, "cancelledAt");
  }

  if (value.status === "completed") {
    return isIsoDateString(value.completedAt) && isAbsent(value, "cancelledAt");
  }

  return isIsoDateString(value.cancelledAt) && isAbsent(value, "completedAt");
}

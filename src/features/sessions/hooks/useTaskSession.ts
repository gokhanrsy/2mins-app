import { useCallback, useState } from "react";

import type { Task } from "@/features/tasks";

import { createTaskSession } from "../transitions";
import type { TaskSession } from "../types";

let sessionCounter = 0;

interface UseTaskSessionResult {
  session: TaskSession | undefined;
  startSession: (task: Task) => void;
  isActive: boolean;
}

function createLocalSessionId(): string {
  sessionCounter += 1;

  return `session-${Date.now()}-${sessionCounter}`;
}

export function useTaskSession(): UseTaskSessionResult {
  const [session, setSession] = useState<TaskSession | undefined>();

  const startSession = useCallback((task: Task) => {
    setSession((currentSession) => {
      if (currentSession !== undefined) {
        return currentSession;
      }

      return createTaskSession({
        id: createLocalSessionId(),
        taskId: task.id,
        startedAt: new Date().toISOString(),
      });
    });
  }, []);

  return {
    session,
    startSession,
    isActive: session?.status === "active",
  };
}

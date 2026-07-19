import { useCallback, useRef, useState } from "react";

import type { Task } from "@/features/tasks";

import { completeTaskSession, createTaskSession } from "../transitions";
import type { TaskSession } from "../types";

let sessionCounter = 0;

interface UseTaskSessionResult {
  session: TaskSession | undefined;
  startSession: (task: Task) => void;
  completeSession: () => TaskSession | undefined;
  resetSession: () => void;
  isActive: boolean;
  isCompleted: boolean;
}

function createLocalSessionId(): string {
  sessionCounter += 1;

  return `session-${Date.now()}-${sessionCounter}`;
}

export function useTaskSession(): UseTaskSessionResult {
  const [session, setSession] = useState<TaskSession | undefined>();
  const sessionRef = useRef<TaskSession | undefined>(undefined);

  const startSession = useCallback((task: Task) => {
    if (sessionRef.current !== undefined) {
      return;
    }

    const nextSession = createTaskSession({
      id: createLocalSessionId(),
      taskId: task.id,
      startedAt: new Date().toISOString(),
    });

    sessionRef.current = nextSession;
    setSession(nextSession);
  }, []);

  const completeSession = useCallback(() => {
    const currentSession = sessionRef.current;

    if (currentSession?.status !== "active") {
      return undefined;
    }

    const completedSession = completeTaskSession(currentSession, {
      completedAt: new Date().toISOString(),
    });

    sessionRef.current = completedSession;
    setSession(completedSession);

    return completedSession;
  }, []);

  const resetSession = useCallback(() => {
    sessionRef.current = undefined;
    setSession(undefined);
  }, []);

  return {
    session,
    startSession,
    completeSession,
    resetSession,
    isActive: session?.status === "active",
    isCompleted: session?.status === "completed",
  };
}

import type { Task } from "@/features/tasks";

export interface TaskRepository {
  getAll(): readonly Task[];
  getById(id: string): Task | undefined;
}

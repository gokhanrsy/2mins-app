import type { Task } from "@/features/tasks";

import { isTask } from "../validation";
import type { TaskRepository } from "./TaskRepository";

function copyTask(task: Task): Task {
  const taskCopy: Task = {
    ...task,
    energyLevels: Object.freeze([...task.energyLevels]),
    contexts: Object.freeze([...task.contexts]),
  };

  return Object.freeze(taskCopy);
}

export class LocalTaskRepository implements TaskRepository {
  private readonly tasks: readonly Task[];
  private readonly tasksById: ReadonlyMap<string, Task>;

  constructor(tasks: readonly Task[]) {
    const validatedTasks: Task[] = [];
    const tasksById = new Map<string, Task>();

    tasks.forEach((task, index) => {
      if (!isTask(task)) {
        throw new Error(`Invalid task at index ${index}.`);
      }

      if (tasksById.has(task.id)) {
        throw new Error(`Duplicate task id: ${task.id}`);
      }

      const immutableTask = copyTask(task);
      validatedTasks.push(immutableTask);
      tasksById.set(immutableTask.id, immutableTask);
    });

    this.tasks = Object.freeze(validatedTasks);
    this.tasksById = tasksById;
  }

  getAll(): readonly Task[] {
    return this.tasks;
  }

  getById(id: string): Task | undefined {
    return this.tasksById.get(id);
  }
}

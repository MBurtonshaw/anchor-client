import { getToday } from "./DateUtils";

/**
 * Returns true if a task-like entity was completed today.
 * Works for:
 * - tasks
 * - weekendTasks
 */
export function isCompletedToday(entity) {
  if (!entity?.lastCompleted) return false;

  return entity.lastCompleted === getToday();
}
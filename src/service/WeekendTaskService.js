import { api } from "../api";

export function getWeekendTask() {
  return api(`/weekendTask`);
}

export function updateWeekendTask(task, taskId) {
  return api(`/weekendTask/${taskId}`, "PUT", task);
}

export function completeWeekendTask(taskId) {
  return api(`/weekendTask/${taskId}/complete`, "PATCH");
}
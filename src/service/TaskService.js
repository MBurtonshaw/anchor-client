import { api } from "../api";

export function getTasks() {
  return api(`/tasks`);
}

export function getTaskById(taskId) {
  return api(`/tasks/${taskId}`);
}

export function createTask(task) {
  return api(`/tasks`, "POST", task);
}

export function updateTask(task, taskId) {
  return api(`/tasks/${taskId}`, "PUT", task);
}

export function completeTask(taskId) {
  return api(`/tasks/${taskId}/complete`, "PATCH");
}

export function deleteTask(taskId) {
  return api(`/tasks/${taskId}`, "DELETE");
}

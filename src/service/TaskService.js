import { api } from "../api";

export function getTasks() {
  return api(`/tasks`);
}

export function getTaskById(taskId) {
  return api(`/tasks/${taskId}`);
}

export function addTask(task) {
  return api(`/tasks`, "POST", task);
}

export function updateTask(task, taskId) {
  return api(`/tasks/${taskId}/edit`, "PUT", task);
}

export function completeTask(taskId) {
  return api(`/tasks/${taskId}/completed`, "PUT");
}

export function deleteTask(taskId) {
  return api(`/tasks/${taskId}`, "DELETE");
}

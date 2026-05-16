import { api } from "../api";

export function getGoals() {
  return api(`/goals`);
}

export function getGoalById(goalId) {
  return api(`/goals/${goalId}`);
}

export function addGoal(goal) {
  return api(`/goals`, "POST", goal);
}

export function updateGoal(goal, goalId) {
  return api(`/goals/${goalId}/edit`, "PUT", goal);
}

export function completeGoal(goalId) {
  return api(`/goals/${goalId}/completed`, "PUT");
}

export function deleteGoal(goalId) {
  return api(`/goals/${goalId}`, "DELETE");
}

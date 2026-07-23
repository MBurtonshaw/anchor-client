import { api } from "../api";

export function getGoals() {
  return api(`/goals`);
}

export function getCurrentGoal() {
  return api(`/goals/current`);
}

export function getGoalById(goalId) {
  return api(`/goals/${goalId}`);
}

export function createGoal(goal) {
  return api(`/goals`, "POST", goal);
}

export function updateGoal(goal, goalId) {
  return api(`/goals/${goalId}`, "PUT", goal);
}

export function completeGoal(goalId) {
  return api(`/goals/${goalId}/complete`, "PATCH");
}

export function deleteGoal(goalId) {
  return api(`/goals/${goalId}`, "DELETE");
}

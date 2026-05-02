import { api } from "../api";

export function getTodosByUser() {
  return api(`/todos`);
}

export function getTodoById(todoId) {
  return api(`/todos/${todoId}`);
}

export function addTodo(todo) {
  return api(`/todos`, "POST", todo);
}

export function updateTodo(todo, todoId) {
  return api(`/todos/${todoId}/edit`, "PUT", todo);
}

export function markFinished(todoId) {
  return api(`/todos/${todoId}/finished`, "PUT");
}

export function deleteTodo(todoId) {
  return api(`/todos/${todoId}`, "DELETE");
}

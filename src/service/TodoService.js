import { api } from '../api';

// export function addTodo(todo) {
//   return api('/todos', 'POST', todo);
// }

export function getTodosByUser(userId) {
  return api(`/users/${userId}/todos`);
}

export function addTodo(userId, todo) {
  return api(`/users/${userId}/todos`, 'POST', todo);
}

export function updateTodo(userId, todo) {
  return api(`/users/${userId}/todos/${todo.id}`, 'PUT', todo);
}

export function markFinished(userId, todoId) {
  return api(`/users/${userId}/todos/${todoId}/finished`, "PUT");
}

export function deleteTodo(userId, todoId) {
  return api(`/users/${userId}/todos/${todoId}`, 'DELETE');
}
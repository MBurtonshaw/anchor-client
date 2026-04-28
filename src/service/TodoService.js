import { api } from '../api';

// export function addTodo(todo) {
//   return api('/todos', 'POST', todo);
// }

export function getTodosByUser(user_id) {
  return api(`/users/${user_id}/todos`);
}
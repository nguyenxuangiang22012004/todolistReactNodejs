import instance from "../config/axios";
import type { Todo } from "../components/todolist/Todolist";


export const getLists = () => {
    return instance.get('/lists');
}

export const updateTodo = (id: number, updateTodo: Partial<Todo>) => {
  return instance.put(`/update/${id}`, updateTodo);
};

export const updateStatus = (id: number, is_done: number) => {
  return instance.put(`/updateStatus/${id}`, { is_done }); 
}

export const deleteTodo = (id: number) => {
  return instance.delete(`/delete/${id}`);
};
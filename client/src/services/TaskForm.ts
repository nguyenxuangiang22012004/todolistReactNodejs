import instance from "../config/axios";

export const addTasks = (data: {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}) => {
  return instance.post('/tasks', data);
};
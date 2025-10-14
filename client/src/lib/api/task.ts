import api from './axios';
import { ITask } from '@/types/task';

// Fetch tasks with optional filter
export const fetchTasks = async (filter: 'all' | 'active' | 'done' = 'all'): Promise<ITask[]> => {
  const response = await api.get('/tasks', {
    params: { filter },
  });
  return response.data;
};

// Fetch a single task by ID
export const fetchTaskById = async (id: string): Promise<ITask> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (task: {
  title: string;
  description?: string;
}): Promise<ITask> => {
  const response = await api.post('/tasks', task);
  return response.data;
};

// Update task
export const updateTask = async (id: string, task: Partial<ITask>): Promise<ITask> => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

// Delete task
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

// Mark task as done
export const acceptTask = async (id: string): Promise<ITask> => {
  const response = await api.patch(`/tasks/${id}/accept`);
  return response.data;
};

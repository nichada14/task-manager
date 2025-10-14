import { Request, Response } from 'express';
import Task from '../models/task.model';
import { FilterQuery } from 'mongoose';
import { ITask } from '../types/task';

// Get all tasks based on filter (all, active, done)
export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const filter = (req.query.filter as string) || 'all';

    let query: FilterQuery<ITask> = { user: userId };

    if (filter === 'active') {
      query.status = 'active';
    } else if (filter === 'done') {
      query.status = 'done';
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { title, description } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = new Task({ title, description, user: userId });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task by ID
export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update fields if provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined && ['active', 'done'].includes(status)) {
      task.status = status;
    }

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete task by ID
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark task as done
export const acceptTask = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = 'done';
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

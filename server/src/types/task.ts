// types/task.ts
import mongoose, { Document } from 'mongoose';

export interface ITask extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: 'active' | 'done';
  createdAt: Date;
  updatedAt: Date;
}

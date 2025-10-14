import mongoose, { Schema } from 'mongoose';
import { ITask } from '../types/task';

const TaskSchema: Schema<ITask> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['active', 'done'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);

'use client';

import React, { useState } from 'react';
import { ITask } from '@/types/task';
import TaskForm from '@/components/tasks/TaskForm';
import { createTask } from '@/lib/api/task';

export default function CreateTaskPage() {
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  // Handle form submission to create a new task
  const handleSubmit = async (task: Partial<ITask>) => {
    try {
      console.log('Submitting task:', task);

      const newTask = await createTask({
        title: task.title ?? '',
        description: task.description ?? '',
      });

      // Reset editing task state after submission
      setEditingTask(null);
    } catch (error) {
      console.error('❌ Failed to submit task:', error);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    console.log('Cancel creating task');
  };

  return (
    <div>
      <TaskForm
        onSubmit={handleSubmit}
        initialData={editingTask || undefined}
        isEditing={!!editingTask}
        onClose={handleCancel}
      />
    </div>
  );
}

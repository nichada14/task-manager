'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TaskForm from '@/components/tasks/TaskForm';
import { fetchTaskById, updateTask } from '@/lib/api/task'; 
import { ITask } from '@/types/task';

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();
  const [task, setTask] = useState<ITask | null>(null);

  // Get ID from URL
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  // Fetch task data when ID is available
  useEffect(() => {
    if (id) {
      fetchTaskById(id)
        .then(setTask)
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  if (!task) return <p>Loading...</p>;

  // Submit updated task
  const handleUpdate = async (data: Partial<ITask>) => {
    if (!id) return;
    try {
      await updateTask(id, data);
      router.push('/tasks');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-full max-w-md">
        <TaskForm
          initialData={task}
          isEditing={true}
          onSubmit={handleUpdate}
          onClose={() => router.push('/tasks')}
        />
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TaskFormProps } from '@/types/task';

export default function TaskForm({
  initialData,
  onSubmit,
  isEditing = false,
  onClose,
}: TaskFormProps & { onClose: () => void }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onSubmit({ title, description });

    // Reset form and redirect
    setTitle('');
    setDescription('');
    router.push('/tasks');
  };

  // Cancel and navigate back
  const handleCancel = () => {
    router.push('/tasks');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-4 text-[#B0CA08]">
        {isEditing ? 'Edit Task' : 'Add Task'}
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full border border-[#B0CA08] p-2 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="w-full border border-[#B0CA08] p-2 mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer "
        >
          {isEditing ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}

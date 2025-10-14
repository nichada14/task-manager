import { useState } from 'react';
import { TaskItemProps } from '@/types/task';
import Button from '../ui/Button';

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const [isLoading, setIsLoading] = useState(false); 

  // Toggle task status to done
  const handleToggle = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onToggle();
    } catch (error) {
      console.error('Failed to toggle task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDone = task.status === 'done'; 

  return (
    <div className="flex items-center justify-between p-3 border border-[#b2dfdb] rounded">
      {/* Task title and description */}
      <div>
        <h3 className={`font-medium ${isDone ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-600">{task.description}</p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        {/* Show "Done" button only if task is not yet done */}
        {!isDone && (
          <Button variant="create" onClick={handleToggle} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Done'}
          </Button>
        )}

        {/* Show Edit" button only if task is not done */}
        {!isDone && (
          <Button
            variant="secondary"
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:underline"
            disabled={isLoading}
          >
            Edit
          </Button>
        )}

        {/* Always show delete button */}
        <Button
          variant="delete"
          onClick={onDelete}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

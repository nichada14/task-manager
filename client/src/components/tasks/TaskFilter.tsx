'use client';

import { TaskFilterType, TaskFilterProps } from '@/types/task';

const filters: TaskFilterType[] = ['all', 'active', 'done'];

export default function TaskFilter({ filter, setFilter }: TaskFilterProps) {
  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded transition-colors duration-200 ${
            filter === f
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

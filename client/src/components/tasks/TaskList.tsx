'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaListAlt, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { ITask, TaskFilterType, StatusCardProps } from '@/types/task';
import { fetchTasks, acceptTask, deleteTask } from '@/lib/api/task';
import TaskItem from './TaskItem';
import Button from '../ui/Button';

const StatusCard = ({ label, count, active, icon, onClick }: StatusCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-lg border flex items-center justify-between gap-3 shadow-sm transition-all duration-200 ${
        active ? 'bg-[#696969] text-[#B0CA08]' : 'bg-white text-[#B0CA08] hover:bg-blue-50'
      }`}
    >
      <div className="flex items-center gap-2 text-lg">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>
      <span className="text-xl font-bold">{count}</span>
    </div>
  );
};

export default function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filter, setFilter] = useState<TaskFilterType>('all');
  const router = useRouter();

  // Fetch all tasks from the backend
  const fetchAllTasks = async () => {
    try {
      const res = await fetchTasks();
      setTasks(res);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  // Fetch tasks on initial load
  useEffect(() => {
    fetchAllTasks();
  }, []);

  // Mark task as done
  const handleAccept = async (id: string) => {
    try {
      await acceptTask(id);
      await fetchAllTasks(); 
    } catch (err) {
      console.error('Failed to accept task:', err);
    }
  };

  // Delete a task
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      await fetchAllTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  // Filter tasks based on selected status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return task.status !== 'done';
    if (filter === 'done') return task.status === 'done';
    return true;
  });

  // Count for each status type
  const allCount = tasks.length;
  const activeCount = tasks.filter((t) => t.status !== 'done').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  return (
    <div className="p-4">
      {/* Page header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#B0CA08]">My Tasks</h2>
        <Button onClick={() => router.push('/tasks/create')}>+ New Task</Button>
      </div>

      {/* Filter status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatusCard
          label="All"
          count={allCount}
          active={filter === 'all'}
          onClick={() => setFilter('all')}
          icon={<FaListAlt />}
        />
        <StatusCard
          label="Active"
          count={activeCount}
          active={filter === 'active'}
          onClick={() => setFilter('active')}
          icon={<FaSpinner className="animate-spin-slow" />}
        />
        <StatusCard
          label="Done"
          count={doneCount}
          active={filter === 'done'}
          onClick={() => setFilter('done')}
          icon={<FaCheckCircle />}
        />
      </div>

      {/* Task list section */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks in this category.</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={async () => await handleAccept(task._id)}
              onDelete={() => handleDelete(task._id)}
              onEdit={(task) => router.push(`/tasks/edit/${task._id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}

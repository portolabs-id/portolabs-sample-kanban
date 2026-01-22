'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Column from '@/components/Column';
import TaskModal from '@/components/TaskModal';
import { Task } from '@/types';

const initialTasks: Task[] = [
  { id: 't1', title: 'Setup project repository', status: 'todo' },
  { id: 't2', title: 'Design database schema', status: 'doing' },
  { id: 't3', title: 'Team meeting kickoff', status: 'done' },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentStatus, setCurrentStatus] = useState<Task['status']>('todo');

  useEffect(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(initialTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = (status: Task['status']) => {
    setCurrentTask(null);
    setCurrentStatus(status);
    setIsModalOpen(true);
  };

  const handleEditTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setCurrentTask(task);
      setCurrentStatus(task.status);
      setIsModalOpen(true);
    }
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (currentTask) {
      setTasks(tasks.map((t) => (t.id === currentTask.id ? { ...t, ...taskData } : t)));
    } else {
      const newTask: Task = {
        id: 't' + Date.now(),
        title: taskData.title!,
        status: taskData.status as 'todo' | 'doing' | 'done',
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text', id);
    const target = e.target as HTMLElement;
    target.classList.add('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    handleMoveTask(id, newStatus);
  };

  const handleMoveTask = (id: string, newStatus: Task['status']) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: newStatus } : t
      )
    );
  };

  const columns = [
    { status: 'todo' as const, title: 'Akan Dikerjakan', color: 'bg-zinc-400' },
    { status: 'doing' as const, title: 'Sedang Dikerjakan', color: 'bg-amber-400' },
    { status: 'done' as const, title: 'Selesai', color: 'bg-emerald-500' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="h-full min-w-full inline-flex p-6 gap-6 align-top">
          {columns.map((column) => (
            <Column
              key={column.status}
              status={column.status}
              title={column.title}
              color={column.color}
              tasks={tasks.filter((t) => t.status === column.status)}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragStart={handleDragStart}
              onMoveTask={handleMoveTask}
            />
          ))}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        task={currentTask}
        status={currentStatus}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </>
  );
}

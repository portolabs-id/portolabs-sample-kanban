import { Task } from '@/types';
import TaskCard from './TaskCard';

interface ColumnProps {
  status: 'todo' | 'doing' | 'done';
  title: string;
  color: string;
  tasks: Task[];
  onAddTask: (status: string) => void;
  onEditTask: (id: string) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onMoveTask: (id: string, newStatus: string) => void;
}

export default function Column({
  status,
  title,
  color,
  tasks,
  onAddTask,
  onEditTask,
  onDrop,
  onDragOver,
  onDragStart,
  onMoveTask,
}: ColumnProps) {
  return (
    <div className="flex flex-col w-80 md:w-96 shrink-0 h-full max-h-full bg-zinc-100/50 rounded-xl border border-zinc-200/60">
      <div className="p-4 flex items-center justify-between sticky top-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`}></div>
          <h2 className="text-sm font-medium text-zinc-700">{title}</h2>
          <span className="text-xs text-zinc-400 font-mono ml-1">{tasks.length}</span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="text-zinc-400 hover:text-zinc-900 transition-colors p-1 rounded hover:bg-zinc-200/50"
        >
          <iconify-icon icon="solar:add-circle-linear" width="20"></iconify-icon>
        </button>
      </div>

      <div
        className="flex-1 overflow-y-auto px-3 pb-3 space-y-3"
        onDrop={(e) => onDrop(e, status)}
        onDragOver={onDragOver}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDragStart={onDragStart}
            onMove={onMoveTask}
          />
        ))}
      </div>
    </div>
  );
}

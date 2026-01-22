import { useState, useEffect } from 'react';
import { Task } from '@/types';

interface TaskModalProps {
  isOpen: boolean;
  task: Task | null;
  status: string;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export default function TaskModal({
  isOpen,
  task,
  status,
  onClose,
  onSave,
  onDelete,
}: TaskModalProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    } else {
      setTitle('');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (task) {
      onSave({ id: task.id, title, status: task.status });
    } else {
      onSave({ title, status });
    }

    setTitle('');
    onClose();
  };

  const handleDelete = () => {
    if (task && confirm('Yakin ingin menghapus tugas ini?')) {
      onDelete(task.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-xl shadow-2xl border border-zinc-100 p-6 transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-semibold text-zinc-900">
            {task ? 'Edit Tugas' : 'Tugas Baru'}
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
            <iconify-icon icon="solar:close-circle-linear" width="24"></iconify-icon>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                Judul Tugas
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Apa yang perlu dikerjakan?"
                className="w-full bg-zinc-50 text-sm border border-zinc-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all placeholder:text-zinc-400"
                autoFocus
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Simpan</span>
              <iconify-icon icon="solar:disk-linear" width="16"></iconify-icon>
            </button>
          </div>
        </form>

        {task && (
          <div className="mt-4 pt-4 border-t border-zinc-100">
            <button
              onClick={handleDelete}
              className="w-full text-xs font-medium text-red-500 hover:text-red-600 flex items-center justify-center gap-2 py-2"
            >
              <iconify-icon icon="solar:trash-bin-trash-linear" width="14"></iconify-icon>
              Hapus Tugas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

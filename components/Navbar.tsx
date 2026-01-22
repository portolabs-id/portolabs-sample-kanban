import { Kanban } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex-none border-b border-zinc-200 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white shadow-sm">
          <Kanban size={18} />
        </div>
        <h1 className="text-lg font-semibold tracking-tight text-zinc-900">TASKBOARD.</h1>
      </div>
    </nav>
  );
}

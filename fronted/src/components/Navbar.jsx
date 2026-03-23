import { Menu, Bell, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-500 hover:text-slate-700">
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex items-center gap-5">
        <button className="relative text-slate-500 hover:text-emerald-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <img 
            src="https://ui-avatars.com/api/?name=Admin+User&background=10b981&color=fff" 
            alt="Admin User" 
            className="w-9 h-9 rounded-full border-2 border-emerald-100"
          />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-700">Admin User</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

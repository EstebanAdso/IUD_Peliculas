import { Link, useLocation } from 'react-router-dom';
import { Film, User, Building, Tag, Clapperboard, Home } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Géneros', path: '/generos', icon: <Tag className="w-5 h-5" /> },
    { name: 'Directores', path: '/directores', icon: <User className="w-5 h-5" /> },
    { name: 'Productoras', path: '/productoras', icon: <Building className="w-5 h-5" /> },
    { name: 'Tipos', path: '/tipos', icon: <Clapperboard className="w-5 h-5" /> },
    { name: 'Media (Películas/Series)', path: '/medias', icon: <Film className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl hidden md:flex">
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-wider text-emerald-400">PeliculasApp</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        © 2026 Admin Panel
      </div>
    </aside>
  );
}

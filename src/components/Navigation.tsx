import { Home, Grid3X3, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/scenes', icon: Grid3X3, label: 'Scenes' },
    { path: '/stats', icon: BarChart3, label: 'Stats' },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = currentPath === path;
          return (
            <Link key={path} to={path} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <Icon size={24} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

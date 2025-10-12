'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import { 
  Bell, 
  Search, 
  Menu,
  ChevronDown,
  LogOut,
  Settings,
  User
} from 'lucide-react';

export default function AdminHeader({ onMenuClick, title = "Dashboard", subtitle = "" }) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user] = useState({
    email: getCookie('email') || '',
    role: getCookie('role') || ''
  });

  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('role');
    deleteCookie('email');
    router.push('/admin/login');
  };

  const handleProfile = () => {
    router.push('/admin/profile');
    setShowProfileMenu(false);
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-400 hover:text-white mr-4 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {subtitle && (
              <p className="text-gray-400 text-sm">{subtitle}</p>
            )}
            {!subtitle && user.email && (
              <p className="text-gray-400 text-sm">Welcome back, {user.email}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ background: '#6941c6' }}></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: '#6941c6' }}>
                {user.email.charAt(0).toUpperCase()}
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-700/50">
                  <p className="text-white text-sm font-medium truncate">{user.email}</p>
                  <p className="text-gray-400 text-xs">{user.role}</p>
                </div>
                
                <button
                  onClick={handleProfile}
                  className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </button>
                
                <div className="border-t border-gray-700/50 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-800/50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        ></div>
      )}
    </header>
  );
}
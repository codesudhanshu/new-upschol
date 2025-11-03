'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import { 
  Home,
  Users,
  UserPlus,
  Settings,
  BookOpen,
  GraduationCap,
  Layers,
  School,
  Handshake,
  Briefcase,
  MessageSquare,
  FileText,
  HelpCircle,
  Lightbulb,
  Star,
  BarChart2,
  Building2,
  ClipboardList,
  LogOut,
  Shield,
  X
} from 'lucide-react';

export default function AdminSidebar({ isOpen, onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState({
    email: getCookie('email') || '',
    role: getCookie('role') || ''
  });

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard', active: pathname === '/admin/dashboard' },
    { icon: ClipboardList, label: 'Leads', href: '/admin/dashboard/leads', active: pathname === '/admin/dashboard/leads' },
    // { icon: ClipboardList, label: 'Announcement', href: '/admin/dashboard/announcement', active: pathname === '/admin/dashboard/announcement' },
    { icon: School, label: 'University', href: '/admin/dashboard/university', active: pathname === '/admin/dashboard/university' },
    { icon: Layers, label: 'Degree', href: '/admin/dashboard/course-category', active: pathname === '/admin/dashboard/course-category' },
    { icon: BookOpen, label: 'Courses', href: '/admin/dashboard/courses', active: pathname === '/admin/dashboard/courses' },
    { icon: Building2, label: 'Department', href: '/admin/dashboard/department', active: pathname === '/admin/dashboard/department' },
    { icon: Handshake, label: 'Affiliated Institution', href: '/admin/dashboard/affiliate-institute', active: pathname === '/admin/dashboard/affiliate-institute' },
    { icon: Briefcase, label: 'Company Associated', href: '/admin/dashboard/company-associated', active: pathname === '/admin/dashboard/company-associated' },
    { icon: Star, label: 'Testimonials', href: '/admin/dashboard/testimonials', active: pathname === '/admin/dashboard/testimonials' },
    { icon: BarChart2, label: 'Industry Experts', href: '/admin/dashboard/industry-experts', active: pathname === '/admin/dashboard/industry-experts' },
    { icon: Star, label: 'Industry Testimonials', href: '/admin/dashboard/industry-experts-testimonials', active: pathname === '/admin/dashboard/industry-experts-testimonials' },
    { icon: FileText, label: 'Blogs', href: '/admin/dashboard/blogs', active: pathname === '/admin/dashboard/blogs' },
    { icon: FileText, label: 'Specialization', href: '/admin/dashboard/specialization', active: pathname === '/admin/dashboard/specialization' },
    { icon: GraduationCap, label: 'Careers', href: '/admin/dashboard/careers', active: pathname === '/admin/dashboard/careers' },
    { icon: HelpCircle, label: 'Faqs', href: '/admin/dashboard/faqs', active: pathname === '/admin/dashboard/faq' },
    { icon: Lightbulb, label: 'Tips Banners', href: '/admin/dashboard/tips-insights', active: pathname === '/admin/dashboard/tips-insights' },
    { icon: Users, label: 'Users', href: '/admin/dashboard/users', count: 0, active: pathname === '/admin/dashboard/users' },
    { icon: UserPlus, label: 'Create User', href: '/admin/dashboard/create-user', active: pathname === '/admin/dashboard/create-user' },
  ];

  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('role');
    deleteCookie('email');
    router.push('/admin/login');
  };

  const handleNavigation = (href) => {
    router.push(href);
    onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Sidebar */}
     <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900/80 backdrop-blur-xl border-r border-gray-700/50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 ' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>

        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg mr-3" style={{ background: '#6941c6' }}>
                <Shield className="w-5 h-5 text-white m-1.5" />
              </div>
              <span className="text-white font-bold text-lg">Upschol</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.href)}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  item.active 
                    ? 'text-white shadow-lg transform scale-[1.02]' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
                style={item.active ? { background: '#6941c6' } : {}}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="flex-1">{item.label}</span>
                {item.count && (
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex items-center p-3 rounded-xl bg-gray-800/50">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3" style={{ background: '#6941c6' }}>
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user.email}</p>
                <p className="text-gray-400 text-xs">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}
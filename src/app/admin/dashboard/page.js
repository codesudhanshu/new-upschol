'use client';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { 
  Users, 
  Settings, 
  UserPlus, 
  Activity,
  TrendingUp,
  Shield
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const userEmail = getCookie('email') || '';
  const userRole = getCookie('role') || 'Administrator'; // ✅ Get role from cookie

  const handleCreateUser = () => {
    router.push('/admin/dashboard/create-user');
  };

  const stats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: Users },
    { label: 'Active Sessions', value: '89', change: '+5%', icon: Activity },
    { label: 'Growth Rate', value: '23.5%', change: '+8%', icon: TrendingUp },
    { label: 'System Health', value: '99.9%', change: '0%', icon: Shield },
  ];

  const quickActions = [
    { 
      title: 'User Management', 
      desc: 'Manage user accounts and permissions', 
      icon: Users,
      onClick: () => router.push('/admin/users')
    },
    { 
      title: 'System Settings', 
      desc: 'Configure system preferences', 
      icon: Settings,
      onClick: () => router.push('/admin/settings')
    },
    { 
      title: 'Analytics', 
      desc: 'View detailed analytics and reports', 
      icon: Activity,
      onClick: () => router.push('/admin/analytics')
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300" 
            style={{ boxShadow: '0 10px 25px rgba(105, 65, 198, 0.1)', zIndex: "0" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-green-400 text-sm mt-1">
                  {stat.change} from last month
                </p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center" 
                style={{ background: 'rgba(105, 65, 198, 0.2)' }}
              >
                <stat.icon className="w-6 h-6" style={{ color: '#6941c6' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Card */}
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" 
          style={{ background: 'rgba(105, 65, 198, 0.2)' }}
        >
          <span className="text-4xl">👋</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
        <p className="text-gray-400 text-lg mb-1">{userEmail}</p>
        <p className="text-sm text-gray-500 mb-6">
          Role: <span className="font-semibold" style={{ color: '#6941c6' }}>
            {userRole}
          </span>
        </p>

        {/* ✅ Conditionally show button if role is not 'sales' */}
        {userRole !== 'sales' && (
          <button
            onClick={handleCreateUser}
            className="px-8 py-3 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            style={{ 
              background: '#6941c6',
              boxShadow: '0 10px 25px rgba(105, 65, 198, 0.3)'
            }}
          >
            <UserPlus className="w-5 h-5 inline mr-2" />
            Create New User
          </button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <div 
            key={index} 
            onClick={action.onClick}
            className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div 
              className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform" 
              style={{ background: 'rgba(105, 65, 198, 0.2)' }}
            >
              <action.icon className="w-6 h-6" style={{ color: '#6941c6' }} />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">{action.title}</h3>
            <p className="text-gray-400 text-sm">{action.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

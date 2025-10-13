'use client';
import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear error when user starts typing
  };

  const setCookie = (name, value, options = {}) => {
    let cookie = `${name}=${value}`;
    if (options.path) cookie += `; path=${options.path}`;
    if (options.sameSite) cookie += `; sameSite=${options.sameSite}`;
    document.cookie = cookie;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('https://upschol.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setCookie('token', data.token, { path: '/', sameSite: 'Strict' });
        setCookie('role', data.role, { path: '/', sameSite: 'Strict' });
        setCookie('email', data.email, { path: '/', sameSite: 'Strict' });
        
        // Simulate navigation - in real app, you'd use your routing solution
        alert('Login successful! Redirecting to admin dashboard...');
        window.location.href = '/admin/dashboard';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: '#14081E' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ background: '#6941c6' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" style={{ background: '#6941c6' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500" style={{ background: '#6941c6' }}></div>
      </div>

      {/* Login card */}
      <div className="relative z-10 bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 p-8 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:shadow-purple-500/10 hover:shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg" style={{ background: '#6941c6' }}>
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Upschol
          </h2>
          <p className="text-gray-400 text-sm mt-2">Welcome back, sign in to continue</p>
        </div>

        <div className="space-y-6">
          {/* Email field */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:transition-colors" style={{ color: form.email ? '#6941c6' : undefined }} />
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm"
                style={{
                  borderColor: form.email ? '#6941c6' : undefined,
                  boxShadow: form.email ? `0 0 0 2px rgba(105, 65, 198, 0.2)` : undefined
                }}
              />
            </div>
          </div>

          {/* Password field */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:transition-colors" style={{ color: form.password ? '#6941c6' : undefined }} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm"
                style={{
                  borderColor: form.password ? '#6941c6' : undefined,
                  boxShadow: form.password ? `0 0 0 2px rgba(105, 65, 198, 0.2)` : undefined
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:transition-colors"
                style={{ color: showPassword ? '#6941c6' : undefined }}
                onMouseEnter={(e) => e.target.closest('button').style.color = '#6941c6'}
                onMouseLeave={(e) => !showPassword && (e.target.closest('button').style.color = '')}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full text-white py-3 rounded-xl font-semibold shadow-lg focus:outline-none focus:ring-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{ 
              background: '#6941c6',
              boxShadow: '0 10px 25px rgba(105, 65, 198, 0.3)',
              ':hover': { boxShadow: '0 15px 35px rgba(105, 65, 198, 0.4)' }
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#5a35b8';
              e.target.style.boxShadow = '0 15px 35px rgba(105, 65, 198, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#6941c6';
              e.target.style.boxShadow = '0 10px 25px rgba(105, 65, 198, 0.3)';
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 animate-in slide-in-from-top-2 duration-300">
              <p className="text-red-400 text-sm text-center flex items-center justify-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Secured by enterprise-grade encryption
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { User, Lock } from 'lucide-react';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate short async delay for UX feedback
    await new Promise(r => setTimeout(r, 500));

    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('shukrana_admin_session', JSON.stringify({ username: 'admin', role: 'admin' }));
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Invalid username or password.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          {/* Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#232F46] rounded-xl mb-4">
              <span className="text-xl font-black text-[#ED8C32]">SKS</span>
            </div>
            <h1 className="text-xl font-bold text-[#232F46]">Admin Portal</h1>
            <p className="text-sm text-gray-400 mt-1">Shukrana Kalyan Sangh</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4">
              <Alert variant="danger">{error}</Alert>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Username"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              autoComplete="username"
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              autoComplete="current-password"
              required
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={loading}
              className="mt-2"
            >
              Login
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Shukrana Kalyan Sangh Foundation — Admin Access Only
        </p>
      </div>
    </div>
  );
}

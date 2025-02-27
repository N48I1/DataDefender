import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Network } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Network className="h-10 w-10 text-purple-600" />
          <h1 className="text-2xl font-bold text-purple-900">SDN Manager</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-purple-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-purple-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-purple-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:ring focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-sm text-center text-gray-600">
            Use email: admin@example.com<br />
            password: admin123
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
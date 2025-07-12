import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';

interface LoginModalProps {
  onClose: () => void;
  switchToSignup: () => void;
}

export default function LoginModal({ onClose, switchToSignup }: LoginModalProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  interface LoginResponse {
    message: string;
    accessToken?: string;
    [key: string]: any;
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.post<LoginResponse>("http://localhost:3000/auth/login", { email, password });
      if (res?.data?.message === "Successfully logged in") {
        localStorage.setItem("user-access-token", res?.data?.accessToken ?? "");
        onClose();
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(typeof err === 'string' ? err : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0,0,0,0.35)'
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Login to ReWear</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleLogin} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="login-email" className="block text-gray-700 mb-2">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="login-password" className="block text-gray-700 mb-2">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="p-5 bg-gray-50 border-t text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            onClick={switchToSignup}
            className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
          >
            Sign up now
          </button>
        </div>
      </div>
    </div>
  );
}
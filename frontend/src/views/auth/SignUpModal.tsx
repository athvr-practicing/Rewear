import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';

interface SignUpModalProps {
  onClose: () => void;
  switchToLogin: () => void;
}

export default function SignUpModal({ onClose, switchToLogin }: SignUpModalProps) {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  interface SignUpResponse {
    message: string;
    [key: string]: any;
  }

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.post<SignUpResponse>("http://localhost:3000/auth/signup", { username, email, password });
      if (res?.data?.message === "Successfully registered new user") {
        switchToLogin();
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(typeof err === 'string' ? err : "Signup failed. Please try again.");
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
          <h2 className="text-2xl font-bold text-gray-800">Join ReWear</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSignUp} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="signup-username" className="block text-gray-700 mb-2">Username</label>
            <input
              id="signup-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a username"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="signup-email" className="block text-gray-700 mb-2">Email</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="signup-password" className="block text-gray-700 mb-2">Password</label>
            <input
              id="signup-password"
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
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="p-5 bg-gray-50 border-t text-center">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={switchToLogin}
            className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
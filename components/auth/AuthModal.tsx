import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Button } from '../common/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultTab = 'login' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <h2 className="text-2xl font-bold text-stone-800">
            {activeTab === 'login' ? 'Welcome Back' : 'Join ArtisanMarket'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 px-6 text-center font-medium transition-colors ${
              activeTab === 'login'
                ? 'text-amber-700 border-b-2 border-amber-700'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 px-6 text-center font-medium transition-colors ${
              activeTab === 'register'
                ? 'text-amber-700 border-b-2 border-amber-700'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'login' ? (
            <LoginForm onSuccess={onClose} />
          ) : (
            <RegisterForm onSuccess={onClose} />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center text-sm text-stone-600">
          {activeTab === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setActiveTab('register')}
                className="text-amber-700 hover:text-amber-800 font-medium"
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setActiveTab('login')}
                className="text-amber-700 hover:text-amber-800 font-medium"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { validateEmail } from '../../utils/validation';

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        setMessage('Successfully signed in! Welcome back.');
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setErrors({ general: 'Invalid email or password. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {message}
        </div>
      )}

      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-300' : 'border-stone-300'
            }`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
              errors.password ? 'border-red-300' : 'border-stone-300'
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500" />
          <span className="ml-2 text-sm text-stone-600">Remember me</span>
        </label>
        <button type="button" className="text-sm text-amber-700 hover:text-amber-800">
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        loading={isLoading}
        className="w-full"
      >
        Sign In
      </Button>

      <div className="text-center text-sm text-stone-600">
        <p>Demo credentials: Any email and password combination will work</p>
      </div>
    </form>
  );
};
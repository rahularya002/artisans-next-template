import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { validateEmail, validatePassword, validateName } from '../../utils/validation';
import { RegisterData } from '../../types';

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isArtisan: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!validateName(formData.firstName)) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!validateName(formData.lastName)) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors.join('. ');
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const success = await register(formData as RegisterData);
      if (success) {
        setMessage('Account created successfully! Welcome to ArtisanMarket.');
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                errors.firstName ? 'border-red-300' : 'border-stone-300'
              }`}
              placeholder="First name"
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
              errors.lastName ? 'border-red-300' : 'border-stone-300'
            }`}
            placeholder="Last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

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
            placeholder="Create a password"
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

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
              errors.confirmPassword ? 'border-red-300' : 'border-stone-300'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isArtisan"
            checked={formData.isArtisan}
            onChange={handleChange}
            className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
          />
          <span className="text-sm text-stone-700">
            I am an artisan and want to sell my products
          </span>
        </label>
      </div>

      <Button
        type="submit"
        loading={isLoading}
        className="w-full"
      >
        Create Account
      </Button>

      <div className="text-xs text-stone-500 text-center">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </div>
    </form>
  );
};
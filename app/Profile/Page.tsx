'use client'
import { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';
import { validateEmail, validateName, validatePhone } from '@/utils/validation';

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(
    user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone || '',
          address: {
            street: user.address?.street || '',
            city: user.address?.city || '',
            state: user.address?.state || '',
            zipCode: user.address?.zipCode || '',
            country: user.address?.country || 'USA'
          }
        }
      : {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'USA'
          }
        }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">Please log in to view your profile</h1>
        </div>
      </div>
    );
  }

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

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const success = await updateProfile(formData);
      if (success) {
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setErrors({ general: 'Failed to update profile. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    }
  };

  const handleCancel = () => {
    setFormData(user ? {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      address: {
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zipCode: user.address?.zipCode || '',
        country: user.address?.country || 'USA'
      }
    } : {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      }
    });
    setIsEditing(false);
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-2">My Profile</h1>
            <p className="text-stone-600">Manage your account information and preferences</p>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-amber-700" />
                  )}
                </div>
                <h2 className="text-xl font-semibold text-stone-800">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-stone-600">{user.email}</p>
                {user.isArtisan && (
                  <span className="inline-block bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full mt-2">
                    Artisan
                  </span>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200 mt-6">
              <h3 className="font-semibold text-stone-800 mb-4">Account Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-stone-600">Orders</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Wishlist Items</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Reviews</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200">
              {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {message}
                </div>
              )}

              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-stone-800 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-colors ${
                            isEditing
                              ? 'focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                              : 'bg-stone-50'
                          } ${errors.firstName ? 'border-red-300' : 'border-stone-300'}`}
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
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                          isEditing
                            ? 'focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                            : 'bg-stone-50'
                        } ${errors.lastName ? 'border-red-300' : 'border-stone-300'}`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-stone-800 mb-4">Contact Information</h3>
                  <div className="space-y-4">
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
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-colors ${
                            isEditing
                              ? 'focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                              : 'bg-stone-50'
                          } ${errors.email ? 'border-red-300' : 'border-stone-300'}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="+1 (555) 123-4567"
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-colors ${
                            isEditing
                              ? 'focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                              : 'bg-stone-50'
                          } ${errors.phone ? 'border-red-300' : 'border-stone-300'}`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-stone-800 mb-4">Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Street Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
                        <input
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-colors ${
                            isEditing
                              ? 'focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                              : 'bg-stone-50'
                          } border-stone-300`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                            isEditing
                              ? 'focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                              : 'bg-stone-50'
                          } border-stone-300`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                            isEditing
                              ? 'focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                              : 'bg-stone-50'
                          } border-stone-300`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="address.zipCode"
                          value={formData.address.zipCode}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                            isEditing
                              ? 'focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                              : 'bg-stone-50'
                          } border-stone-300`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      loading={isLoading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
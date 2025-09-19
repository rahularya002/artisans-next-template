'use client'
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Lock, Package, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';
import { validateEmail, validateName } from '@/utils/validation';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || 'USA'
    },
    payment: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-stone-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">Your cart is empty</h1>
          <Link href="/Products" className="text-amber-700 hover:text-amber-800">
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice > 75 ? 0 : 8.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

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
    } else if (name.startsWith('payment.')) {
      const paymentField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        payment: {
          ...prev.payment,
          [paymentField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!validateName(formData.firstName)) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!validateName(formData.lastName)) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.address.street) {
      newErrors['address.street'] = 'Street address is required';
    }
    
    if (!formData.address.city) {
      newErrors['address.city'] = 'City is required';
    }
    
    if (!formData.address.state) {
      newErrors['address.state'] = 'State is required';
    }
    
    if (!formData.address.zipCode) {
      newErrors['address.zipCode'] = 'ZIP code is required';
    }
    
    if (!formData.payment.cardNumber || formData.payment.cardNumber.length < 16) {
      newErrors['payment.cardNumber'] = 'Please enter a valid card number';
    }
    
    if (!formData.payment.expiryDate) {
      newErrors['payment.expiryDate'] = 'Expiry date is required';
    }
    
    if (!formData.payment.cvv || formData.payment.cvv.length < 3) {
      newErrors['payment.cvv'] = 'Please enter a valid CVV';
    }
    
    if (!formData.payment.nameOnCard) {
      newErrors['payment.nameOnCard'] = 'Name on card is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    setOrderComplete(true);
    setIsProcessing(false);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-stone-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-stone-800 mb-4">Order Complete!</h1>
            <p className="text-lg text-stone-600 mb-6">
              Thank you for your purchase. Your handcrafted items will be carefully packaged and shipped soon.
            </p>
            <div className="bg-stone-50 rounded-lg p-4 mb-6">
              <p className="font-semibold text-stone-800">Order #12345</p>
              <p className="text-stone-600">Confirmation email sent to {formData.email}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button >
                <Link href="/Products">Continue Shopping</Link>
              </Button>
              <Button variant="outline">
                Track Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-2">Checkout</h1>
            <p className="text-stone-600">Complete your order</p>
          </div>
          <Link
            href="/cart"
            className="flex items-center text-amber-700 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200">
                <h2 className="text-xl font-semibold text-stone-800 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                        errors.email ? 'border-red-300' : 'border-stone-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors.firstName ? 'border-red-300' : 'border-stone-300'
                        }`}
                        placeholder="First name"
                      />
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
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors.lastName ? 'border-red-300' : 'border-stone-300'
                        }`}
                        placeholder="Last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200">
                <h2 className="text-xl font-semibold text-stone-800 mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                        errors['address.street'] ? 'border-red-300' : 'border-stone-300'
                      }`}
                      placeholder="123 Main St"
                    />
                    {errors['address.street'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['address.street']}</p>
                    )}
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
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors['address.city'] ? 'border-red-300' : 'border-stone-300'
                        }`}
                        placeholder="City"
                      />
                      {errors['address.city'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['address.city']}</p>
                      )}
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
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors['address.state'] ? 'border-red-300' : 'border-stone-300'
                        }`}
                        placeholder="State"
                      />
                      {errors['address.state'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['address.state']}</p>
                      )}
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
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors['address.zipCode'] ? 'border-red-300' : 'border-stone-300'
                        }`}
                        placeholder="12345"
                      />
                      {errors['address.zipCode'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['address.zipCode']}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-6 w-6 text-amber-700 mr-2" />
                  <h2 className="text-xl font-semibold text-stone-800">Payment Information</h2>
                  <Lock className="h-4 w-4 text-green-600 ml-auto" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="payment.cardNumber"
                      value={formData.payment.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                        errors['payment.cardNumber'] ? 'border-red-300' : 'border-stone-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {errors['payment.cardNumber'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['payment.cardNumber']}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="payment.expiryDate"
                        value={formData.payment.expiryDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors['payment.expiryDate'] ? 'border-red-300' : 'border-stone-300'
                        }`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors['payment.expiryDate'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['payment.expiryDate']}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="payment.cvv"
                        value={formData.payment.cvv}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors['payment.cvv'] ? 'border-red-300' : 'border-stone-300'
                        }`}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors['payment.cvv'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['payment.cvv']}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="payment.nameOnCard"
                        value={formData.payment.nameOnCard}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors['payment.nameOnCard'] ? 'border-red-300' : 'border-stone-300'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors['payment.nameOnCard'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['payment.nameOnCard']}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center">
                  <Lock className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-700">Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200 sticky top-8">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">Order Summary</h3>
                
                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-800 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-stone-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-stone-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 border-t border-stone-200 pt-4">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-stone-800 border-t border-stone-200 pt-2">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  loading={isProcessing}
                  className="w-full mt-6"
                >
                  <Package className="h-5 w-5 mr-2" />
                  {isProcessing ? 'Processing...' : 'Complete Order'}
                </Button>

                <div className="mt-4 text-xs text-stone-500 text-center">
                  <p>By placing your order, you agree to our Terms of Service and Privacy Policy</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
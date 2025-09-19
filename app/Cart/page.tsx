'use client'
import { useState } from 'react';
import  Link  from 'next/link';
import { ShoppingBag, ArrowLeft, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/common/Button';

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = async () => {
    setIsClearing(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    clearCart();
    setIsClearing(false);
  };

  const shipping = totalPrice > 75 ? 0 : 8.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-stone-400 mb-4">
              <ShoppingBag className="mx-auto h-16 w-16" />
            </div>
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Your cart is empty</h2>
            <p className="text-stone-600 mb-8">
              Discover unique handcrafted items from our talented artisans
            </p>
            <Button size="lg">
              <Link href="/products">
                Start Shopping
              </Link>
            </Button>
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
            <h1 className="text-3xl font-bold text-stone-800 mb-2">Shopping Cart</h1>
            <p className="text-stone-600">
              {items.length} item{items.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center text-amber-700 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={handleClearCart}
                loading={isClearing}
                className="text-red-600 hover:text-red-800"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200 sticky top-8">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span className="flex items-center">
                    Shipping
                    <Truck className="h-4 w-4 ml-1" />
                  </span>
                  <span>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-amber-700">
                    Free shipping on orders over $75
                  </p>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr className="border-stone-200" />
                <div className="flex justify-between text-lg font-semibold text-stone-800">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mb-4">
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-stone-600">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-stone-50 rounded-lg">
                <h4 className="font-medium text-stone-800 mb-2">Shipping Information</h4>
                <ul className="text-sm text-stone-600 space-y-1">
                  <li>• Free shipping on orders over $75</li>
                  <li>• Standard delivery: 3-5 business days</li>
                  <li>• Express delivery: 1-2 business days</li>
                  <li>• Careful packaging guaranteed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
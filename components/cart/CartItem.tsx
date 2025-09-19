import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-stone-200 hover:shadow-md transition-shadow">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="flex-shrink-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-lg hover:opacity-75 transition-opacity"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link 
          to={`/product/${product.id}`}
          className="font-medium text-stone-800 hover:text-amber-700 transition-colors"
        >
          <h3 className="truncate">{product.name}</h3>
        </Link>
        <p className="text-sm text-stone-600 mt-1">
          by {product.artisan.name}
        </p>
        <p className="text-sm text-stone-500">
          {product.category}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(quantity - 1)}
          className="w-8 h-8 p-0"
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-12 text-center font-medium">
          {quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(quantity + 1)}
          className="w-8 h-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="font-semibold text-stone-800">
          ${(product.price * quantity).toFixed(2)}
        </p>
        {quantity > 1 && (
          <p className="text-sm text-stone-500">
            ${product.price.toFixed(2)} each
          </p>
        )}
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeItem(product.id)}
        className="text-red-600 hover:text-red-800 p-2"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
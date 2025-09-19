import Link from 'next/link';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '../common/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const getFallbackImageUrl = (size: number): string => {
    const categoryToQuery: Record<string, string> = {
      'Ceramics': 'ceramic pottery handcrafted minimal neutral',
      'Leather Goods': 'leather journal handcrafted artisan',
      'Textiles': 'woven textile blanket artisan fabric',
      'Woodwork': 'wood sculpture carving handcrafted',
      'Jewelry': 'handmade silver jewelry pendant',
      'Glass Art': 'hand blown glass vase colorful',
    };
    const query = categoryToQuery[product.category] || 'artisan handmade craft product';
    return `https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=${size}&auto=format&fit=crop`; // base seed
  };

  const getAvatarFallbackUrl = (size: number): string => {
    return `https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=${size}&auto=format&fit=crop`;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="group h-full flex">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 hover:border-amber-200 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              const fallback = getFallbackImageUrl(600);
              if (img.src !== fallback) {
                img.src = fallback;
              }
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-amber-700 text-white text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Sale
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-stone-50 transition-colors">
              <Heart className="h-4 w-4 text-stone-600" />
            </button>
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="w-full"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Artisan */}
          <div className="flex items-center space-x-2 mb-2">
            <img
              src={product.artisan.avatar}
              alt={product.artisan.name}
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                const fallback = getAvatarFallbackUrl(80);
                if (img.src !== fallback) {
                  img.src = fallback;
                }
              }}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-stone-500">{product.artisan.name}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-stone-800 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-amber-400 fill-current'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-stone-500">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-stone-800">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-stone-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {!product.inStock && (
              <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Category */}
          <div className="mt-2">
            <span className="inline-block bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
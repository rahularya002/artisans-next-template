'use client'
import { useState } from 'react';
import { useParams} from 'next/navigation';
import Link from 'next/link';
import { Heart, Share2, Star, ShoppingCart, MapPin, Package, Shield } from 'lucide-react';
import { mockProducts } from '@/utils/mockData';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/common/Button';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = mockProducts.find(p => p.id === id);
  const getFallbackImageUrl = (size: number): string => {
    const categoryToQuery: Record<string, string> = {
      'Ceramics': 'ceramic pottery handcrafted minimal neutral',
      'Leather Goods': 'leather journal handcrafted artisan',
      'Textiles': 'woven textile blanket artisan fabric',
      'Woodwork': 'wood sculpture carving handcrafted',
      'Jewelry': 'handmade silver jewelry pendant',
      'Glass Art': 'hand blown glass vase colorful',
    };
    const query = categoryToQuery[product?.category || ''] || 'artisan handmade craft product';
    return `https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=${size}&auto=format&fit=crop`;
  };

  const getAvatarFallbackUrl = (size: number): string => {
    return `https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=${size}&auto=format&fit=crop`;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">Product not found</h1>
          <Link href="/products" className="text-amber-700 hover:text-amber-800">
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    addItem(product, quantity);
    setIsAddingToCart(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-stone-600 mb-8">
          <Link href="/products" className="hover:text-amber-700">Products</Link>
          <span>›</span>
          <span className="text-stone-400">{product.category}</span>
          <span>›</span>
          <span className="text-stone-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-stone-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  const fallback = getFallbackImageUrl(1000);
                  if (img.src !== fallback) {
                    img.src = fallback;
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-amber-700'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        const fallback = getFallbackImageUrl(300);
                        if (img.src !== fallback) {
                          img.src = fallback;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                {product.featured && (
                  <span className="bg-amber-700 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Featured
                  </span>
                )}
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    On Sale
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-stone-800 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-stone-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-stone-800">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-stone-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-stone-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="mb-6 space-y-3">
              {product.materials && (
                <div>
                  <span className="font-medium text-stone-800">Materials: </span>
                  <span className="text-stone-600">{product.materials.join(', ')}</span>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <span className="font-medium text-stone-800">Dimensions: </span>
                  <span className="text-stone-600">{product.dimensions}</span>
                </div>
              )}
              {product.weight && (
                <div>
                  <span className="font-medium text-stone-800">Weight: </span>
                  <span className="text-stone-600">{product.weight}</span>
                </div>
              )}
            </div>

            {/* Artisan Info */}
            <div className="bg-stone-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <img
                  src={product.artisan.avatar}
                  alt={product.artisan.name}
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    const fallback = getAvatarFallbackUrl(128);
                    if (img.src !== fallback) {
                      img.src = fallback;
                    }
                  }}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-stone-800">{product.artisan.name}</h3>
                  <div className="flex items-center text-sm text-stone-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {product.artisan.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              {/* Stock Status */}
              <div className={`text-sm font-medium ${
                product.inStock ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <label className="font-medium text-stone-800">Quantity:</label>
                <div className="flex items-center border border-stone-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-stone-50"
                    disabled={!product.inStock}
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-stone-50"
                    disabled={!product.inStock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  loading={isAddingToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  ✓ Added to cart successfully!
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-stone-50 rounded-lg">
                <Package className="h-8 w-8 text-amber-700 mx-auto mb-2" />
                <div className="text-sm font-medium text-stone-800">Free Shipping</div>
                <div className="text-xs text-stone-600">On orders over $75</div>
              </div>
              <div className="p-4 bg-stone-50 rounded-lg">
                <Shield className="h-8 w-8 text-amber-700 mx-auto mb-2" />
                <div className="text-sm font-medium text-stone-800">Secure Payment</div>
                <div className="text-xs text-stone-600">100% protected</div>
              </div>
              <div className="p-4 bg-stone-50 rounded-lg">
                <Heart className="h-8 w-8 text-amber-700 mx-auto mb-2" />
                <div className="text-sm font-medium text-stone-800">Handmade</div>
                <div className="text-xs text-stone-600">With love & care</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
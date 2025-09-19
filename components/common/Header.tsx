'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, Palette } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { AuthModal } from '../auth/AuthModal';
import { Button } from './Button';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();


  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/Products' },
    { name: 'About', href: '/About' },
    { name: 'Contact', href: '/Contact' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/Products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-amber-700 p-2 rounded-lg group-hover:bg-amber-800 transition-colors shadow-sm">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-stone-800">ArtisanMarket</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      pathname === item.href
                        ? 'text-amber-800 bg-amber-50'
                        : 'text-stone-600 hover:text-amber-800 hover:bg-stone-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center max-w-md flex-1 mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search handcrafted items..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/70 border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-inner"
                />
              </div>
            </form>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-stone-600 hover:text-amber-700 transition-colors rounded-full hover:bg-stone-100">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-semibold rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-full text-stone-600 hover:text-amber-700 hover:bg-stone-100 transition-colors">
                    <User className="h-6 w-6" />
                    <span className="hidden sm:block text-sm">{user.firstName}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur rounded-lg shadow-lg border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
                      Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full text-stone-600 hover:text-amber-700 hover:bg-stone-100 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="lg:hidden py-3 border-t border-stone-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search handcrafted items..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/70 border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </form>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur border-t border-stone-200">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-amber-800 bg-amber-50'
                      : 'text-stone-700 hover:text-amber-800 hover:bg-stone-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
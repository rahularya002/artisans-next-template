'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { mockProducts } from '@/utils/mockData';
import { FilterOptions } from '@/types';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  
  const [filters, setFilters] = useState<FilterOptions>(() => ({
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
  }));

  // Update filters when search params change
  useEffect(() => {
    const newFilters = {
      ...filters,
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
    };
    
    // Only update if filters actually changed to prevent unnecessary re-renders
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(newFilters);
    }
  }, [searchParams]); // Removed filters from dependency to prevent infinite loop

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts].filter(product => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          product.artisan.name.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && filters.category !== 'All') {
        if (product.category !== filters.category) return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (product.price < min || product.price > max) return false;
      }

      // Materials filter
      if (filters.materials && filters.materials.length > 0) {
        const hasMatchingMaterial = filters.materials.some(material =>
          product.materials.some(prodMaterial => 
            prodMaterial.toLowerCase().includes(material.toLowerCase())
          )
        );
        if (!hasMatchingMaterial) return false;
      }

      // Stock filter
      if (filters.inStock && !product.inStock) return false;

      // Featured filter
      if (filters.featured && !product.featured) return false;

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo, we'll use product ID as a proxy for creation date
        products.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        products.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    return products;
  }, [filters, sortBy]);

  // Fixed URL update function using Next.js router
  const updateURL = useCallback((newFilters: FilterOptions) => {
    const params = new URLSearchParams();
    
    if (newFilters.search) {
      params.set('search', newFilters.search);
    }
    if (newFilters.category && newFilters.category !== 'All') {
      params.set('category', newFilters.category);
    }
    
    const queryString = params.toString();
    const newURL = queryString ? `${pathname}?${queryString}` : pathname;
    
    // Use router.push to update URL without page reload
    router.push(newURL, { scroll: false });
  }, [router, pathname]);

  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    updateURL(newFilters);
  }, [updateURL]);

  const handleClearFilters = useCallback(() => {
    const clearedFilters: FilterOptions = { 
      search: filters.search // Keep search term
    };
    setFilters(clearedFilters);
    updateURL(clearedFilters);
  }, [filters.search, updateURL]);

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-stone-800">
            {filters.search ? `Search Results for "${filters.search}"` : 
             filters.category ? `${filters.category} Products` : 
             'All Products'}
          </h1>
          <p className="mt-2 text-stone-600">Find one-of-a-kind pieces crafted by independent makers</p>
        </div>
        
        {/* Controls */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="text-sm text-stone-700">{filteredProducts.length} results</span>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="sm:hidden inline-flex items-center gap-2 border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 rounded-lg"
              aria-expanded={isFilterOpen}
              aria-controls="product-filters"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm font-medium text-stone-700">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProductFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} />
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-stone-400 mb-4">
                  <SlidersHorizontal className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-stone-800 mb-2">No products found</h3>
                <p className="text-stone-600 mb-4">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="text-amber-700 hover:text-amber-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
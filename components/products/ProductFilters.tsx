import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions } from '../../types';
import { categories, materials } from '../../utils/mockData';
import { Button } from '../common/Button';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onToggle
}) => {
  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: category === 'All' ? undefined : category
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFiltersChange({
      ...filters,
      priceRange: [min, max]
    });
  };

  const handleMaterialToggle = (material: string) => {
    const currentMaterials = filters.materials || [];
    const newMaterials = currentMaterials.includes(material)
      ? currentMaterials.filter(m => m !== material)
      : [...currentMaterials, material];
    
    onFiltersChange({
      ...filters,
      materials: newMaterials.length > 0 ? newMaterials : undefined
    });
  };

  const handleStockFilter = (inStock: boolean) => {
    onFiltersChange({
      ...filters,
      inStock: filters.inStock === inStock ? undefined : inStock
    });
  };

  const activeFiltersCount = [
    filters.category,
    filters.priceRange,
    filters.materials?.length,
    filters.inStock,
    filters.featured
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-amber-700 text-white text-xs rounded-full px-2 py-0.5">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white rounded-xl shadow-md p-6 border border-stone-100`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-stone-800">Filters</h3>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
              >
                Clear All
              </Button>
            )}
            <button
              onClick={onToggle}
              className="lg:hidden p-1 text-stone-400 hover:text-stone-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-medium text-stone-700 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={!filters.category ? category === 'All' : filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 text-amber-600 border-stone-300 focus:ring-amber-500"
                />
                <span className="ml-2 text-sm text-stone-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium text-stone-700 mb-3">Price Range</h4>
          <div className="space-y-2">
            {[
              { label: 'Under $50', min: 0, max: 50 },
              { label: '$50 - $100', min: 50, max: 100 },
              { label: '$100 - $200', min: 100, max: 200 },
              { label: 'Over $200', min: 200, max: 1000 }
            ].map((range) => (
              <label key={range.label} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    filters.priceRange?.[0] === range.min && 
                    filters.priceRange?.[1] === range.max
                  }
                  onChange={() => handlePriceRangeChange(range.min, range.max)}
                  className="w-4 h-4 text-amber-600 border-stone-300 focus:ring-amber-500"
                />
                <span className="ml-2 text-sm text-stone-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div className="mb-6">
          <h4 className="font-medium text-stone-700 mb-3">Materials</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {materials.map((material) => (
              <label key={material} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.materials?.includes(material) || false}
                  onChange={() => handleMaterialToggle(material)}
                  className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                />
                <span className="ml-2 text-sm text-stone-700">{material}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h4 className="font-medium text-stone-700 mb-3">Availability</h4>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock || false}
              onChange={() => handleStockFilter(true)}
              className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
            />
            <span className="ml-2 text-sm text-stone-700">In Stock Only</span>
          </label>
        </div>

        {/* Featured */}
        <div>
          <h4 className="font-medium text-stone-700 mb-3">Special</h4>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.featured || false}
              onChange={(e) => onFiltersChange({
                ...filters,
                featured: e.target.checked || undefined
              })}
              className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
            />
            <span className="ml-2 text-sm text-stone-700">Featured Items</span>
          </label>
        </div>
      </div>
    </>
  );
};
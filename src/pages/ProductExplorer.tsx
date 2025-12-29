import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, ArrowUpDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortOption = 'default' | 'price-low' | 'price-high' | 'newest';

const ProductExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 350]);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), []);
  const minPrice = useMemo(() => Math.min(...products.map(p => p.price)), []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(product => product.category === activeCategory);
    }

    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, activeCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setPriceRange([minPrice, maxPrice]);
    setSortBy('default');
  };

  const hasActiveFilters = searchQuery || activeCategory !== 'All' || 
    priceRange[0] !== minPrice || priceRange[1] !== maxPrice || sortBy !== 'default';

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60 mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(category)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-accent/30 text-foreground/80 hover:bg-accent/50 border border-transparent'
              }`}
            >
              <span className="font-medium">{category}</span>
              <span className="text-xs text-muted-foreground ml-2">
                ({category === 'All' ? products.length : products.filter(p => p.category === category).length})
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60 mb-4">
          Price Range
        </h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={minPrice}
            max={maxPrice}
            step={5}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="px-3 py-1.5 bg-accent/50 rounded-lg font-medium">
              ${priceRange[0]}
            </span>
            <span className="text-muted-foreground">to</span>
            <span className="px-3 py-1.5 bg-accent/50 rounded-lg font-medium">
              ${priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60 mb-4">
          Sort By
        </h3>
        <div className="space-y-2">
          {[
            { value: 'default', label: 'Default' },
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
            { value: 'newest', label: 'Newest First' },
          ].map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSortBy(option.value as SortOption)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                sortBy === option.value
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-accent/30 text-foreground/80 hover:bg-accent/50 border border-transparent'
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </Button>
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            PRODUCT <span className="text-gradient-primary">EXPLORER</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover your perfect gear with advanced filters and real-time search.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-accent/50 border border-border/50 rounded-2xl overflow-hidden focus-within:border-primary/50 transition-colors">
              <Search className="w-5 h-5 ml-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery('')}
                    className="mr-4 p-1.5 rounded-full hover:bg-accent transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Mobile Filter Toggle & Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between gap-4 mb-8 lg:hidden"
        >
          <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="flex-1 gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
              <DrawerHeader className="border-b border-border/50">
                <DrawerTitle className="text-xl font-display">Filters</DrawerTitle>
              </DrawerHeader>
              <div className="p-6 overflow-y-auto">
                <FilterContent />
              </div>
              <div className="p-4 border-t border-border/50">
                <DrawerClose asChild>
                  <Button className="w-full" variant="default">
                    Apply Filters ({filteredAndSortedProducts.length} products)
                  </Button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="flex-1 bg-accent/50 border-border/50">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block w-72 shrink-0"
          >
            <div className="sticky top-28 p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display font-semibold">Filters</h2>
                {hasActiveFilters && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                )}
              </div>
              <FilterContent />
            </div>
          </motion.aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between mb-6"
            >
              <p className="text-muted-foreground">
                <span className="text-foreground font-semibold">{filteredAndSortedProducts.length}</span> products found
              </p>
              
              {/* Desktop Sort */}
              <div className="hidden lg:block">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-48 bg-accent/50 border-border/50">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredAndSortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            <AnimatePresence>
              {filteredAndSortedProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/50 flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductExplorer;

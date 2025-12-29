import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingBag, Heart, Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

const sizes = ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = products.find((p) => p.id === Number(id));
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Generate thumbnail variants (in real app these would be different images)
  const thumbnails = product ? [
    product.image,
    product.image,
    product.image,
    product.image,
  ] : [];

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Select a size",
        description: "Please select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} (${selectedSize}) added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  src={thumbnails[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>
              
              {/* Image Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full backdrop-blur-md transition-colors ${
                    isWishlisted 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background/50 text-foreground hover:bg-background/80'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-background/50 backdrop-blur-md text-foreground hover:bg-background/80 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {thumbnails.map((thumb, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-primary ring-2 ring-primary/30' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImageIndex === index && (
                    <motion.div
                      layoutId="thumbnail-indicator"
                      className="absolute inset-0 bg-primary/10"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
            >
              {product.category}
            </motion.span>

            {/* Product Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight"
            >
              {product.name}
            </motion.h1>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-baseline gap-3"
            >
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              <span className="text-lg text-muted-foreground line-through">${(product.price * 1.2).toFixed(0)}</span>
              <span className="px-2 py-0.5 rounded bg-secondary/20 text-secondary text-sm font-medium">20% OFF</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              {product.description}
            </motion.p>

            {/* Size Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground font-semibold">Select Size</span>
                <button className="text-primary text-sm hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`relative py-3 px-2 rounded-xl font-medium text-sm transition-all ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        : 'bg-card border border-border text-foreground hover:border-primary/50 hover:bg-card/80'
                    }`}
                  >
                    {size}
                    {selectedSize === size && (
                      <motion.div
                        layoutId="size-indicator"
                        className="absolute inset-0 bg-primary rounded-xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quantity Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <span className="text-foreground font-semibold">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-card rounded-xl border border-border overflow-hidden">
                  <motion.button
                    whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="w-12 text-center font-semibold text-foreground">{quantity}</span>
                  <motion.button
                    whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                <span className="text-muted-foreground">In Stock</span>
              </div>
            </motion.div>

            {/* Add to Cart Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 pt-4"
            >
              <Button
                onClick={handleAddToCart}
                variant="hero"
                size="lg"
                className="flex-1 h-14 text-lg font-semibold group"
              >
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Add to Cart
                <motion.span
                  initial={{ width: 0 }}
                  whileHover={{ width: 'auto' }}
                  className="overflow-hidden"
                >
                  <Check className="w-5 h-5 ml-2" />
                </motion.span>
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-2 gap-4 pt-6 border-t border-border"
            >
              {[
                { label: 'Free Shipping', value: 'Orders over $100' },
                { label: 'Returns', value: '30-day free returns' },
                { label: 'Authenticity', value: '100% Genuine' },
                { label: 'Support', value: '24/7 Available' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="p-4 rounded-xl bg-card/50 border border-border"
                >
                  <p className="text-sm text-muted-foreground">{feature.label}</p>
                  <p className="text-foreground font-medium">{feature.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

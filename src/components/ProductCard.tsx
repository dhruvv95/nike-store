import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: 'hsl(0 0% 8%)',
        border: '1px solid hsl(0 0% 18%)',
        color: 'hsl(0 0% 98%)',
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-gradient-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-accent">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Quick Actions */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:glow-primary transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
          <button className="p-3 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full text-xs font-medium uppercase tracking-wide">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-1">
          {product.description}
        </p>
        <p className="text-xl font-bold text-gradient-primary">
          ${product.price}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;

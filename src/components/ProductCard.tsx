import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const navigate = useNavigate();
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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.33, 1, 0.68, 1]
      }}
      whileHover={{ y: -8 }}
      className="group relative"
      data-cursor="View"
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
      />
      
      <div className="relative bg-gradient-to-b from-card to-background rounded-2xl overflow-hidden border border-border group-hover:border-primary/30 transition-all duration-500">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-accent">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
          />

          {/* Quick Actions */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </motion.button>
            <motion.button 
              onClick={() => navigate(`/product/${product.id}`)}
              className="p-3.5 bg-foreground/10 backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 hover:bg-foreground/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Category Badge */}
          <motion.span 
            className="absolute top-4 left-4 px-4 py-1.5 bg-background/80 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-border/50"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            {product.category}
          </motion.span>

          {/* Rating */}
          <motion.div
            className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-background/80 backdrop-blur-md rounded-full border border-border/50"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <Star className="w-3 h-3 fill-secondary text-secondary" />
            <span className="text-xs font-bold">4.9</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3 
            className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300"
            layoutId={`title-${product.id}`}
          >
            {product.name}
          </motion.h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-display font-bold">
              <span className="text-gradient-primary">${product.price}</span>
            </p>
            <motion.button
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
              whileHover={{ rotate: 45, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">→</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

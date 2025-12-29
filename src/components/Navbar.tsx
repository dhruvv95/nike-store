import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.span
              className="text-2xl md:text-3xl font-display font-bold text-gradient-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              NEXUS
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
              >
                <span
                  className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                    isActive(link.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                  initial={{ width: isActive(link.path) ? '100%' : '0%' }}
                  animate={{ width: isActive(link.path) ? '100%' : '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-accent transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-display uppercase tracking-wider py-2 ${
                      isActive(link.path) ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

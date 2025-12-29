import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Shield, Trophy, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { TextReveal, FloatingElement, GlowingBorder } from "@/components/AnimatedComponents";

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Performance-engineered for maximum speed and agility on any surface.",
      color: "from-primary to-emerald-400",
    },
    {
      icon: Shield,
      title: "Built to Last",
      description: "Premium materials that withstand the toughest training sessions.",
      color: "from-secondary to-orange-400",
    },
    {
      icon: Trophy,
      title: "Champion's Choice",
      description: "Trusted by professional athletes worldwide for peak performance.",
      color: "from-primary to-cyan-400",
    },
  ];

  const stats = [
    { value: "50M+", label: "Athletes" },
    { value: "120+", label: "Countries" },
    { value: "15K+", label: "Products" },
    { value: "99%", label: "Satisfaction" },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </motion.div>

        {/* Floating Orbs */}
        <FloatingElement
          duration={8}
          distance={30}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        >
          <div />
        </FloatingElement>
        <FloatingElement
          duration={10}
          distance={40}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl"
        >
          <div />
        </FloatingElement>

        {/* Rotating Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 border border-primary/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 border border-primary/5 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlowingBorder className="inline-block mb-10">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-card rounded-full text-sm font-medium border border-border">
                  <motion.span
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  New Collection 2025
                </span>
              </GlowingBorder>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-[10rem] font-display font-bold leading-[0.85] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
              >
                BREAK YOUR
              </motion.span>
              <motion.span
                className="block text-gradient-primary"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
              >
                LIMITS
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Experience the future of athletic performance. Designed for champions, built to push the boundaries of
              what's possible.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/shop">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="hero" size="xl" className="group min-w-[200px]">
                    <span>Shop Now</span>
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </Button>
                </motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 rounded-xl text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <span className="font-medium">Watch Story</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border/50"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-32 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(110_100%_61%_/_0.05),transparent_70%)]" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Why Choose Us
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              ENGINEERED FOR <span className="text-gradient-primary">EXCELLENCE</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Every detail matters when you're chasing greatness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div
                  className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-3xl blur transition-opacity duration-500"
                  style={{ backgroundImage: `linear-gradient(135deg, var(--primary), var(--secondary))` }}
                />
                <div className="relative p-10 rounded-2xl bg-background border border-border group-hover:border-transparent transition-all duration-500">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-background" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          >
            <div>
              <motion.span
                className="inline-block text-secondary text-sm font-bold uppercase tracking-widest mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Featured Collection
              </motion.span>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
                PREMIUM <span className="text-gradient-secondary">GEAR</span>
              </h2>
              <p className="text-muted-foreground max-w-lg text-lg">
                Handpicked products engineered for peak performance.
              </p>
            </div>
            <Link to="/shop">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" size="lg" className="group">
                  View All Products
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-primary/10" />
        </motion.div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <GlowingBorder>
              <div className="p-16 md:p-24 rounded-3xl bg-card border border-border">
                <motion.h2
                  className="text-5xl md:text-7xl font-display font-bold mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  READY TO <span className="text-gradient-primary">DOMINATE</span>?
                </motion.h2>
                <motion.p
                  className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Join thousands of elite athletes who trust NEXUS for their training and competition needs.
                </motion.p>
                <Link to="/shop">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
                    <Button variant="hero" size="xl" className="min-w-[250px]">
                      Start Shopping
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </GlowingBorder>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;

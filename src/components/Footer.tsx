import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold text-gradient-primary mb-4">
              NEXUS
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Pushing the boundaries of athletic performance. Designed for champions, built for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Shop', 'About', 'Contact', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Shop' ? '/shop' : item === 'Contact' ? '/contact' : '/'}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 uppercase tracking-wide">
              Categories
            </h4>
            <ul className="space-y-3">
              {['Shoes', 'Apparel', 'Accessories', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 uppercase tracking-wide">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 NEXUS Athletics. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

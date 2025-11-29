
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Team', href: '/team' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Messages', href: '/messages' },
    { name: 'About', href: '/about' },
    { name: 'Downloads', href: '/downloads' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => location.pathname === href;

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass-effect border-b shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative p-2.5 rounded-xl bg-gradient-primary shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-heading font-black text-xl tracking-tighter">NSS</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="font-heading font-bold text-xl leading-none mb-0.5">IET DAVV</div>
            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Connect</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                isActive(item.href)
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground/80 hover:text-primary hover:bg-secondary'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pl-4 ml-2 border-l border-border">
            <Button className="rounded-full shadow-primary hover:shadow-lg transition-all" size="sm">
              Join Now
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-full hover:bg-secondary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-lg font-semibold rounded-2xl transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-secondary text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="w-full mt-4 rounded-xl" size="lg">
                Join NSS IET DAVV
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

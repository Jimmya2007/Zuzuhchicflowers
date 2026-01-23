import { useState } from 'react';
import { Menu, X, Lock, ShoppingCart } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import logoImage from '@/assets/zuzuh-logo.png.jpg';
import { useCart } from '@/utils/CartContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount, setIsCartOpen } = useCart();
  const cartCount = getCartCount();

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'packages', label: 'Packages' },
    { id: 'peluches', label: 'Peluches' },
    { id: 'bouquets', label: 'Bouquets' },
    { id: 'services', label: 'Services' },
    { id: 'equipe', label: 'Équipe' },
    { id: 'about', label: 'About' },
    { id: 'collaborations', label: 'Collaborations' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F48FB1] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img src={logoImage} alt="Zuzuh Chic Logo" className="h-14 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-white hover:text-[#E75480] transition-colors px-3 py-2 ${
                  currentPage === item.id ? 'border-b-2 border-white' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => onNavigate('reservation')}
              className="bg-[#E75480] hover:bg-[#d64575] text-white px-6 py-2 ml-4"
            >
              Réserver
            </Button>
            {/* Admin Button */}
            <button
              onClick={() => onNavigate('admin')}
              className="ml-4 p-2 hover:bg-white/20 rounded-full transition-colors border-2 border-white"
              title="Admin"
            >
              <Lock className="w-6 h-6 text-white" />
            </button>
            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative ml-2 p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Panier"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-white/20 mt-2 pt-4">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-white hover:text-[#E75480] transition-colors px-4 py-2 text-left ${
                    currentPage === item.id ? 'bg-white/10 rounded' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  onNavigate('reservation');
                  setMobileMenuOpen(false);
                }}
                className="bg-[#E75480] hover:bg-[#d64575] text-white mx-4"
              >
                Réserver
              </Button>
              <Button
                onClick={() => {
                  onNavigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="bg-[#E75480] hover:bg-[#d43d6a] text-white mx-4 border-2 border-white shadow-lg flex items-center justify-center gap-2"
              >
                <Lock size={20} />
                Admin
              </Button>
              <Button
                onClick={() => {
                  setIsCartOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="bg-white hover:bg-gray-100 text-[#E75480] mx-4 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Panier {cartCount > 0 && `(${cartCount})`}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import logoImage from '@/assets/zuzuh-logo.png.jpg';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

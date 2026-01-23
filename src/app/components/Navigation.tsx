import { useState } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import logoImage from '@/assets/zuzuh-logo.png.jpg';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', page: 'home' },
    { name: 'Packages', page: 'packages' },
    { name: 'Peluches', page: 'peluches' },
    { name: 'Bouquets', page: 'bouquets' },
    { name: 'Services', page: 'services' },
    { name: 'Équipe', page: 'equipe' },
    { name: 'About', page: 'about' },
    { name: 'Collaborations', page: 'collaborations' },
  ];

  return (
    <nav className="bg-[#F48FB1] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <img src={logoImage} alt="Zuzuh Chic Logo" className="h-16 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentPage === item.page
                    ? 'bg-white text-[#E75480]'
                    : 'text-white hover:bg-[#E75480]'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => onNavigate('reservation')}
              className="ml-4 px-6 py-2 bg-[#E75480] text-white rounded-md hover:bg-white hover:text-[#E75480] transition-colors shadow-lg"
            >
              Réserver
            </button>
            {/* Admin Button - Highlighted */}
            <button
              onClick={() => onNavigate('admin-login')}
              className="ml-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2 border-2 border-white"
            >
              <Lock size={16} />
              Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-[#E75480]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                  currentPage === item.page
                    ? 'bg-white text-[#E75480]'
                    : 'text-white hover:bg-[#E75480]'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('reservation');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 mt-2 bg-[#E75480] text-white rounded-md hover:bg-white hover:text-[#E75480] transition-colors shadow-lg"
            >
              Réserver
            </button>
            {/* Admin Button Mobile - Highlighted */}
            <button
              onClick={() => {
                onNavigate('admin-login');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 mt-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2 border-2 border-white"
            >
              <Lock size={16} />
              Admin
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

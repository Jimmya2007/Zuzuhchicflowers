import { Heart, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import logoImage from '@/assets/zuzuh-logo.png.jpg';

export function Footer() {
  return (
    <footer className="bg-[#F48FB1] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section "À propos" */}
          <div>
            <div className="mb-4">
              <img src={logoImage} alt="Zuzuh Chic Logo" className="h-12 w-auto" />
            </div>
            <p className="text-white/90 mb-4">
              Votre destination pour des fleurs élégantes, des peluches adorables et des cadeaux personnalisés.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#E75480] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-[#E75480] transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Section "Contact" -- MISE À JOUR */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail size={18} />
                <span>zuzuhcreation@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} />
                <div className="flex flex-col">
                  <span>+509 3106 6723</span>
                  <span>+509 4373 1894</span>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Rue Valiere, Ouanaminthe, Nord-Est, Haïti</span>
              </div>
            </div>
          </div>

          {/* Section "Horaires" -- MISE À JOUR */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Horaires</h3>
            <div className="space-y-2 text-white/90">
              <p>Lundi - Samedi: 8h - 17h</p>
              <p>Dimanche: 9h - 16h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="flex items-center justify-center space-x-2">
            <span>© 2026 ZUZUH CHIC FLOWERS. Fait avec</span>
            <Heart size={16} fill="white" />
            <span>pour la Saint-Valentin</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

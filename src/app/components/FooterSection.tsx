import { Heart, Mail, Phone, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="bg-[#F48FB1] text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              ZUZUH CHIC FLOWERS
            </h3>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              Créations florales d'exception et peluches élégantes pour tous vos moments spéciaux. 
              Nous transformons vos émotions en arrangements uniques.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/14QEdFYTQph/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E75480] transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://www.instagram.com/zuzuh_chic_flowers?igsh=MXhkODlpMmg3NWJ5" target="_blank" rel="noopener noreferrer" className="hover:text-[#E75480] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://whatsapp.com/channel/0029Vb07JGjAInPikplEf03C" target="_blank" rel="noopener noreferrer" className="hover:text-[#E75480] transition-colors">
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col gap-1">
                <a href="tel:+50931066723" className="flex items-center gap-2 hover:text-[#E75480] transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+509 3106 6723</span>
                </a>
                <a href="tel:+50943731894" className="flex items-center gap-2 hover:text-[#E75480] transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+509 4373 1894</span>
                </a>
              </div>
              <a href="mailto:zuzuhcreation@gmail.com" className="flex items-center gap-2 hover:text-[#E75480] transition-colors">
                <Mail className="w-4 h-4" />
                <span>zuzuhcreation@gmail.com</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Rue Valiere, Ouanaminthe<br />Nord-Est, Haïti</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl mb-4">Horaires d'ouverture</h3>
            <div className="space-y-2 text-sm text-white/90">
              <p>Lundi - Samedi: 8h - 17h</p>
              <p>Dimanche: 9h - 16h</p>
              <p className="mt-4 text-[#E75480] font-medium">
                Commandes spéciales sur rendez-vous
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-white/80">
          <p>&copy; {new Date().getFullYear()} ZUZUH CHIC FLOWERS. Tous droits réservés.</p>
          <p className="mt-2">Fait avec <Heart className="w-4 h-4 inline text-[#E75480]" /> pour la Saint-Valentin</p>
        </div>
      </div>
    </footer>
  );
}

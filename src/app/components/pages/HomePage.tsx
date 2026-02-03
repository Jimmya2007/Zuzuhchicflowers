import { Heart, Gift, Sparkles, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import heroImage from '@/assets/CEO.jpg';
import bouquetsPreview from '@/assets/bouquet_7.jpeg';
import peluchesPreview from '@/assets/peluche_1.jpeg';
import packagesPreview from '@/assets/package_1.jpeg';
import promoPacks1 from '@/assets/promo-packs-1.jpg';
import promoPacks2 from '@/assets/promo-packs-2.jpg';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FADADD] via-white to-[#FADADD] py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 lg:order-1 order-1">
              <div className="inline-block bg-[#F48FB1] text-white px-4 py-2 rounded-full text-sm">
                ✨ Spécial Saint-Valentin 2026
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#E75480]">
                ZUZUH CHIC FLOWERS
              </h1>
              <p className="text-xl text-[#555555] leading-relaxed">
                Transformez vos émotions en créations florales d'exception. 
                Bouquets élégants, peluches raffinées et packages romantiques pour célébrer l'amour.
              </p>
              <div className="hidden lg:flex flex-wrap gap-4">
                <Button 
                  onClick={() => onNavigate('packages')}
                  className="bg-[#E75480] hover:bg-[#d64575] text-white px-8 py-6 text-lg"
                >
                  Découvrir nos Packages
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => onNavigate('reservation')}
                  className="bg-white hover:bg-gray-50 text-[#E75480] border-2 border-[#E75480] px-8 py-6 text-lg"
                >
                  Réserver maintenant
                </Button>
              </div>
            </div>
            <div className="relative lg:order-2 order-2">
              <div className="absolute inset-0 bg-[#F48FB1] rounded-full opacity-20 blur-3xl"></div>
              <img 
                src={heroImage}
                alt="Elegant Roses ZUZUH"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              {/* Mobile buttons overlaid on image */}
              <div className="lg:hidden absolute bottom-6 left-4 right-4 flex flex-col gap-3">
                <Button 
                  onClick={() => onNavigate('packages')}
                  className="bg-[#E75480] hover:bg-[#d64575] text-white px-6 py-4 text-base w-full shadow-xl"
                >
                  Découvrir nos Packages
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  onClick={() => onNavigate('reservation')}
                  className="bg-white hover:bg-gray-50 text-[#E75480] border-2 border-[#E75480] px-6 py-4 text-base w-full shadow-xl"
                >
                  Réserver maintenant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#E75480] mb-4">
              Pourquoi Choisir ZUZUH ?
            </h2>
            <p className="text-[#555555] text-lg max-w-2xl mx-auto">
              Une expérience unique alliant qualité, élégance et personnalisation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FADADD] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#F48FB1] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-[#E75480] mb-3">Créations Uniques</h3>
              <p className="text-[#555555]">
                Chaque arrangement est conçu avec passion et attention aux détails pour créer des moments inoubliables.
              </p>
            </div>

            <div className="bg-[#FADADD] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#F48FB1] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-[#E75480] mb-3">Qualité Premium</h3>
              <p className="text-[#555555]">
                Nous sélectionnons les plus belles fleurs et peluches pour garantir une qualité exceptionnelle.
              </p>
            </div>

            <div className="bg-[#FADADD] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#F48FB1] rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-[#E75480] mb-3">Service Personnalisé</h3>
              <p className="text-[#555555]">
                De la commande à la livraison, notre équipe vous accompagne pour créer le cadeau parfait.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Promotion Section - Valentine's Packs */}
      <section className="py-16 bg-gradient-to-br from-[#E8B4C0] via-[#D89BAA] to-[#E0A8B5] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#00BCD4] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#F48FB1] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#00BCD4] text-white px-6 py-3 rounded-full mb-4 shadow-lg">
              <Star className="w-5 h-5 fill-white" />
              <span className="font-bold text-lg">OFFRES SPÉCIALES SAINT-VALENTIN</span>
              <Star className="w-5 h-5 fill-white" />
            </div>
            <h2 className="text-3xl md:text-5xl text-white mb-4 font-bold">
              Packs Exclusifs 2026
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              Découvrez nos collections premium spécialement conçues pour la Saint-Valentin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* First Promo Image */}
            <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#00BCD4]/50 transition-all duration-500 hover:scale-105 border-2 border-white/10">
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-[#00BCD4] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  Packs 1-12
                </div>
              </div>
              <img 
                src={promoPacks1}
                alt="Packs Saint-Valentin 1-12"
                className="w-full h-auto object-contain group-hover:brightness-110 transition-all duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <p className="text-white text-lg font-semibold mb-2">Prix: 4000 - 13750 Gourdes</p>
                <Button 
                  onClick={() => onNavigate('packages')}
                  className="bg-[#00BCD4] hover:bg-[#00ACC1] text-white w-full shadow-lg"
                >
                  Voir les Packs 1-12
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Second Promo Image */}
            <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#00BCD4]/50 transition-all duration-500 hover:scale-105 border-2 border-white/10">
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-[#00BCD4] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  Packs 13-19
                </div>
              </div>
              <img 
                src={promoPacks2}
                alt="Packs Saint-Valentin 13-19"
                className="w-full h-auto object-contain group-hover:brightness-110 transition-all duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <p className="text-white text-lg font-semibold mb-2">Prix: 11000 - 18000 Gourdes</p>
                <Button 
                  onClick={() => onNavigate('packages')}
                  className="bg-[#00BCD4] hover:bg-[#00ACC1] text-white w-full shadow-lg"
                >
                  Voir les Packs 13-19
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
              <p className="text-white text-lg mb-2">
                <span className="font-bold text-[#00BCD4]">Pour Commander:</span>
              </p>
              <p className="text-white/90 text-xl font-bold mb-1">4373 1894</p>
              <p className="text-white/80">#135 Ri Valye, Wanament</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-16 bg-gradient-to-br from-white to-[#FADADD]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#E75480] mb-4">
              Nos Collections
            </h2>
            <p className="text-[#555555] text-lg">
              Découvrez nos bouquets élégants, peluches raffinées et packages romantiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Bouquets Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer"
                 onClick={() => onNavigate('bouquets')}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={bouquetsPreview}
                  alt="Nos Bouquets"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-2xl font-semibold">Nos Bouquets</h3>
              </div>
              <div className="p-6">
                <p className="text-[#555555] mb-4">
                  Bouquets classiques, modernes et personnalisés pour toutes les occasions
                </p>
                <Button 
                  className="bg-[#F48FB1] hover:bg-[#E75480] text-white w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('bouquets');
                  }}
                >
                  Découvrir
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Peluches Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer"
                 onClick={() => onNavigate('peluches')}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={peluchesPreview}
                  alt="Nos Peluches"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-2xl font-semibold">Nos Peluches</h3>
              </div>
              <div className="p-6">
                <p className="text-[#555555] mb-4">
                  Peluches adorables et messages d'amour pour accompagner vos bouquets
                </p>
                <Button 
                  className="bg-[#F48FB1] hover:bg-[#E75480] text-white w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('peluches');
                  }}
                >
                  Découvrir
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Packages Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer"
                 onClick={() => onNavigate('packages')}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={packagesPreview}
                  alt="Nos Packages"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-2xl font-semibold">Nos Packages</h3>
              </div>
              <div className="p-6">
                <p className="text-[#555555] mb-4">
                  Packages complets combinant bouquets et peluches pour un cadeau parfait
                </p>
                <Button 
                  className="bg-[#F48FB1] hover:bg-[#E75480] text-white w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('packages');
                  }}
                >
                  Découvrir
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F48FB1] text-white">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-white" />
          <h2 className="text-3xl md:text-4xl mb-6">
            Prêt à Commander Votre Cadeau Parfait ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Prenez une capture d'écran du produit qui vous plaît et remplissez notre formulaire de réservation. C'est simple et rapide !
          </p>
          <Button 
            onClick={() => onNavigate('reservation')}
            className="bg-white hover:bg-gray-100 text-[#E75480] px-10 py-6 text-lg"
          >
            Réserver Maintenant
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
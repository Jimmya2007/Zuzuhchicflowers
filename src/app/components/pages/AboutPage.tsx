import { Heart, Sparkles, Target, Eye } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import logoImage from '@/assets/bouquet_1.jpeg';
import storyImage from '@/assets/bouquet_2.jpeg';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#F48FB1] to-[#E75480] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <img src={logoImage} alt="ZUZUH CREATION" className="h-24 w-auto mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl mb-4">À Propos de ZUZUH CHIC FLOWERS</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            L'histoire d'une passion devenue une marque d'excellence florale
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl text-[#E75480]">Notre Histoire</h2>
              <p className="text-[#555555] text-lg leading-relaxed">
                ZUZUH CHIC FLOWERS est née d'une passion profonde pour l'art floral et le désir 
                de créer des moments magiques à travers les fleurs. Fondée avec l'ambition de 
                redéfinir l'élégance florale, notre marque s'est rapidement imposée comme une 
                référence dans la création de bouquets exceptionnels et de cadeaux raffinés.
              </p>
              <p className="text-[#555555] text-lg leading-relaxed">
                Chaque arrangement que nous créons est bien plus qu'un simple bouquet : c'est 
                une expression d'amour, de tendresse et d'attention. Nous sélectionnons avec soin 
                les plus belles fleurs et les peluches les plus élégantes pour transformer vos 
                émotions en créations tangibles.
              </p>
              <p className="text-[#555555] text-lg leading-relaxed">
                Aujourd'hui, ZUZUH CHIC FLOWERS continue d'évoluer tout en restant fidèle à ses 
                valeurs fondamentales : qualité exceptionnelle, service personnalisé et attention 
                aux détails.
              </p>
            </div>
            <div className="relative">
              <ImageWithFallback 
                src={storyImage}
                alt="Atelier ZUZUH"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-br from-[#FADADD] to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-[#F48FB1] rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl text-[#E75480] mb-4">Notre Mission</h2>
              <p className="text-[#555555] leading-relaxed">
                Créer des expériences florales exceptionnelles qui célèbrent l'amour, 
                la beauté et les moments précieux de la vie. Nous nous engageons à offrir 
                des créations uniques qui dépassent les attentes et touchent les cœurs.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-[#F48FB1] rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl text-[#E75480] mb-4">Notre Vision</h2>
              <p className="text-[#555555] leading-relaxed">
                Devenir la référence en matière d'élégance florale, reconnue pour notre 
                créativité, notre qualité irréprochable et notre capacité à transformer 
                chaque occasion en un moment mémorable grâce à nos créations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Identity */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl text-[#E75480] mb-4">Notre Identité</h2>
              <p className="text-[#555555] text-lg">
                Ce qui fait de ZUZUH CHIC FLOWERS une marque unique
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-[#F48FB1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg text-[#E75480] mb-2">Élégance</h3>
                <p className="text-[#555555] text-sm">
                  Chaque création reflète un raffinement et une sophistication inégalés
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-[#F48FB1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg text-[#E75480] mb-2">Créativité</h3>
                <p className="text-[#555555] text-sm">
                  Innovation constante dans nos designs et arrangements floraux
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-[#F48FB1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg text-[#E75480] mb-2">Authenticité</h3>
                <p className="text-[#555555] text-sm">
                  Sincérité et passion dans chaque interaction et création
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning Statement */}
      <section className="py-16 bg-[#F48FB1] text-white">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl mb-6">Notre Promesse</h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-white/95">
            "Chez ZUZUH CHIC FLOWERS, nous transformons vos émotions en créations florales 
            d'exception. Chaque bouquet raconte votre histoire, chaque arrangement célèbre 
            vos moments précieux avec élégance et raffinement."
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-4xl text-[#E75480] mb-2">15+</p>
              <p className="text-[#555555]">Années d'Expérience</p>
            </div>
            <div>
              <p className="text-4xl text-[#E75480] mb-2">5000+</p>
              <p className="text-[#555555]">Clients Satisfaits</p>
            </div>
            <div>
              <p className="text-4xl text-[#E75480] mb-2">10000+</p>
              <p className="text-[#555555]">Créations Réalisées</p>
            </div>
            <div>
              <p className="text-4xl text-[#E75480] mb-2">100%</p>
              <p className="text-[#555555]">Passion & Dévouement</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
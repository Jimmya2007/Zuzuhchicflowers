import { Camera, Heart } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// Import des images de peluches
import peluche1 from '@/assets/peluche_1.jpeg';
import peluche2 from '@/assets/peluche_2.jpeg';
import peluche3 from '@/assets/peluche_3.jpeg';
import peluche4 from '@/assets/peluche_4.jpeg';
import peluche5 from '@/assets/peluche_5.jpeg';
import peluche6 from '@/assets/peluche_6.jpeg';
import peluche7 from '@/assets/peluche_7.jpeg';
import peluche8 from '@/assets/peluche_8.jpeg';
import peluche9 from '@/assets/peluche_9.jpeg';
import peluche10 from '@/assets/peluche_10.jpeg';
import peluche11 from '@/assets/peluche_11.jpeg';
import peluche12 from '@/assets/peluche_12.jpeg';
import peluche13 from '@/assets/peluche_13.jpeg';
import peluche14 from '@/assets/peluche_14.jpeg';
import peluche15 from '@/assets/peluche_15.jpeg';
import peluche16 from '@/assets/peluche_16.jpeg';
import peluche17 from '@/assets/peluche_17.jpeg';
import peluche18 from '@/assets/peluche_18.jpeg';
import peluche19 from '@/assets/peluche_19.jpeg';
import peluche20 from '@/assets/peluche_20.jpeg';
import peluche21 from '@/assets/peluche_21.jpeg';
import peluche22 from '@/assets/peluche_22.jpeg';
import peluche23 from '@/assets/peluche_23.jpeg';
import peluche24 from '@/assets/peluche_24.jpeg';
import peluche25 from '@/assets/peluche_25.jpeg';
import peluche27 from '@/assets/peluche_27.jpeg';
import peluche28 from '@/assets/peluche_28.jpeg';
import peluche29 from '@/assets/peluche_29.jpeg';
import peluche33 from '@/assets/peluche_33.jpeg';
import peluche34 from '@/assets/peluche_34.jpeg';
import peluche35 from '@/assets/peluche_35.jpeg';
import peluche37 from '@/assets/peluche_37.jpeg';
import peluche38 from '@/assets/peluche_38.jpeg';

interface PeluchesPageProps {
  onNavigate: (page: string) => void;
}

export function PeluchesPage({ onNavigate }: PeluchesPageProps) {
  const peluches = [
    {
      id: 1,
      name: "Ours Rose Tendre",
      size: "20cm",
      color: " ",
      price: "1000 Gdes",
      description: "Ours en peluche doux et élégant, parfait pour accompagner un bouquet",
      image: peluche1
    },
    {
      id: 2,
      name: "Ours Beige Classique",
      size: "20cm",
      color: "Beige",
      price: "1000 Gdes",
      description: "Peluche classique et intemporelle pour toutes occasions",
      image: peluche2
    },
    {
      id: 3,
      name: "Peluche rouge Pureté",
      size: "20cm",
      color: "Rouge",
      price: "1000 Gdes",
      description: "Adorable ours blanc symbolisant la pureté et la douceur",
      image: peluche3
    },
    {
      id: 4,
      name: "Peluche rouge Pureté",
      size: "60cm",
      color: "Rouge",
      price: "4000 Gdes",
      description: "Grande peluche luxueuse avec finition premium",
      image: peluche4
    },
    {
      id: 5,
      name: "Ours Marron Câlin",
      size: "25cm",
      color: "",
      price: "1500 Goudes",
      description: "Ours chaleureux et réconfortant pour des moments doux",
      image: peluche5
    },
    {
      id: 6,
      name: "Ours Rouge Romantique",
      size: "32cm",
      color: "rouge foncé",
      price: "2000 Gdes",
      description: "Peluche romantique idéale pour exprimer vos sentiments",
      image: peluche6
    },
    {
      id: 7,
      name: "Ours rouge Élégant",
      size: "20cm",
      color: "rouge",
      price: "1000 Gdes",
      description: "Ours élégant au pelage doux et soyeux",
      image: peluche7
    },
    {
      id: 8,
      name: "Ours Rose Nœud Rose",
      size: "20 cm",
      color: "Blanc/Rose",
      price: "1000 Gdes",
      description: "Charmant ours blanc avec nœud rose délicat",
      image: peluche8
    },
    {
      id: 9,
      name: "Peluche rouge Doux",
      size: "20cm",
      color: "Rouge",
      price: "1000 Gdes",
      description: "Peluche aux tons chaleureux et apaisants",
      image: peluche9
    },
    {
      id: 10,
      name: "peluche Poudré",
      size: "35cm",
      color: "creme",
      price: "2000 Gdes",
      description: "Ours au coloris délicat et raffiné",
      image: peluche10
    },
    {
      id: 11,
      name: "Ours Ivoire Chic",
      size: "20cm",
      color: "Ivoire",
      price: "1000 Gdes",
      description: "Peluche chic et sophistiquée",
      image: peluche11
    },
    {
      id: 12,
      name: "Ours Blanc Géant",
      size: "20cm",
      color: "Blanc",
      price: "1500 Gdes",
      description: "Impressionnante peluche pour un cadeau mémorable",
      image: peluche12
    },
    {
      id: 13,
      name: "Ours Beige Nœud",
      size: "25cm",
      color: "Beige",
      price: "1500 Gdes",
      description: "Ours adorable avec nœud assorti",
      image: peluche13
    },
    {
      id: 14,
      name: "Ours Rose Clair",
      size: "60cm",
      color: "Rouge clair",
      price: "4000 Gdes",
      description: "Douceur et tendresse en peluche",
      image: peluche14
    },
    {
      id: 15,
      name: "Ours Crème Premium",
      size: "35 cm",
      color: "Crème",
      price: "2000 Gdes",
      description: "Qualité premium pour un cadeau d'exception",
      image: peluche15
    },
    {
      id: 16,
      name: "Ours rouge Foncé",
      size: "70cm",
      color: "rouge foncé",
      price: "6500 Gdes",
      description: "Ours au pelage épais et doux",
      image: peluche16
    },
    {
      id: 17,
      name: "Ours Blanc Câlin",
      size: "60cm",
      color: "rose",
      price: "4000 Gdes",
      description: "Parfait compagnon pour les câlins",
      image: peluche17
    },
    {
      id: 18,
      name: "Ours Rose Vif",
      size: "90cm",
      color: "Rose vif",
      price: "9000 gdes",
      description: "Peluche éclatante et joyeuse",
      image: peluche18
    },
    {
      id: 19,
      name: "Ours Beige Doux",
      size: "70cm",
      color: "Beige",
      price: "6500 Gdes",
      description: "Texture ultra douce et confortable",
      image: peluche19
    },
    {
      id: 20,
      name: "Ours Blanc Neige",
      size: "62cm",
      color: "Blanc pur",
      price: "4250 Gdes",
      description: "Blanc immaculé comme la neige fraîche",
      image: peluche20
    },
    {
      id: 21,
      name: "Ours Caramel Clair",
      size: "80cm",
      color: "Caramel clair",
      price: "7500 Gdes",
      description: "Nuance chaleureuse et réconfortante",
      image: peluche21
    },
    {
      id: 22,
      name: "Ours Rose Pastel",
      size: "52cm",
      color: "Rose pastel",
      price: "4250 Gdes",
      description: "Couleur pastel douce et apaisante",
      image: peluche22
    },
    {
      id: 23,
      name: "Ours Caramel Soyeux",
      size: "90 cm",
      color: "Caramel",
      price: "9000",
      description: "Pelage soyeux au toucher exceptionnel",
      image: peluche23
    },
    {
      id: 24,
      name: "Ours Marron Clair",
      size: "55cm",
      color: "Rouge",
      price: "3750 Gdes",
      description: "Ton naturel et apaisant",
      image: peluche24
    },
    {
      id: 25,
      name: "Ours Blanc Luxe",
      size: "62cm",
      color: "Blanc",
      price: "4250 Gdes",
      description: "Édition luxe avec finitions soignées",
      image: peluche25
    },
    {
      id: 27,
      name: "Ours Beige Classique",
      size: "27cm",
      color: "Beige",
      price: "1500 Gdes",
      description: "Intemporel et toujours apprécié",
      image: peluche27
    },
    {
      id: 28,
      name: "Ours Blanc Élégance",
      size: "25 cm",
      color: "Blanc",
      price: "1500 Gdes",
      description: "Élégance et raffinement réunis",
      image: peluche28
    },
    {
      id: 29,
      name: "Ours Caramel Foncé",
      size: "32cm",
      color: "blanc",
      price: "2000 Gdes",
      description: "Teinte profonde et chaleureuse",
      image: peluche29
    },
    {
      id: 33,
      name: "Ours Blanc Coton",
      size: "20cm",
      color: "Blanc",
      price: "1000 Gdes",
      description: "Doux comme du coton",
      image: peluche33
    },
    {
      id: 34,
      name: "Ours Rouge Tendre XXL",
      size: "20cm",
      color: "Rouge",
      price: "1000 Gdes",
      description: "Grande taille pour plus de câlins",
      image: peluche34
    },
    {
      id: 35,
      name: "Ours Beige Premium",
      size: "25cm",
      color: "Beige",
      price: "1000 Gdes",
      description: "Qualité supérieure garantie",
      image: peluche35
    },
    {
      id: 37,
      name: "Ours Caramel Douceur",
      size: "20cm",
      color: "Caramel",
      price: "1000 Gdes",
      description: "Pure douceur et confort",
      image: peluche37
    },
    {
      id: 38,
      name: "Ours Rose Amour",
      size: "82cm",
      color: "Rose",
      price: "8000 Gdes",
      description: "Symbole d'amour et d'affection",
      image: peluche38
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#F48FB1] to-[#E75480] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl mb-4">Nos Peluches</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Collection de peluches élégantes et raffinées pour accompagner vos bouquets
          </p>
        </div>
      </section>

      {/* How to Order Banner */}
      <section className="bg-[#FADADD] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <Camera className="w-8 h-8 text-[#E75480] flex-shrink-0" />
            <p className="text-[#555555]">
              <span className="text-[#E75480]">Comment commander :</span> Prenez une capture d'écran du produit qui vous plaît et remplissez le formulaire de réservation
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {peluches.map((peluche) => (
              <div key={peluche.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#FADADD] group">
                {/* Image */}
                <div className="relative h-80 bg-[#FADADD] overflow-hidden">
                  <ImageWithFallback 
                    src={peluche.image}
                    alt={peluche.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-[#E75480]">{peluche.name}</h3>
                  <p className="text-[#555555] text-sm leading-relaxed">{peluche.description}</p>
                  
                  {/* Details */}
                  <div className="flex gap-4 text-sm text-[#555555] pt-2 border-t border-[#FADADD]">
                    <div>
                      <p className="text-xs text-[#555555]/70">Taille</p>
                      <p>{peluche.size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#555555]/70">Couleur</p>
                      <p>{peluche.color}</p>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-3">
                    <p className="text-2xl text-[#E75480]">{peluche.price}</p>
                    <Button 
                      onClick={() => onNavigate('reservation')}
                      className="bg-[#F48FB1] hover:bg-[#E75480] text-white"
                      size="sm"
                    >
                      Réserver
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gradient-to-br from-[#FADADD] to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl text-[#E75480] mb-4">Toutes nos peluches sont soigneusement sélectionnées</h2>
          <p className="text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Chaque peluche est choisie pour sa qualité, sa douceur et son élégance. 
            Elles peuvent être combinées avec nos bouquets pour créer un cadeau parfait.
          </p>
        </div>
      </section>
    </div>
  );
}

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
import peluche26 from '@/assets/peluche_26.jpeg';
import peluche27 from '@/assets/peluche_27.jpeg';
import peluche28 from '@/assets/peluche_28.jpeg';
import peluche29 from '@/assets/peluche_29.jpeg';
import peluche30 from '@/assets/peluche_30.jpeg';
import peluche31 from '@/assets/peluche_31.jpeg';
import peluche32 from '@/assets/peluche_32.jpeg';
import peluche33 from '@/assets/peluche_33.jpeg';
import peluche34 from '@/assets/peluche_34.jpeg';
import peluche35 from '@/assets/peluche_35.jpeg';
import peluche36 from '@/assets/peluche_36.jpeg';
import peluche37 from '@/assets/peluche_37.jpeg';
import peluche38 from '@/assets/peluche_38.jpeg';
import peluche39 from '@/assets/peluche_39.jpeg';
import pl1 from '@/assets/PL1.jpg';
import pl2 from '@/assets/PL2.jpg';
import pl3 from '@/assets/PL3.jpg';
import pl5 from '@/assets/PL5.jpg';

interface PeluchesPageProps {
  onNavigate: (page: string) => void;
}

export function PeluchesPage({ onNavigate }: PeluchesPageProps) {
  const peluches = [
    {
      id: 1,
      name: "Peluche 120 cm",
      size: "120cm",
      color: "",
      price: "11500 Gdes",
      description: "Peluche 120 cm",
      image: pl1
    },
    {
      id: 2,
      name: "Peluche 120 cm",
      size: "120cm",
      color: "",
      price: "11500 Gdes",
      description: "Peluche 120 cm",
      image: pl2
    },
    {
      id: 3,
      name: "Package Peluche 160cm + Bouquet Médium + Chocolat XL",
      size: "160cm",
      color: "",
      price: "27000 Gdes",
      description: "Package complet: Peluche 160cm, Bouquet médium et Chocolat XL",
      image: pl3
    },
    {
      id: 4,
      name: "Peluche 160cm + Chocolat XL",
      size: "160cm",
      color: "",
      price: "19000 Gdes",
      description: "Package: Peluche 160cm et Chocolat XL",
      image: pl5
    },
    {
      id: 5,
      name: "Peluche",
      size: "20cm",
      color: "Beige ",
      price: "1000 Gdes",
      description: "",
      image: peluche1
    },
    {
      id: 6,
      name: "Peluche",
      size: "20cm",
      color: "Beige",
      price: "1000 Gdes",
      description: "",
      image: peluche2
    },
    {
      id: 7,
      name: "Peluche rouge",
      size: "20cm",
      color: "Rouge",
      price: "1000 Gdes",
      description: "",
      image: peluche3
    },
    {
      id: 8,
      name: "Peluche rouge",
      size: "60cm",
      color: "Rouge",
      price: "4000 Gdes",
      description: "",
      image: peluche4
    },
    {
      id: 9,
      name: "Peluche",
      size: "25cm",
      color: "",
      price: "1500 Goudes",
      description: "Peluche",
      image: peluche5
    },
    {
      id: 10,
      name: "peluche Rouge Romantique",
      size: "32cm",
      color: "rouge foncé",
      price: "2000 Gdes",
      description: "Peluche romantique idéale pour exprimer vos sentiments",
      image: peluche6
    },
    {
      id: 11,
      name: "Peluche rouge Élégant",
      size: "20cm",
      color: "rouge",
      price: "1000 Gdes",
      description: "",
      image: peluche7
    },
    {
      id: 12,
      name: "Ours Rose Nœud Rose",
      size: "20 cm",
      color: "Blanc/Rose",
      price: "1000 Gdes",
      description: "",
      image: peluche8
    },
    {
      id: 13,
      name: "Peluche rouge",
      size: "20cm",
      color: "Rouge",
      price: "1000 Gdes",
      description: "",
      image: peluche9
    },
    {
      id: 14,
      name: "peluche Poudré",
      size: "35cm",
      color: "blanc",
      price: "2000 Gdes",
      description: "",
      image: peluche10
    },
    {
      id: 15,
      name: "Peluche",
      size: "20cm",
      color: "",
      price: "1000 Gdes",
      description: "",
      image: peluche11
    },
    {
      id: 16,
      name: "peluche blanc",
      size: "20cm",
      color: "Blanc",
      price: "1500 Gdes",
      description: "",
      image: peluche12
    },
    {
      id: 17,
      name: "Peluche",
      size: "25cm",
      color: "Beige",
      price: "1500 Gdes",
      description: "",
      image: peluche13
    },
    {
      id: 15,
      name: "Peluche",
      size: "60cm",
      color: "Rouge clair",
      price: "4000 Gdes",
      description: " ",
      image: peluche14
    },
    {
      id: 16,
      name: "Peluche",
      size: "25 cm",
      color: "marron",
      price: "1500 Gdes",
      description: "",
      image: peluche15
    },
    {
      id: 17,
      name: "Peluche",
      size: "70cm",
      color: "rouge foncé",
      price: "6500 Gdes",
      description: "Ours au pelage épais et doux",
      image: peluche16
    },
    {
      id: 18,
      name: "Peluche",
      size: "60cm",
      color: "rose",
      price: "4000 Gdes",
      description: "",
      image: peluche17
    },
    {
      id: 19,
      name: "Peluche",
      size: "90cm",
      color: "blanc et rouge",
      price: "9000 gdes",
      description: "",
      image: peluche18
    },
    {
      id: 20,
      name: "Peluche",
      size: "70cm",
      color: "Beige",
      price: "6500 Gdes",
      description: "",
      image: peluche19
    },
    {
      id: 21,
      name: "Peluche",
      size: "62cm",
      color: "Blanc pur",
      price: "4250 Gdes",
      description: "",
      image: peluche20
    },
    {
      id: 22,
      name: "Peluche",
      size: "80cm",
      color: "Rouge",
      price: "7500 Gdes",
      description: "Nuance chaleureuse et réconfortante",
      image: peluche21
    },
    {
      id: 23,
      name: "Peluche",
      size: "52cm",
      color: "Rose pastel",
      price: "4250 Gdes",
      description: "Couleur pastel douce et apaisante",
      image: peluche22
    },
    {
      id: 24,
      name: "Peluche",
      size: "90 cm",
      color: "Caramel",
      price: "9000",
      description: "Peluche",
      image: peluche23
    },
    {
      id: 25,
      name: "Peluche",
      size: "55cm",
      color: "Rouge",
      price: "3750 Gdes",
      description: "Ton naturel et apaisant",
      image: peluche24
    },
    {
      id: 26,
      name: "Peluche",
      size: "62cm",
      color: "Blanc",
      price: "4250 Gdes",
      description: "Édition luxe avec finitions soignées",
      image: peluche25
    },
    {
      id: 27,
      name: "Peluche 26",
      size: "20cm",
      color: "Blanc",
      price: "1500 Gdes",
      description: "Peluche élégante blanche",
      image: peluche26
    },
    {
      id: 28,
      name: "Peluche",
      size: "25cm",
      color: "Beige",
      price: "1500 Gdes",
      description: "Intemporel et toujours apprécié",
      image: peluche27
    },
    {
      id: 29,
      name: "Peluche",
      size: "25 cm",
      color: "Blanc",
      price: "1500 Gdes",
      description: "",
      image: peluche28
    },
    {
      id: 30,
      name: "Peluche",
      size: "32cm",
      color: "blanc",
      price: "2000 Gdes",
      description: "Teinte profonde et chaleureuse",
      image: peluche29
    },
    {
      id: 31,
      name: "Peluche 30",
      size: "32cm",
      color: "Marron",
      price: "2000 Gdes",
      description: "Peluche classique",
      image: peluche30
    },
    {
      id: 32,
      name: "Peluche 31",
      size: "20cm",
      color: "Blanc",
      price: "1500 Gdes",
      description: "Peluche adorable",
      image: peluche31
    },
    {
      id: 33,
      name: "Peluche 32",
      size: "25cm",
      color: "Beige",
      price: "1800 Gdes",
      description: "Peluche confortable",
      image: peluche32
    },
    {
      id: 34,
      name: "Ours Blanc Coton",
      size: "20cm",
      color: "Blanc",
      price: "1000 Gdes",
      description: "Doux comme du coton",
      image: peluche33
    },
    {
      id: 35,
      name: "Ours Rouge Tendre XXL",
      size: "20cm",
      color: "Rouge",
      price: "1000 Gdes",
      description: "Grande taille pour plus de câlins",
      image: peluche34
    },
    {
      id: 36,
      name: "Peluche",
      size: "25cm",
      color: "Beige",
      price: "1000 Gdes",
      description: "Qualité supérieure garantie",
      image: peluche35
    },
    {
      id: 37,
      name: "Peluche 36",
      size: "20cm",
      color: "Rose",
      price: "1500 Gdes",
      description: "Peluche mignonne",
      image: peluche36
    },
    {
      id: 38,
      name: "Peluche",
      size: "25cm",
      color: "Caramel",
      price: "1000 Gdes",
      description: "Pure douceur et confort",
      image: peluche37
    },
    {
      id: 39,
      name: "peluche",
      size: "50cm",
      color: "",
      price: "3500 Gdes",
      description: "Symbole d'amour et d'affection",
      image: peluche38
    },
    {
      id: 40,
      name: "Peluche 39",
      size: "60cm",
      color: "Marron",
      price: "4000 Gdes",
      description: "Grande peluche XXL",
      image: peluche39
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {peluches.map((peluche) => (
              <div key={peluche.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#FADADD] group">
                {/* Image - Plus grande et bien visible */}
                <div className="relative aspect-square overflow-hidden bg-pink-50">
                  <ImageWithFallback 
                    src={peluche.image}
                    alt={peluche.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="text-[#E75480] text-lg font-semibold">{peluche.name}</h3>
                  
                  {/* Details */}
                  <div className="space-y-1">
                    <p className="text-sm text-[#555555]">Taille: {peluche.size}</p>
                    <p className="text-sm text-[#555555]">Couleur: {peluche.color}</p>
                  </div>

                  {/* Price */}
                  <p className="text-xl text-[#E75480] font-bold">{peluche.price}</p>

                  {/* CTA */}
                  <Button 
                    onClick={() => onNavigate('reservation')}
                    className="w-full bg-[#F48FB1] hover:bg-[#E75480] text-white"
                  >
                    Réserver
                  </Button>
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

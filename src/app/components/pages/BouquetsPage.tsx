import { Camera, Flower2, ShoppingCart, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useCart } from '@/utils/CartContext';
import { usePayment } from '@/utils/PaymentContext';
import { toast } from 'sonner';

// Import des nouvelles images de bouquets
import bouquet1 from '@/assets/bouquet_1.jpeg';
import bouquet2 from '@/assets/bouquet_2.jpeg';
import bouquet3 from '@/assets/bouquet_3.jpeg';
import bouquet4 from '@/assets/bouquet_4.jpeg';
import bouquet5 from '@/assets/bouquet_5.jpeg';
import bouquet6 from '@/assets/bouquet_6.jpeg';
import bouquet7 from '@/assets/bouquet_7.jpeg';
import bouquet8 from '@/assets/bouquet_8.jpeg';
import bouquet9 from '@/assets/bouquet_9.jpeg';
import bouquet10 from '@/assets/bouquet_10.jpeg';
import bouquet11 from '@/assets/bouquet_11.jpeg';
import bouquet12 from '@/assets/bouquet_12.jpeg';
import bouquet13 from '@/assets/bouquet_13.jpeg';
import bouquet14 from '@/assets/bouquet_14.jpeg';
import bouquet15 from '@/assets/bouquet_15.jpeg';
import bouquet16 from '@/assets/bouquet_16.jpeg';
import bouquet17 from '@/assets/bouquet_17.jpeg';
import bouquet18 from '@/assets/bouquet_18.jpeg';
import bouquet19 from '@/assets/bouquet_19.jpeg';
import bouquet20 from '@/assets/bouquet_20.jpeg';
import bouquet21 from '@/assets/bouquet_21.jpeg';
import bouquet22 from '@/assets/bouquet_22.jpeg';
import bouquet23 from '@/assets/bouquet_23.jpeg';
import bouquet24 from '@/assets/bouquet_24.jpeg';
import bouquet25 from '@/assets/bouquet_25.jpeg';
import bouquet26 from '@/assets/bouquet_26.jpeg';
import bouquet27 from '@/assets/bouquet_27.jpeg';
import bouquet28 from '@/assets/bouquet_28.jpeg';
import bouquet29 from '@/assets/bouquet_29.jpeg';
import bouquet30 from '@/assets/bouquet_30.jpeg';
import bouquet31 from '@/assets/bouquet_31.jpeg';
import bouquet32 from '@/assets/bouquet_32.jpeg';
import bouquet33 from '@/assets/bouquet_33.jpeg';
import bouquet34 from '@/assets/bouquet_34.jpeg';

interface BouquetsPageProps {
  onNavigate: (page: string) => void;
}

export function BouquetsPage({ onNavigate }: BouquetsPageProps) {
  const { addToCart } = useCart();
  const { isPaymentEnabled } = usePayment();

  const handleAddToCart = (bouquet: typeof bouquets[0]) => {
    if (!isPaymentEnabled) {
      toast.error('Le système de paiement est temporairement indisponible. Veuillez utiliser le formulaire de réservation.');
      return;
    }
    addToCart({
      id: bouquet.id,
      name: bouquet.name,
      price: bouquet.price,
      priceNumeric: 0, // Will be calculated in context
      currency: 'HTG',
      image: bouquet.image,
      category: bouquet.category,
    });
    
    toast.success('🛒 Ajouté au panier!', {
      description: bouquet.name,
      duration: 3000,
      style: {
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',
        border: 'none',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
      },
    });
  };

  const bouquets = [
    {
      id: 1,
      name: "Roses Rouges artificielles Passion",
      category: "Classique",
      price: "5000 gourdes",
      description: "Bouquet élégant de roses rouges premium, parfait pour déclarer votre amour",
      image: bouquet1,
      features: ["Roses rouges premium", "Fraîcheur garantie", "Emballage soigné"]
    },
    {
      id: 2,
      name: "Roses Rouges artificielles Romance",
      category: "Moderne",
      price: "5000 gourdes",
      description: "Arrangement délicat de roses rouges avec emballage raffiné",
      image: bouquet2,
      features: ["Roses rouges", "Design élégant", "Carte personnalisée"]
    },
    {
      id: 3,
      name: "Bouquet Rose Pureté",
      category: "Classique",
      price: "4500 Gdes",
      description: "Composition sophistiquée de roses blanches, symbole de pureté et d'innocence",
      image: bouquet3,
      features: ["Roses blanches", "Style épuré", "Emballage luxe"]
    },
    {
      id: 4,
      name: "Tournesols naturels Velours",
      category: "Premium",
      price: "$125 US",
      description: "Magnifique arrangement de roses rouges veloutées dans un emballage doré",
      image: bouquet4,
      features: ["Tournesols", "Qualité premium", "Emballage doré"]
    },
    {
      id: 5,
      name: "Roses artificielles",
      category: "Moderne",
      price: "8750 Gdes",
      description: "Bouquet unique de roses mauves avec emballage moderne et raffiné",
      image: bouquet5,
      features: ["Roses Rouges", "Design contemporain", "Ruban satiné"]
    },
    {
      id: 6,
      name: "Mini bouquet artificielles",
      category: "Spécial",
      price: "750 Gdes",
      description: "Mélange harmonieux de roses aux tons pastel pour une touche de douceur",
      image: bouquet6,
      features: ["Roses multicolores", "Tons pastel", "Arrangement unique"]
    },
    {
      id: 7,
      name: "Roses Douceur artificielles  ",
      category: "Classique",
      price: "4500 Gdes",
      description: "Bouquet tendre de roses corail avec emballage élégant",
      image: bouquet7,
      features: ["Roses corail", "Couleur douce", "Emballage raffiné"]
    },
    {
      id: 8,
      name: "Bouquet naturelles Intense",
      category: "Premium",
      price: "$150 US",
      description: "Arrangement luxueux de roses rouges intenses dans un emballage sophistiqué",
      image: bouquet8,
      features: ["Tournesols", "Rouge profond", "Présentation premium"]
    },
    {
      id: 9,
      name: "Roses Champagne",
      category: "Moderne",
      price: "4500 Gdes",
      description: "Bouquet raffiné de roses champagne avec emballage élégant et moderne",
      image: bouquet9,
      features: ["Roses champagne", "Style chic", "Emballage luxueux"]
    },
    {
      id: 10,
      name: "bouquet artificielles",
      category: "Spécial",
      price: "5000 Gdes",
      description: "Création vibrante mêlant roses de différentes couleurs pour une explosion de joie",
      image: bouquet10,
      features: ["Roses variées", "Couleurs vives", "Arrangement artistique"]
    },
    {
      id: 11,
      name: "Roses rouges et blanches Tendresse",
      category: "Classique",
      price: "5000 Gdes",
      description: "Bouquet délicat de roses saumon avec emballage blanc et rose",
      image: bouquet11,
      features: ["Roses rouges", "Emballage délicat", "Fraîcheur garantie"]
    },
    {
      id: 12,
      name: "Bouquet Pêche naturelles",
      category: "Moderne",
      price: "$68 US",
      description: "Arrangement tendre de roses couleur pêche dans un emballage raffiné",
      image: bouquet12,
      features: ["Roses pêche", "Design moderne", "Présentation soignée"]
    },
    {
      id: 13,
      name: "Roses Fuchsia Éclat",
      category: "Artificielles",
      price: "5000 Gdes",
      description: "Bouquet vibrant de roses fuchsia pour faire sensation",
      image: bouquet13,
      features: ["Roses fuchsia", "Couleur intense", "Emballage luxe"]
    },
    {
      id: 14,
      name: "Composition Romantique",
      category: "Naturelles",
      price: "$130 US",
      description: "Mélange élégant de roses roses et blanches pour un effet romantique",
      image: bouquet14,
      features: ["Roses roses et blanches", "Style romantique", "Arrangement harmonieux"]
    },
    {
      id: 15,
      name: "Roses Sérénités",
      category: "Artificielles",
      price: "7000 Gdes",
      description: "Bouquet apaisant de roses lavande avec emballage moderne",
      image: bouquet15,
      features: ["Roses lavande", "Couleur apaisante", "Design contemporain"]
    },
    {
      id: 16,
      name: "Bouquet rose Élégance",
      category: "Artificielles",
      price: "4500 Gdes",
      description: "Arrangement sophistiqué de roses crème dans un emballage luxueux",
      image: bouquet16,
      features: ["Roses", "Style sophistiqué", "Emballage premium"]
    },
    {
      id: 17,
      name: "Bouquet Argente Passion",
      category: "Artificielles",
      price: "*** Gdes",
      description: "Bouquet énergique de roses orange vif pour transmettre votre enthousiasme",
      image: bouquet17,
      features: ["Roses orange", "Couleur énergisante", "Emballage moderne"]
    },
    {
      id: 18,
      name: "Composition Vintage",
      category: "naturelles",
      price: "$130 US",
      description: "Bouquet au charme vintage avec roses aux tons anciens",
      image: bouquet18,
      features: ["Style vintage", "Roses anciennes", "Présentation rétro"]
    },
    {
      id: 19,
      name: "Roses Bordeaux Noble",
      category: "naturelles",
      price: "$150 US",
      description: "Arrangement noble de roses bordeaux profondes dans un écrin luxueux",
      image: bouquet19,
      features: ["Roses bordeaux", "Couleur noble", "Emballage luxe"]
    },
    {
      id: 20,
      name: "Bouquet Douceur",
      category: "Artificielles",
      price: "2000 Gdes",
      description: "Composition douce de roses abricot avec emballage élégant",
      image: bouquet20,
      features: ["Roses abricot", "Tons chaleureux", "Design moderne"]
    },
    {
      id: 21,
      name: "Roses Jaune Soleil",
      category: "Artificielles",
      price: "2000 Gdes",
      description: "Bouquet lumineux de roses jaunes pour apporter joie et lumière",
      image: bouquet21,
      features: ["Roses jaunes", "Couleur éclatante", "Emballage soigné"]
    },
    {
      id: 22,
      name: "Fleur",
      category: "naturelles",
      price: "2000 Gdes",
      description: "Création spectaculaire mêlant toutes les couleurs de l'arc-en-ciel",
      image: bouquet22,
      features: ["Roses multicolores", "Effet arc-en-ciel", "Arrangement unique"]
    },
    {
      id: 23,
      name: "Roses Blush Romance",
      category: "artificielles",
      price: "8500 Gdes",
      description: "Bouquet romantique de roses blush avec emballage raffiné",
      image: bouquet23,
      features: ["Roses blush", "Couleur délicate", "Présentation chic"]
    },
    {
      id: 24,
      name: "Bouquet Pourpre Royal",
      category: "artificielles",
      price: "5000 Gdes",
      description: "Arrangement royal de roses pourpres dans un emballage luxueux",
      image: bouquet24,
      features: ["Roses pourpres", "Style royal", "Emballage premium"]
    },
    {
      id: 25,
      name: "Roses Ivoire Pureté",
      category: "artificielles",
      price: "5000 Gdes",
      description: "Bouquet pur de roses ivoire, parfait pour les occasions spéciales",
      image: bouquet25,
      features: ["Roses ivoire", "Couleur pure", "Emballage élégant"]
    },
    {
      id: 26,
      name: "Composition Bohème",
      category: "artificielles",
      price: "2500 Gdes",
      description: "Arrangement bohème avec roses aux tons naturels et sauvages",
      image: bouquet26,
      features: ["Style bohème", "Tons naturels", "Design libre"]
    },
    {
      id: 27,
      name: "Roses Magenta Vibrant",
      category: "artificielles",
      price: "5000 Gdes",
      description: "Bouquet éclatant de roses magenta pour une déclaration audacieuse",
      image: bouquet27,
      features: ["Roses magenta", "Couleur vibrante", "Impact visuel"]
    },
    {
      id: 28,
      name: "Bouquet Caramel Douceur",
      category: "artificielles",
      price: "8500 Gdes",
      description: "Composition chaleureuse de roses caramel avec emballage raffiné",
      image: bouquet28,
      features: ["Roses caramel", "Tons chauds", "Présentation soignée"]
    },
    {
      id: 29,
      name: "Roses Platine Luxe",
      category: "artificielles",
      price: "5000 Gdes",
      description: "Arrangement exclusif de roses platine dans un écrin de luxe",
      image: bouquet29,
      features: ["Roses platine", "Édition limitée", "Emballage luxueux"]
    },
    {
      id: 30,
      name: "Composition Tournesol",
      category: "Artificielles",
      price: "5000 Gdes",
      description: "Bouquet champêtre avec roses et touches de verdure fraîche",
      image: bouquet30,
      features: ["Style jardin", "Verdure incluse", "Aspect naturel"]
    },
    {
      id: 31,
      name: "Roses Vermillon Passion",
      category: "Artificielles",
      price: "5000 Gdes",
      description: "Bouquet passionné de roses vermillon éclatantes",
      image: bouquet31,
      features: ["Roses vermillon", "Rouge vif", "Emballage soigné"]
    },
    {
      id: 32,
      name: "Bouquet Lilas Tendresse",
      category: "artificielles",
      price: "5000 Gdes",
      description: "Arrangement tendre de roses lilas dans un emballage moderne",
      image: bouquet32,
      features: ["Roses lilas", "Couleur douce", "Design contemporain"]
    },
    {
      id: 33,
      name: "Mini Bouquet tournesols",
      category: "Artificielles",
      price: "2500 Gdes",
      description: "Composition prestigieuse de roses grenat dans un emballage raffiné",
      image: bouquet33,
      features: ["Roses grenat", "Couleur profonde", "Présentation luxe"]
    },
    {
      id: 34,
      name: "Bouquet Spécial",
      category: "Artificielles",
      price: "*** Gdes",
      description: "Bouquet unique avec composition spéciale",
      image: bouquet34,
      features: ["Design unique", "Arrangement spécial", "Sur demande"]
    }
  ];

  const categories = ["Tous", "Classique", "Moderne", "Premium", "Sur Mesure", "Spécial"];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#F48FB1] to-[#E75480] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Flower2 className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl mb-4">Nos Bouquets</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Des créations florales d'exception, alliant esthétique, qualité et design
          </p>
        </div>
      </section>

      {/* How to Order Banner */}
      <section className="bg-[#FADADD] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <Camera className="w-8 h-8 text-[#E75480] flex-shrink-0" />
            <p className="text-[#555555]">
              <span className="text-[#E75480]">Comment commander :</span> Prenez une capture d'écran du bouquet qui vous plaît et remplissez le formulaire de réservation
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - Optional visual element */}
      <section className="py-8 bg-white border-b border-[#FADADD]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border-2 border-[#F48FB1] text-[#555555] hover:bg-[#F48FB1] hover:text-white transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bouquets.map((bouquet) => (
              <div key={bouquet.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#FADADD] group">
                {/* Image - Plus grande et bien visible */}
                <div className="relative aspect-square overflow-hidden bg-pink-50">
                  <ImageWithFallback 
                    src={bouquet.image}
                    alt={bouquet.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-[#E75480] text-white px-3 py-1 rounded-full text-xs">
                    {bouquet.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="text-[#E75480] text-lg font-semibold">{bouquet.name}</h3>
                  
                  {/* Features */}
                  <div className="space-y-1">
                    {bouquet.features.map((feature, index) => (
                      <p key={index} className="text-sm text-[#555555]">{feature}</p>
                    ))}
                  </div>

                  {/* Price */}
                  <p className="text-xl text-[#E75480] font-bold">{bouquet.price}</p>

                  {/* CTAs */}
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleAddToCart(bouquet)}
                      disabled={!isPaymentEnabled}
                      className={`flex-1 transition-all duration-300 ${
                        isPaymentEnabled 
                          ? 'bg-gradient-to-r from-[#F48FB1] to-[#E75480] hover:from-[#E75480] hover:to-[#D63A6A] text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                      }`}
                    >
                      {isPaymentEnabled ? (
                        <ShoppingCart className="w-4 h-4 mr-2" />
                      ) : (
                        <AlertCircle className="w-4 h-4 mr-2" />
                      )}
                      {isPaymentEnabled ? 'Ajouter' : 'Indisponible'}
                    </Button>
                    <Button 
                      onClick={() => {
                        // Store bouquet data in sessionStorage for reservation form
                        const productData = {
                          name: bouquet.name,
                          price: bouquet.price,
                          image: bouquet.image
                        };
                        sessionStorage.setItem('selectedProduct', JSON.stringify(productData));
                        onNavigate('reservation');
                      }}
                      variant="outline"
                      className="flex-1 border-2 border-[#F48FB1] text-[#E75480] hover:bg-[#F48FB1] hover:text-white transition-all duration-300"
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

      {/* Quality Promise Section */}
      <section className="py-12 bg-gradient-to-br from-[#FADADD] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl text-[#E75480]">Notre Engagement Qualité</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-[#E75480] text-lg mb-2">Fraîcheur</p>
                <p className="text-[#555555] text-sm">Fleurs sélectionnées quotidiennement</p>
              </div>
              <div>
                <p className="text-[#E75480] text-lg mb-2">Esthétique</p>
                <p className="text-[#555555] text-sm">Design soigné par nos artisans</p>
              </div>
              <div>
                <p className="text-[#E75480] text-lg mb-2">Durabilité</p>
                <p className="text-[#555555] text-sm">Conseils d'entretien inclus</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
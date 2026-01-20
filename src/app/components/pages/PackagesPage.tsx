import { Heart, Gift, Sparkles, Camera } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// Import des images de packages
import package1 from '@/assets/package_1.jpeg';
import package2 from '@/assets/package_2.jpeg';
import package3 from '@/assets/package_3.jpeg';
import package4 from '@/assets/package_4.jpeg';
import package5 from '@/assets/package_5.jpeg';
import package6 from '@/assets/package_6.jpeg';
import package7 from '@/assets/package_7.jpeg';
import package8 from '@/assets/package_8.jpeg';
import package9 from '@/assets/package_9.jpeg';
import package10 from '@/assets/package_10.jpeg';
import package11 from '@/assets/package_11.jpeg';
import package12 from '@/assets/package_12.jpeg';
import package13 from '@/assets/package_13.jpeg';
import package14 from '@/assets/package_14.jpeg';
import package15 from '@/assets/package_15.jpeg';
import package16 from '@/assets/package_16.jpeg';
import package17 from '@/assets/package_17.jpeg';
import package18 from '@/assets/package_18.jpeg';
import package19 from '@/assets/package_19.jpeg';
import package20 from '@/assets/package_20.jpeg';
import package21 from '@/assets/package_21.jpeg';
import package22 from '@/assets/package_22.jpeg';
import package23 from '@/assets/package_23.jpeg';
import package24 from '@/assets/package_24.jpeg';
import package25 from '@/assets/package_25.jpeg';
import package26 from '@/assets/package_26.jpeg';

interface PackagesPageProps {
  onNavigate: (page: string) => void;
}

export function PackagesPage({ onNavigate }: PackagesPageProps) {
  const packages = [
    {
      id: 1,
      name: "Romance Passion",
      description: "Peluche 32cm, chocolat fontessa(medium)",
      price: "5000 Gdes",
      image: package1,
      features: ["Bouquet de roses rouges", "Peluche ours", "Emballage luxe", "Chocolat"],
      tag: "Bestseller"
    },
    {
      id: 2,
      name: "Tendresse Rose",
      description: "Composition délicate de roses roses avec adorable peluche",
      price: "5000 Gdes",
      image: package2,
      features: ["Roses roses", "Peluche douce", "Emballage raffiné", "Ruban satiné"],
      tag: "Populaire"
    },
    {
      id: 3,
      name: "Élégance Blanche",
      description: "Parfum Yara, jeu montre et chaine, chocolat avec peluche 32 cm",
      price: "5000 Gdes",
      image: package3,
      features: ["Roses blanches pures", "Peluche", "Emballage chic", "Chocolat", "parfum Yara"],
      tag: "Premium"
    },
    {
      id: 4,
      name: "Douceur Pastel",
      description: "Mélange de roses aux tons pastel avec peluche tendre et chocolat",
      price: "10 500 Gdes",
      image: package4,
      features: ["Roses pastel", "Peluche câline", "Emballage délicat", "Nœud décoratif", "champagne"],
      tag: "Nouveau"
    },
    {
      id: 5,
      name: "Amour Éternel",
      description: "Bouquet champêtre avec roses colorées et peluche 60 cm",
      price: "9 000 Gdes",
      image: package5,
      features: ["30 roses rouges", "Grande peluche 50cm", "Emballage luxueux", "Coffret cadeau"],
      tag: "Bestseller"
    },
    {
      id: 6,
      name: "Jardin Romantique",
      description: "Bourse, bijoux complet, complet",
      price: "9 000 Gdes",
      image: package6,
      features: ["Roses (couleurs desirees)", "fleurs"],
      tag: "Populaire"
    },
    {
      id: 7,
      name: "Sunset Romance",
      description: "Chololat, Peluche, Jeux bijoux",
      price: "5000 Gdes",
      image: package7,
      features: ["Chololat", "Peluche", "Emballage moderne", "Jeux bijoux"],
      tag: "Nouveau"
    },
    {
      id: 8,
      name: "Pure Affection",
      price: "5000 Gdes",
      image: package8,
      features: ["Chololat", "Peluche", "Emballage moderne", "Jeux bijoux"],
      tag: "Premium"
    },
    {
      id: 9,
      name: "Fuchsia Dream",
      description: "Chololat, Peluche, Jeux bijoux",
      price: "5000 Gdes",
      image: package9,
      features: ["Roses fuchsia", "Peluche rose", "Emballage éclatant", "Décoration florale"],
      tag: "Populaire"
    },
    {
      id: 10,
      name: "Lavande Sérénité",
      // description: "Bouquet apaisant de roses lavande avec peluche mauve",
      price: "7000 Gdes",
      image: package10,
      features: ["Jeu parfum Yara", "Emballage", "montre", "bracelet"],
      tag: "Nouveau"
    },
    {
      id: 11,
      name: "Bordeaux Prestige",
      description: "Peluche 60cm, chocolat AntiuXixoma, fleur(couleur desiree), champagne( JAume Serra)",
      price: "9000 Gdes",
      image: package11,
      features: ["Peluche 60cm", "chocolat AntiuXixoma", "fleur(couleur desiree)", "champagne( Jaume Serra)"],
      tag: "Premium"
    },
    {
      id: 12,
      name: "Sweet Valentine",
      description: "Package spécial Saint-Valentin avec roses et peluche cœur",
      price: "99,99€",
      image: package12,
      features: ["Roses rouges", "Peluche avec cœur", "Chocolats fins", "Carte d'amour"],
      tag: "Bestseller"
    },
  
    {
      id: 15,
      name: "CHOCOLAT ROSE DE COEUR",
      description: "",
      price: "3000 gdes",
      image: package15,
      features: ["chocolat rose de coeur"],
      tag: "Premium"
    },
    {
      id: 16,
      name: "Pink Paradise",
      description: "Explosion de roses roses précieuses avec grande peluche",
      price: "8750 Gdes",
      image: package16,
      features: ["Mini Boue de chocolat", "Fleur naturelles et artificielles(choix)"],
      tag: "Bestseller"
    },
    {
      id: 17,
      name: "Ivory Dream",
      description: "",
      price: "8750 Gdes",
      image: package17,
      features: ["Roses", "Emballage pur"]
    },
    {
      id: 18,
      name: "Rainbow Joy",
      description: "Bouquet multicolore arc-en-ciel avec collection de peluches",
      price: "6500 Gdes",
      image: package18,
      features: ["Roses", "Chocolat", "Emballage"],
      tag: "Premium"
    },
    {
      id: 19,
      name: "Midnight Romance",
      description: "Boite de fleur artificielle et boule  de chocolat(sur demande)",
      price: "12 750 Gdes",
      image: package19,
      features: ["Boite de fleur artificielle et boule  de chocolat(Personalisee sur demande)"],
      tag: "Nouveau"
    },
    {
      id: 20,
      name: "Spring Awakening",
      description: "",
      price: "7500 Gdes",
      image: package20,
      features: [],
      tag: "Populaire"
    },
    {
      id: 21,
      name: "Golden Moment",
      description: "Roses dorées spéciales",
      price: "12 500 Gdes",
      image: package21,
      features: ["Roses dorées", "Chocolats", "Emballage doré"],
      tag: "Premium"
    },
    {
      id: 22,
      name: "Peach Harmony",
      description: "Roses rouge + boison de votre choix",
      price: "*** Gdes",
      image: package22,
      features: ["Roses", "boison de votre choix"],
      tag: "Nouveau"
    },
    {
      id: 23,
      name: "Crimson Love",
      description: "Roses et Peluche",
      price: "8000 Gdes",
      image: package23,
      features: ["bouquetRoses", "peluche"],
      tag: "Bestseller"
    },
    {
      id: 24,
      name: "Blush Beauty",
      description: "Roses blush tendres avec peluche rose pâle",
      price: "10 500 Gdes",
      image: package24,
      features: [],
      tag: "Populaire"
    },
    {
      id: 25,
      name: "Platinum Elegance",
      description: "Collection exclusive de roses platine avec peluche argent",
      price: "149,99€",
      image: package25,
      features: ["Bouquet Roses platine", "Emballage exclusif"],
      tag: "Premium"
    },
    {
      id: 26,
      name: "Package Sur Mesure",
      description: "Créez votre package unique selon vos désirs et votre budget",
      price: "Sur devis",
      image: package26,
      features: ["Fleurs au choix", "Peluche personnalisée", "Emballage sur mesure", "Extras à la carte"],
      tag: "Personnalisé"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#F48FB1] to-[#E75480] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl mb-4">Nos Packages Spéciaux</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Des combinaisons parfaites de fleurs et peluches, créées avec amour pour vos moments spéciaux
          </p>
        </div>
      </section>

      {/* How to Order Banner */}
      <section className="bg-[#FADADD] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <Camera className="w-8 h-8 text-[#E75480] flex-shrink-0" />
            <p className="text-[#555555]">
              <span className="text-[#E75480]">Comment commander :</span> Prenez une capture d'écran du package qui vous plaît et cliquez sur "Réserver maintenant" pour remplir le formulaire
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#FADADD] group">
                {/* Image */}
                <div className="relative h-96 overflow-hidden">
                  <ImageWithFallback 
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {pkg.tag && (
                    <div className="absolute top-4 right-4 bg-[#E75480] text-white px-4 py-2 rounded-full text-sm">
                      {pkg.tag}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-white text-2xl">{pkg.name}</h3>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-[#555555] leading-relaxed">{pkg.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-[#555555]">
                        <Sparkles className="w-5 h-5 text-[#F48FB1] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#FADADD]">
                    <div>
                      <p className="text-sm text-[#555555]">Prix</p>
                      <p className="text-2xl text-[#E75480]">{pkg.price}</p>
                    </div>
                    <Button 
                      onClick={() => onNavigate('reservation')}
                      className="bg-[#F48FB1] hover:bg-[#E75480] text-white"
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Réserver
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#FADADD] to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl text-[#E75480] mb-4">Besoin d'un Package Personnalisé ?</h2>
          <p className="text-[#555555] text-lg mb-6 max-w-2xl mx-auto">
            Nous pouvons créer un package sur mesure selon vos désirs et votre budget
          </p>
          <Button 
            onClick={() => onNavigate('reservation')}
            className="bg-[#E75480] hover:bg-[#d64575] text-white px-8 py-6 text-lg"
          >
            Contactez-nous pour un Package Sur Mesure
          </Button>
        </div>
      </section>
    </div>
  );
}
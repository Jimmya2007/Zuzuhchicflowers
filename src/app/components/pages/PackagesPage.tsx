import { Heart, Gift, Sparkles, Camera, ShoppingCart, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useCart } from '@/utils/CartContext';
import { usePayment } from '@/utils/PaymentContext';
import { toast } from 'sonner';

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
import nouvo1 from '@/assets/nouvo1.jpg';
import nouvo2 from '@/assets/nouvo2.jpg';
import nouvo3 from '@/assets/nouvo3.jpg';
import nouvo4 from '@/assets/nouvo4.jpg';
import nouvo5 from '@/assets/nouvo5.jpg';
import nouvo6 from '@/assets/nouvo6.jpg';
import nouvo7 from '@/assets/nouvo7.jpg';
import nouvo8 from '@/assets/nouvo8.jpg';
import nouvo9 from '@/assets/nouvo9.jpg';
import nouvo10 from '@/assets/nouvo10.jpg';
import nouvo11 from '@/assets/nouvo11.jpg';
import nouvo12 from '@/assets/nouvo12.jpg';
import nouvo13 from '@/assets/nouvo13.jpg';
import nouvo14 from '@/assets/nouvo14.jpg';
import nouvo15 from '@/assets/nouvo15.jpg';
import nouvo16 from '@/assets/nouvo16.jpg';
import nouvo17 from '@/assets/nouvo17.jpg';
import nouvo18 from '@/assets/nouvo18.jpg';
import nouvo19 from '@/assets/nouvo19.jpg';
import nouvo20 from '@/assets/nouvo20.jpg';
import nouvo21 from '@/assets/nouvo21.jpg';
import nouvo22 from '@/assets/nouvo22.jpg';
import nouvo23 from '@/assets/nouvo23.jpg';
import nouvo24 from '@/assets/nouvo24.jpg';
import nouvo25 from '@/assets/nouvo25.jpg';
import nouvo26 from '@/assets/nouvo26.jpg';
import nouvo27 from '@/assets/nouvo27.jpg';
import nouvo28 from '@/assets/nouvo28.jpg';
import nouvo29 from '@/assets/nouvo29.jpg';
import nouvo30 from '@/assets/nouvo30.jpg';
import nouvo31 from '@/assets/nouvo31.jpg';
import nouvo32 from '@/assets/nouvo32.jpg';
import nouvo33 from '@/assets/nouvo33.jpg';
import nouvo34 from '@/assets/nouvo34.jpg';
import nouvo35 from '@/assets/nouvo35.jpg';
import nouvo36 from '@/assets/nouvo36.jpg';
import nouvo37 from '@/assets/nouvo37.jpg';
import nouvo38 from '@/assets/nouvo38.jpg';
import nouvo39 from '@/assets/nouvo39.jpg';
import nouvo41 from '@/assets/nouvo41.jpg';
import nouvo40 from '@/assets/nouvo40.jpg';
import nouvo42 from '@/assets/nouvo42.jpg';
import nouvo43 from '@/assets/nouvo43.jpg';
import nouvo45 from '@/assets/nouvo45.jpg';
import nouvo47 from '@/assets/nouvo47.jpg';

interface PackagesPageProps {
  onNavigate: (page: string) => void;
}

export function PackagesPage({ onNavigate }: PackagesPageProps) {
  const { addToCart } = useCart();
  const { isPaymentEnabled } = usePayment();

  const handleAddToCart = (pkg: typeof packages[0]) => {
    if (!isPaymentEnabled) {
      toast.error('Le système de paiement est temporairement indisponible. Veuillez utiliser le formulaire de réservation.');
      return;
    }
    addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      priceNumeric: 0,
      currency: 'HTG',
      image: pkg.image,
      category: 'Package',
    });
    
    toast.success('🛒 Ajouté au panier!', {
      description: pkg.name,
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

  const packages = [
    {
      id: 1,
      name: "Romance Passion",
      description: "Peluche 32cm, chocolat fontessa(medium)",
      price: "5000 Gdes",
      image: package1,
      features: [" "],
      tag: "Bestseller"
    },
    {
      id: 2,
      name: "Tendresse Rose",
      description: "Composition délicate de roses roses avec adorable peluche",
      price: "5000 Gdes",
      image: package2,
      features: ["vin rouge", "chocolat coeur de roses", "carte", "Peluche 32 cm", "Emballage"],
      tag: "Populaire"
    },
    {
      id: 3,
      name: "Élégance Blanche",
      description: "Parfum Yara, montre et chaine",
      price: "6250 Gdes",
      image: package3,
      features: [""],
      tag: "Premium"
    },
    {
      id: 4,
      name: "Douceur Pastel",
      description: "Fleur, peluche, chocolat AntiuXixoma",
      price: "7 500 Gdes",
      image: package4,
      features: [""],
      tag: "Nouveau"
    },
    {
      id: 5,
      name: "Amour Éternel",
      description: "",
      price: "9 000 Gdes",
      image: package5,
      features: ["peluche (60cm)", "chocolat antiuxima", "fleur(couleur desiree)", "champagne jaume serra"],
      tag: "Bestseller"
    },
    {
      id: 6,
      name: "Romantique",
      description: "Bourse, bijoux complet, chocolat",
      price: "5 000 Gdes",
      image: package6,
      features: [""],
      tag: "Populaire"
    },
    {
      id: 7,
      name: "Sunset Romance",
      description: "Chololat, Peluche, Jeux bijoux",
      price: "4000 Gdes",
      image: package7,
      features: ["Chololat AntiuXixona", "Peluche 20 cm", "Chaine"],
      tag: "Nouveau"
    },
    {
      id: 8,
      name: "Pure Affection",
      price: "6250 Gdes",
      image: package8,
      features: ["Chololat AntiuXixona", "Peluche 20cm", "Emballage moderne", "Jeux bijoux"],
      tag: "Premium"
    },
    {
      id: 9,
      name: "Fuchsia Dream",
      description: "Fleur, Peluche Rose, Jeux bijoux",
      price: "10500 Gdes",
      image: package9,
      features: ["Roses fuchsia", "Peluche 32cm", "Champagne Paloma", "Chocolat cordial"],
      tag: "Populaire"
    },
    {
      id: 10,
      name: "Lavande Sérénité",
      // description: "Bouquet apaisant de roses lavande avec peluche mauve",
      price: "7000 Gdes",
      image: package10,
      features: ["Jeu parfum Yara", "Pince pour cheveux", "montre", "bracelet"],
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
      description: " ",
      price: "7250 Gdes",
      image: package12,
      features: ["Vin rouge", "Peluche 32cm", "Chocolats Coeur de Rose", "Carte d'amour"],
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
      description: " ",
      price: "8750 Gdes",
      image: package16,
      features: ["Mini Boule de chocolat size L", "Fleur artificielles(choix)", "Disponible en naturel $85us"],
      tag: "Bestseller"
    },
    {
      id: 17,
      name: "Pink Paradise",
      description: " ",
      price: "8750 Gdes",
      image: package17,
      features: ["Mini Boule de chocolat size L", "Fleur artificielles(choix)", "Disponible en naturel $85us"],
      tag: "Bestseller"
    },
    {
      id: 18,
      name: "Rainbow Joy",
      description: "",
      price: "6750 Gdes",
      image: package18,
      features: ["Boite fleur artifciel", "Mini boule de chocolat", "Couronne de size M"],
      tag: "Premium"
    },
    {
      id: 19,
      name: "Midnight Romance",
      description: "Boite de fleur artificielle et boule  de chocolat(sur demande)",
      price: "12 750 Gdes",
      image: package19,
      features: ["Boite de fleur artificielle et boule  de chocolat(Personalisee sur demande), Disponible en naturel 122us"],
      tag: "Nouveau"
    },
    {
      id: 20,
      name: "Spring Awakening",
      description: "Peluche size 60cm,Chocolat AntiuXixona, Fleur(couleur desire), Champagne(jaune serra)",
      price: "9000 Gdes",
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
      features: ["Boite de fleur artificielle", "Chocolats", "Emballage doré"],
      tag: "Premium"
    },
    {
      id: 22,
      name: "Peach Harmony",
      description: "Roses rouge + boison de votre choix",
      price: "*** Gdes",
      image: package22,
      features: ["Boite de fleur artificlelle", "boison de votre choix"],
      tag: "Nouveau"
    },
    {
      id: 23,
      name: "Crimson Love",
      description: "bouquet artificiel et Peluche",
      price: "8750 Gdes",
      image: package23,
      features: ["bouquet artificiel", "peluche"],
      tag: "Bestseller"
    },
    {
      id: 24,
      name: "Blush Beauty",
      description: "Boite de fleur, chocolat snickers et champagne",
      price: "11 000 Gdes",
      image: package24,
      features: [],
      tag: "Populaire"
    },
    {
      id: 25,
      name: "Platinum Elegance",
      description: "Boite fleur artificielle",
      price: "9850 Gdes",
      image: package25,
      features: ["Disponible en naturel"],
      tag: "Premium"
    },
    {
      id: 26,
      name: "Package Sur Mesure",
      description: "Créez votre package unique selon vos désirs et votre budget",
      price: "Sur devis",
      image: package26,
      features: ["Fleurs au choix", "Peluche", "Emballage sur mesure", "carte"],
      tag: "Personnalisé"
    },
    {
      id: 27,
      name: "Package Amour & Tendresse",
      description: "Peluche 32cm avec mini chocolat et branche fleur",
      price: "2750 Gdes / $21 US",
      image: nouvo1,
      features: ["Peluche 32cm", "Mini chocolat", "Branche fleur"],
      tag: "Bestseller"
    },
    {
      id: 28,
      name: "Package Douceur",
      description: "Peluche 32cm avec mini chocolat et branche fleur",
      price: "2750 Gdes / $21 US",
      image: nouvo2,
      features: ["Peluche 32cm", "Mini chocolat", "Branche fleur"],
      tag: "Populaire"
    },
    {
      id: 29,
      name: "Package Charme",
      description: "Peluche 32cm avec mini chocolat et branche fleur",
      price: "2750 Gdes / $21 US",
      image: nouvo3,
      features: ["Peluche 32cm", "Mini chocolat", "Branche fleur"],
      tag: "Nouveau"
    },
    {
      id: 30,
      name: "Package Élégance",
      description: "Peluche 32cm avec mini chocolat et branche fleur",
      price: "2750 Gdes / $21 US",
      image: nouvo4,
      features: ["Peluche 32cm", "Mini chocolat", "Branche fleur"],
      tag: "Premium"
    },
    {
      id: 31,
      name: "Package Mignon",
      description: "Peluche 20cm avec mini chocolat et branche fleur",
      price: "1750 Gdes / $13 US",
      image: nouvo5,
      features: ["Peluche 20cm", "Mini chocolat", "Branche fleur"],
      tag: "Bestseller"
    },
    {
      id: 32,
      name: "Package Petit Cœur",
      description: "Peluche 20cm avec chocolat mini et branche fleur",
      price: "1750 Gdes / $13 US",
      image: nouvo6,
      features: ["Peluche 20cm", "Chocolat mini", "Branche fleur"],
      tag: "Populaire"
    },
    {
      id: 33,
      name: "Package Gourmand",
      description: "Peluche 20cm avec chocolat small et branche fleur",
      price: "2250 Gdes / $17 US",
      image: nouvo7,
      features: ["Peluche 20cm", "Chocolat small", "Branche fleur"],
      tag: "Nouveau"
    },
    {
      id: 34,
      name: "Package Doux Moment",
      description: "Peluche 20cm avec chocolat small et branche fleur",
      price: "2250 Gdes / $17 US",
      image: nouvo8,
      features: ["Peluche 20cm", "Chocolat small", "Branche fleur"],
      tag: "Premium"
    },
    {
      id: 35,
      name: "Package Calin",
      description: "Peluche 20cm avec chocolat small et branche fleur",
      price: "2250 Gdes / $17 US",
      image: nouvo9,
      features: ["Peluche 20cm", "Chocolat small", "Branche fleur"],
      tag: "Bestseller"
    },
    {
      id: 36,
      name: "Package Prestige",
      description: "Peluche 25cm avec chocolat médium et branche fleur",
      price: "3750 Gdes / $29 US",
      image: nouvo10,
      features: ["Peluche 25cm", "Chocolat médium", "Branche fleur"],
      tag: "Premium"
    },
    {
      id: 37,
      name: "Package Tendresse Luxe",
      description: "Peluche 32cm avec chocolat médium et branche fleur",
      price: "3750 Gdes / $29 US",
      image: nouvo11,
      features: ["Peluche 32cm", "Chocolat médium", "Branche fleur"],
      tag: "Bestseller"
    },
    {
      id: 38,
      name: "Package Cœur de Rose",
      description: "Peluche 25cm avec chocolat médium cœur de rose et branche fleur",
      price: "3750 Gdes / $29 US",
      image: nouvo12,
      features: ["Peluche 25cm", "Chocolat médium cœur de rose", "Branche fleur"],
      tag: "Premium"
    },
    {
      id: 39,
      name: "Package Douceur 25",
      description: "Peluche 25cm avec chocolat médium et branche fleur",
      price: "3750 Gdes / $29 US",
      image: nouvo13,
      features: ["Peluche 25cm", "Chocolat médium", "Branche fleur"],
      tag: "Populaire"
    },
    {
      id: 40,
      name: "Package Romance Complète",
      description: "Peluche 25cm avec bouquet médium et chocolat cœur de rose médium",
      price: "8500 Gdes / $65 US",
      image: nouvo14,
      features: ["Peluche 25cm", "Bouquet médium", "Chocolat cœur de rose médium"],
      tag: "Premium"
    },
    {
      id: 41,
      name: "Package Gourmandise",
      description: "Peluche 32cm avec chocolat antiuxixona et branche fleur",
      price: "3000 Gdes / $23 US",
      image: nouvo15,
      features: ["Peluche 32cm", "Chocolat antiuxixona", "Branche fleur"],
      tag: "Bestseller"
    },
    {
      id: 42,
      name: "Package Wimmy's",
      description: "Peluche 32cm avec chocolat wimmy's small et branche fleur",
      price: "3000 Gdes / $23 US",
      image: nouvo16,
      features: ["Peluche 32cm", "Chocolat wimmy's small", "Branche fleur"],
      tag: "Populaire"
    },
    {
      id: 43,
      name: "Package Wimmy's Délice",
      description: "Peluche 32cm avec chocolat wimmy's et branche fleur",
      price: "3000 Gdes / $23 US",
      image: nouvo17,
      features: ["Peluche 32cm", "Chocolat wimmy's", "Branche fleur"],
      tag: "Nouveau"
    },
    {
      id: 44,
      name: "Package Sucré 32",
      description: "Peluche 32cm avec chocolat wimmy's small et branche fleur",
      price: "3000 Gdes / $23 US",
      image: nouvo18,
      features: ["Peluche 32cm", "Chocolat wimmy's small", "Branche fleur"],
      tag: "Premium"
    },
    {
      id: 45,
      name: "Package Antiuxixona",
      description: "Peluche 32cm avec chocolat antiuxixona et branche fleur",
      price: "3000 Gdes / $23 US",
      image: nouvo19,
      features: ["Peluche 32cm", "Chocolat antiuxixona", "Branche fleur"],
      tag: "Bestseller"
    },
    {
      id: 46,
      name: "Package Antiuxixona Mini",
      description: "Peluche 32cm avec chocolat antiuxixona small et branche fleur",
      price: "3000 Gdes / $23 US",
      image: nouvo20,
      features: ["Peluche 32cm", "Chocolat antiuxixona small", "Branche fleur"],
      tag: "Populaire"
    },
    {
      id: 47,
      name: "Package Wimmy's Charme",
      description: "Peluche 32cm avec chocolat wimmy's small et branche fleur",
      price: "3000 Gdes / $23 US",
      image: nouvo21,
      features: ["Peluche 32cm", "Chocolat wimmy's small", "Branche fleur"],
      tag: "Nouveau"
    },
    {
      id: 48,
      name: "Package Praliness",
      description: "Peluche 32cm avec chocolat médium praliness et branche fleur",
      price: "4150 Gdes / $32 US",
      image: nouvo22,
      features: ["Peluche 32cm", "Chocolat médium praliness", "Branche fleur"],
      tag: "Premium"
    },
    {
      id: 49,
      name: "Package Praliness Élégance",
      description: "Peluche 32cm avec chocolat praliness médium et branche fleur",
      price: "4150 Gdes / $32 US",
      image: nouvo23,
      features: ["Peluche 32cm", "Chocolat praliness médium", "Branche fleur"],
      tag: "Bestseller"
    },
    {
      id: 50,
      name: "Package Cœur de Rose",
      description: "Peluche 32cm avec chocolat cœur de rose médium et branche fleur",
      price: "4150 Gdes / $32 US",
      image: nouvo24,
      features: ["Peluche 32cm", "Chocolat cœur de rose médium", "Branche fleur"],
      tag: "Populaire"
    },
    {
      id: 51,
      name: "Package Wimmy's Bouquet",
      description: "Peluche 32cm avec chocolat wimmy's small et bouquet médium",
      price: "8000 Gdes / $59 US",
      image: nouvo25,
      features: ["Peluche 32cm", "Chocolat wimmy's small", "Bouquet médium"],
      tag: "Nouveau"
    },
    {
      id: 52,
      name: "Package Cœur de Rose Bouquet",
      description: "Peluche 32cm avec chocolat cœur de rose médium et bouquet médium",
      price: "8750 Gdes / $64 US",
      image: nouvo26,
      features: ["Peluche 32cm", "Chocolat cœur de rose médium", "Bouquet médium"],
      tag: "Premium"
    },
    {
      id: 53,
      name: "Package Praliness Bouquet",
      description: "Peluche 32cm avec chocolat praliness médium et bouquet médium (couleur désirée)",
      price: "8750 Gdes / $64 US",
      image: nouvo27,
      features: ["Peluche 32cm", "Chocolat praliness médium", "Bouquet médium (couleur désirée)"],
      tag: "Bestseller"
    },
    {
      id: 54,
      name: "Package Douceur Bouquet",
      description: "Peluche 32cm avec chocolat small et bouquet médium",
      price: "8000 Gdes / $59 US",
      image: nouvo28,
      features: ["Peluche 32cm", "Chocolat small", "Bouquet médium"],
      tag: "Populaire"
    },
    {
      id: 55,
      name: "Package Wimmy's Grande Taille",
      description: "Peluche 50cm avec chocolat wimmy's small et mini bouquet",
      price: "7250 Gdes / $53 US",
      image: nouvo29,
      features: ["Peluche 50cm", "Chocolat wimmy's small", "Mini bouquet"],
      tag: "Nouveau"
    },
    {
      id: 56,
      name: "Package Chocolat Médium",
      description: "Peluche 50cm avec chocolat médium",
      price: "5500 Gdes / $41 US",
      image: nouvo30,
      features: ["Peluche 50cm", "Chocolat médium"],
      tag: "Premium"
    },
    {
      id: 57,
      name: "Package Grande Peluche Bouquet",
      description: "Peluche 50cm avec chocolat médium et mini bouquet (couleur désirée)",
      price: "8250 Gdes / $61 US",
      image: nouvo31,
      features: ["Peluche 50cm", "Chocolat médium", "Mini bouquet (couleur désirée)"],
      tag: "Bestseller"
    },
    {
      id: 58,
      name: "Package Cœur de Rose XL Sunshine",
      description: "Peluche 50cm avec chocolat cœur de rose XL et mini bouquet Sunshine",
      price: "9250 Gdes / $68 US",
      image: nouvo32,
      features: ["Peluche 50cm", "Chocolat cœur de rose XL", "Mini bouquet Sunshine"],
      tag: "Populaire"
    },
    {
      id: 59,
      name: "Package Wimmy's Bouquet Artificiel",
      description: "Peluche 50cm avec chocolat wimmy's small et bouquet artificiel médium (couleur désirée)",
      price: "9500 Gdes / $70 US",
      image: nouvo33,
      features: ["Peluche 50cm", "Chocolat wimmy's small", "Bouquet artificiel médium (couleur désirée)"],
      tag: "Nouveau"
    },
    {
      id: 60,
      name: "Package Grande Douceur",
      description: "Peluche 50cm avec chocolat médium et mini bouquet (couleur désirée)",
      price: "8250 Gdes / $61 US",
      image: nouvo34,
      features: ["Peluche 50cm", "Chocolat médium", "Mini bouquet (couleur désirée)"],
      tag: "Premium"
    },
    {
      id: 61,
      name: "Package Cœur de Rose XL Grande Taille",
      description: "Peluche 50cm avec chocolat cœur de rose XL et mini bouquet Sunshine",
      price: "9250 Gdes / $68 US",
      image: nouvo35,
      features: ["Peluche 50cm", "Chocolat cœur de rose XL", "Mini bouquet Sunshine"],
      tag: "Bestseller"
    },
    {
      id: 62,
      name: "Package Wimmy's Artificiel Grande Taille",
      description: "Peluche 50cm avec chocolat wimmy's small et bouquet artificiel médium (couleur désirée)",
      price: "9500 Gdes / $70 US",
      image: nouvo36,
      features: ["Peluche 50cm", "Chocolat wimmy's small", "Bouquet artificiel médium (couleur désirée)"],
      tag: "Populaire"
    },
    {
      id: 63,
      name: "Package Feeling Artificiel",
      description: "Peluche 50cm avec chocolat feeling médium et bouquet artificiel médium",
      price: "10500 Gdes / $78 US",
      image: nouvo37,
      features: ["Peluche 50cm", "Chocolat feeling médium", "Bouquet artificiel médium"],
      tag: "Nouveau"
    },
    {
      id: 64,
      name: "Package Amarantha Premium",
      description: "Peluche 60cm avec chocolat médium, vin Amarantha et bouquet médium",
      price: "13000 Gdes / $96 US",
      image: nouvo38,
      features: ["Peluche 60cm", "Chocolat médium", "Vin Amarantha", "Bouquet médium"],
      tag: "Premium"
    },
    {
      id: 65,
      name: "Package Grande Peluche Luxe",
      description: "Peluche 62cm avec chocolat médium et bouquet médium",
      price: "11,250 Gdes / $84 US",
      image: nouvo39,
      features: ["Peluche 62cm", "Chocolat médium", "Bouquet médium"],
      tag: "Bestseller"
    },
    {
      id: 66,
      name: "Package Praliness XXL",
      description: "Peluche 80cm avec chocolat praliness médium et branche fleur",
      price: "9500 Gdes / $70 US",
      image: nouvo41,
      features: ["Peluche 80cm", "Chocolat praliness médium", "Branche fleur"],
      tag: "Populaire"
    },
    {
      id: 67,
      name: "Package Cœur de Rose Géant",
      description: "Peluche 90cm avec chocolat cœur de rose et branche fleur",
      price: "11,000 Gdes / $81 US",
      image: nouvo40,
      features: ["Peluche 90cm", "Chocolat cœur de rose", "Branche fleur"],
      tag: "Nouveau"
    },
    {
      id: 68,
      name: "Package Cœur de Rose Majestueux",
      description: "Peluche 120cm avec chocolat cœur de rose médium et branche fleur",
      price: "14,000 Gdes / $103 US",
      image: nouvo42,
      features: ["Peluche 120cm", "Chocolat cœur de rose médium", "Branche fleur"],
      tag: "Premium"    },
    {
      id: 69,
      name: "Package Cœur de Rose Champagne",
      description: "Peluche 90cm avec chocolat cœur de rose XL, champagne et branche fleur",
      price: "15,000 Gdes / $112 US",
      image: nouvo43,
      features: ["Peluche 90cm", "Chocolat cœur de rose XL", "Champagne", "Branche fleur"],
      tag: "Bestseller"    },
    {
      id: 70,
      name: "Package Feeling Artificiel Majestueux",
      description: "Peluche 120cm avec chocolat feeling médium et bouquet artificiel médium",
      price: "18,500 Gdes / $138 US",
      image: nouvo45,
      features: ["Peluche 120cm", "Chocolat feeling médium", "Bouquet artificiel médium"],
      tag: "Populaire"
    },
    {
      id: 71,
      name: "Package Fontessa Prestige",
      description: "Peluche 120cm (couleur disponible: crème, rouge, grenat) avec chocolat fontessa et bouquet large artificiel",
      price: "22,000 Gdes / $163 US",
      image: nouvo47,
      features: ["Peluche 120cm (crème/rouge/grenat)", "Chocolat fontessa", "Bouquet large artificiel"],
      tag: "Nouveau"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#FADADD] group w-full">
                {/* Image */}
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <ImageWithFallback 
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {pkg.tag && (
                    <div className="absolute top-4 right-4 bg-[#E75480] text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm">
                      {pkg.tag}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 right-4 text-white text-lg md:text-2xl break-words">{pkg.name}</h3>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                  <p className="text-[#555555] leading-relaxed text-sm md:text-base">{pkg.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-[#555555] text-sm md:text-base">
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#F48FB1] flex-shrink-0 mt-0.5" />
                        <span className="break-words">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="space-y-3 pt-4 border-t border-[#FADADD]">
                    <div>
                      <p className="text-sm text-[#555555]">Prix</p>
                      <p className="text-xl md:text-2xl text-[#E75480] break-words">{pkg.price}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                      <Button 
                        onClick={() => handleAddToCart(pkg)}
                        disabled={!isPaymentEnabled}
                        className={`w-full sm:flex-1 transition-all duration-300 ${
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
                        onClick={() => onNavigate('reservation')}
                        variant="outline"
                        className="w-full sm:flex-1 border-2 border-[#F48FB1] text-[#E75480] hover:bg-[#F48FB1] hover:text-white transition-all duration-300"
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        Réserver
                      </Button>
                    </div>
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
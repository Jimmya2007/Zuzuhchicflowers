import { Sparkles, Gift, Calendar, Users, GraduationCap, Heart } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import redRosesGold from '@/assets/bouquet_3.jpeg';
import yellowRoses from '@/assets/bouquet_4.jpeg';
import redRosesBlack from '@/assets/bouquet_5.jpeg';
import atelierFormation from '@/assets/atelier-formation.jpg';
import eventsImage from '@/assets/events.jpg';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      id: 1,
      icon: Sparkles,
      title: "Créations Florales Personnalisées",
      description: "Nous créons des arrangements floraux uniques selon vos goûts, vos couleurs préférées et l'occasion célébrée. Chaque création est une œuvre d'art florale.",
      features: [
        "Consultation personnalisée gratuite",
        "Choix de fleurs selon vos préférences",
        "Design unique et sur mesure",
        "Adaptation à votre budget"
      ],
      image: redRosesGold
    },
    {
      id: 2,
      icon: Gift,
      title: "Coffrets Cadeaux",
      description: "Des coffrets élégants combinant fleurs fraîches, peluches raffinées et petites attentions pour créer le cadeau parfait.",
      features: [
        "Combinaisons fleurs + peluches",
        "Ajout de chocolats ou parfums",
        "Emballage luxueux inclus",
        "Carte message personnalisée"
      ],
      image: yellowRoses
    },
    {
      id: 3,
      icon: Calendar,
      title: "Décoration pour Événements",
      description: "Transformez vos événements avec nos créations florales spectaculaires : mariages, anniversaires, événements d'entreprise.",
      features: [
        "Conception globale de décor",
        "Centres de table élégants",
        "Arches et installations florales",
        "Service de mise en place"
      ],
      image: eventsImage
    },
    {
      id: 4,
      icon: Users,
      title: "Commandes Spéciales",
      description: "Des projets floraux uniques pour des occasions exceptionnelles. Nous donnons vie à vos idées les plus créatives.",
      features: [
        "Projets sur mesure",
        "Fleurs rares sur commande",
        "Délais respectés",
        "Suivi personnalisé"
      ],
      image: redRosesGold
    },
    {
      id: 5,
      icon: GraduationCap,
      title: "Ateliers & Formation",
      description: "Apprenez l'art floral avec nos experts. Ateliers créatifs pour débutants et passionnés.",
      features: [
        "Ateliers découverte",
        "Cours d'art floral",
        "Sessions privées disponibles",
        "Matériel fourni"
      ],
      image: atelierFormation
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#F48FB1] to-[#E75480] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl mb-4">Nos Services</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Des prestations complètes pour tous vos besoins floraux et événements spéciaux
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F48FB1] rounded-full">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl text-[#E75480]">{service.title}</h2>
                  <p className="text-[#555555] text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[#555555]">
                        <span className="w-2 h-2 bg-[#F48FB1] rounded-full flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => onNavigate('reservation')}
                    className="bg-[#F48FB1] hover:bg-[#E75480] text-white mt-4"
                  >
                    Demander un Devis
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#FADADD] to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl text-[#E75480] mb-6">Besoin d'un Service Sur Mesure ?</h2>
          <p className="text-[#555555] text-lg mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre écoute pour créer des solutions adaptées à vos besoins spécifiques
          </p>
          <Button 
            onClick={() => onNavigate('reservation')}
            className="bg-[#E75480] hover:bg-[#d64575] text-white px-10 py-6 text-lg"
          >
            Contactez-nous
          </Button>
        </div>
      </section>
    </div>
  );
}
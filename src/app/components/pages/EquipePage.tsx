import { Users, Heart, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import teamImage from '@/assets/bouquet_10.jpeg';
import pdgImage from '@/assets/pdg.jpg';
import managerImage from '@/assets/manager.jpg';
import assistanteImage from '@/assets/ASSISTANTE.jpg';

interface EquipePageProps {
  onNavigate: (page: string) => void;
}

export function EquipePage({ onNavigate }: EquipePageProps) {
  const team = [
    {
      id: 1,
      name: "MINOUDJIE LAMY",
      role: "PDG & Fondateur",
      description: "Visionnaire passionné, MINOUDJIE LAMY a créé ZUZUH CHIC FLOWERS avec la mission de partager l'amour et la beauté à travers l'art floral.",
      image: pdgImage
    },
    {
      id: 2,
      name: "RUTH TANIA TOUSSAINT",
      role: "Manager",
      description: "Avec son expertise en gestion et sa passion pour l'excellence, Ruth Tania assure le bon fonctionnement de toutes nos opérations.",
      image: managerImage
    },
    {
      id: 3,
      name: "GUSTAVE NAIKA ANGELA",
      role: "Assistante",
      description: "Dévouée et organisée, Gustave Naika Angela assure le soutien administratif et coordonne les opérations quotidiennes avec efficacité.",
      image: assistanteImage
    },
    {
      id: 4,
      name: "Lucas Bernard",
      role: "Gestionnaire Relations Clients",
      description: "Lucas assure que chaque client reçoive un service exceptionnel et une attention personnalisée du début à la fin.",
      image: teamImage
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Nous mettons notre cœur dans chaque création"
    },
    {
      icon: Sparkles,
      title: "Excellence",
      description: "Qualité et raffinement dans chaque détail"
    },
    {
      icon: Users,
      title: "Proximité",
      description: "À l'écoute de vos besoins et désirs"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#F48FB1] to-[#E75480] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Users className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl mb-4">Notre Équipe</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Des passionnés dévoués à créer la magie florale pour vos moments précieux
          </p>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl text-[#E75480] mb-6">Une Équipe Unie par la Passion</h2>
            <p className="text-[#555555] text-lg leading-relaxed">
              Chez ZUZUH CHIC FLOWERS, chaque membre de notre équipe apporte son expertise unique 
              et son amour des fleurs pour créer des expériences inoubliables. Nous croyons que 
              derrière chaque bouquet se cache une histoire, une émotion, un message d'amour.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div key={member.id} className="bg-[#FADADD] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-96 overflow-hidden bg-white">
                  <ImageWithFallback 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl text-[#E75480]">{member.name}</h3>
                  <p className="text-[#555555]">{member.role}</p>
                  <p className="text-[#555555] leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-[#FADADD] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#E75480] mb-4">Nos Valeurs</h2>
            <p className="text-[#555555] text-lg max-w-2xl mx-auto">
              Les principes qui guident notre travail quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[#F48FB1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl text-[#E75480] mb-3">{value.title}</h3>
                <p className="text-[#555555]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-12 h-12 text-[#F48FB1] mx-auto mb-4" />
          <h2 className="text-2xl text-[#E75480] mb-4">Nous Sommes à Votre Service</h2>
          <p className="text-[#555555] max-w-2xl mx-auto">
            Notre équipe est impatiente de vous aider à créer des moments magiques. 
            N'hésitez pas à nous contacter pour toute question ou projet spécial.
          </p>
        </div>
      </section>
    </div>
  );
}
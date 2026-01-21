import { Handshake, Store, Building2, Heart, ArrowRight, GraduationCap, Award, PartyPopper } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import partnershipImage from '@/assets/bouquet_14.jpeg';

// Import Atelier TIMOUN images
const atelierImages = [
  'WhatsApp Image 2026-01-18 at 4.41.24 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.27 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.27 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.28 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.28 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.29 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.29 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.33 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.33 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.33 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.34 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.34 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.34 PM (3).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.34 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.35 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.35 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.35 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.36 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.36 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.36 PM (3).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.36 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.37 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.37 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.37 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.38 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.38 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.38 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.39 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.39 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.39 PM (3).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.39 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.40 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.40 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.40 PM (3).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.40 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.41 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 4.41.41 PM.jpeg',
].map(name => `/src/assets/atelier zuzuh creation/WhatsApp Unknown 2026-01-18 at 5.22.40 PM/${name}`);

// Import Graduation images
const graduationImages = [
  'WhatsApp Image 2026-01-18 at 5.38.47 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.49 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.50 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.50 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.51 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.52 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.53 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.53 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.54 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.55 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.56 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.56 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.38.57 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.01 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.01 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.02 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.04 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.05 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.06 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.06 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.07 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.08 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.08 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.08 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.11 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.11 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.12 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.12 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.13 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.13 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.14 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.14 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.14 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.15 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.17 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.17 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.18 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.18 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.19 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.20 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.21 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.21 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.22 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.23 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.23 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.39.24 PM.jpeg',
].map(name => `/src/assets/graduation/${name}`);

// Import Journee Recreative images
const journeeRecreativeImages = [
  'WhatsApp Image 2026-01-18 at 5.45.48 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.45.51 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.45.59 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.09 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.10 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.14 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.21 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.26 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.27 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.30 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.38 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.39 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.39 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.42 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.44 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.47 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.47 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.48 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.50 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.46.51 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.00 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.00 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.01 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.04 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.07 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.16 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.26 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.35 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.39 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.40 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.46 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.49 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.49 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.50 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.47.50 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.07 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.08 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.11 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.16 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.18 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.19 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.22 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.28 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.33 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.34 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.34 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.36 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.38 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.48.44 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.49.03 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.49.03 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.49.04 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.49.06 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.49.07 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.49.10 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.49.11 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.49.14 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.49.16 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.49.20 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.49.48 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.09 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.10 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.12 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.17 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.18 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.27 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.27 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.31 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.32 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.32 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.33 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.33 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.33 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.34 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.34 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.35 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.36 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.36 PM (2).jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.36 PM (3).jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.36 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.37 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.37 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.38 PM (1).jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.38 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.43 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.44 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.46 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.49 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.51 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.52 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.55 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.50.58 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.51.01 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.51.03 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.51.05 PM.jpeg',
  'WhatsApp Image 2026-01-18 at 5.51.06 PM.jpeg',
].map(name => `/src/assets/journee recreative/${name}`);

interface CollaborationsPageProps {
  onNavigate: (page: string) => void;
}

export function CollaborationsPage({ onNavigate }: CollaborationsPageProps) {
  const partners = [
    {
      id: 1,
      type: "Boutiques de Luxe",
      icon: Store,
      description: "Partenariat avec des boutiques haut de gamme pour offrir nos créations florales à leur clientèle exclusive",
      examples: ["Boutiques de mode", "Concept stores", "Galeries d'art"]
    },
    {
      id: 2,
      type: "Hôtels & Restaurants",
      icon: Building2,
      description: "Collaboration avec des établissements prestigieux pour leurs décorations florales et événements",
      examples: ["Hôtels 5 étoiles", "Restaurants gastronomiques", "Spas de luxe"]
    },
    {
      id: 3,
      type: "Wedding Planners",
      icon: Heart,
      description: "Partenariat privilégié avec des organisateurs de mariages pour créer des moments inoubliables",
      examples: ["Agences événementielles", "Organisateurs de mariages", "Décorateurs"]
    },
    {
      id: 4,
      type: "Entreprises",
      icon: Building2,
      description: "Services floraux pour les entreprises : décorations de bureaux, cadeaux d'affaires, événements corporate",
      examples: ["Bureaux d'entreprises", "Espaces de coworking", "Salles de réception"]
    }
  ];

  const benefits = [
    {
      title: "Qualité Garantie",
      description: "Des créations florales exceptionnelles qui reflètent l'excellence de votre marque"
    },
    {
      title: "Service Personnalisé",
      description: "Solutions sur mesure adaptées aux besoins spécifiques de votre établissement"
    },
    {
      title: "Livraison Fiable",
      description: "Ponctualité et professionnalisme pour respecter vos exigences"
    },
    {
      title: "Tarifs Préférentiels",
      description: "Conditions avantageuses pour nos partenaires réguliers"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#F48FB1] to-[#E75480] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Handshake className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl mb-4">Nos Collaborations</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Partenariats d'excellence pour partager notre passion des fleurs avec un public plus large
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl text-[#E75480] mb-6">Travaillons Ensemble</h2>
            <p className="text-[#555555] text-lg leading-relaxed">
              ZUZUH CHIC FLOWERS collabore avec des boutiques, institutions et professionnels 
              partageant notre vision de l'excellence et de l'élégance. Nous créons des partenariats 
              durables basés sur la confiance, la qualité et la créativité.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-[#FADADD] rounded-2xl p-6 md:p-8 hover:shadow-xl transition-shadow w-full">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F48FB1] rounded-full flex items-center justify-center mb-4">
                  <partner.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl text-[#E75480] mb-3 break-words">{partner.type}</h3>
                <p className="text-[#555555] mb-4 leading-relaxed text-sm md:text-base break-words">
                  {partner.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-[#555555] font-medium">Exemples de collaboration :</p>
                  <ul className="space-y-1">
                    {partner.examples.map((example, idx) => (
                      <li key={idx} className="text-[#555555] text-sm flex items-center gap-2 break-words">
                        <span className="w-1.5 h-1.5 bg-[#F48FB1] rounded-full flex-shrink-0"></span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-[#FADADD] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#E75480] mb-4">Avantages de Notre Collaboration</h2>
            <p className="text-[#555555] text-lg max-w-2xl mx-auto">
              Ce que vous gagnez en travaillant avec ZUZUH CHIC FLOWERS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-4 md:p-6 text-center shadow-md hover:shadow-lg transition-shadow w-full">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F48FB1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-lg md:text-xl">{index + 1}</span>
                </div>
                <h3 className="text-base md:text-lg text-[#E75480] mb-2 break-words">{benefit.title}</h3>
                <p className="text-[#555555] text-xs md:text-sm break-words">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier TIMOUN Section */}
      <section className="py-16 bg-gradient-to-br from-[#FADADD] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-[#E75480]" />
            <h2 className="text-3xl text-[#E75480] mb-4">Atelier TIMOUN</h2>
            <p className="text-[#555555] text-lg max-w-3xl mx-auto">
              Notre programme de formation et d'initiation à l'art floral. 
              Découvrez en images nos ateliers pratiques où la passion des fleurs se transmet.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 max-w-7xl mx-auto">
            {atelierImages.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow group w-full">
                <ImageWithFallback 
                  src={image}
                  alt={`Atelier TIMOUN - Photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#555555] text-lg mb-6">
              L'Atelier TIMOUN forme la prochaine génération d'artistes floraux avec passion et excellence.
            </p>
            <Button 
              onClick={() => onNavigate('reservation')}
              className="bg-[#E75480] hover:bg-[#F48FB1] text-white px-8 py-6 text-lg"
            >
              En Savoir Plus sur Nos Ateliers
            </Button>
          </div>
        </div>
      </section>

      {/* Graduation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 mx-auto mb-4 text-[#E75480]" />
            <h2 className="text-3xl text-[#E75480] mb-4">Cérémonie de Graduation</h2>
            <p className="text-[#555555] text-lg max-w-3xl mx-auto">
              Célébration de la réussite de nos étudiants de l'Atelier TIMOUN. 
              Un moment inoubliable marquant la fin de leur formation et le début de leur parcours dans l'art floral.
            </p>
          </div>

          {/* Graduation Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 max-w-7xl mx-auto">
            {graduationImages.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow group w-full">
                <ImageWithFallback 
                  src={image}
                  alt={`Graduation - Photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#555555] text-lg mb-6 max-w-2xl mx-auto">
              Félicitations à tous nos diplômés ! Ils sont maintenant prêts à partager leur talent et leur passion pour l'art floral.
            </p>
            <Button 
              onClick={() => onNavigate('reservation')}
              className="bg-[#F48FB1] hover:bg-[#E75480] text-white px-8 py-6 text-lg"
            >
              Rejoindre la Prochaine Promotion
            </Button>
          </div>
        </div>
      </section>

      {/* Journee Recreative Section */}
      <section className="py-16 bg-gradient-to-br from-[#FADADD] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <PartyPopper className="w-16 h-16 mx-auto mb-4 text-[#E75480]" />
            <h2 className="text-3xl text-[#E75480] mb-4">Journée Récréative</h2>
            <p className="text-[#555555] text-lg max-w-3xl mx-auto">
              Après l'effort, le réconfort ! Une journée de détente et de convivialité 
              pour célébrer ensemble la fin de la formation. Des moments de joie, 
              de partage et de créativité dans une ambiance festive.
            </p>
          </div>

          {/* Journee Recreative Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 max-w-7xl mx-auto">
            {journeeRecreativeImages.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow group w-full">
                <ImageWithFallback 
                  src={image}
                  alt={`Journée Récréative - Photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#555555] text-lg mb-6 max-w-2xl mx-auto">
              Des moments inoubliables de camaraderie et de célébration pour nos étudiants et diplômés. 
              Une journée qui renforce les liens et crée des souvenirs précieux.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="relative w-full">
              <ImageWithFallback 
                src={partnershipImage}
                alt="Partnership"
                className="rounded-2xl shadow-2xl w-full h-64 md:h-96 object-cover"
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-3xl text-[#E75480] break-words">Créons Quelque Chose d'Exceptionnel</h2>
              <p className="text-[#555555] text-base md:text-lg leading-relaxed break-words">
                Que vous soyez une boutique élégante, un hôtel de luxe, un restaurant gastronomique 
                ou une entreprise cherchant à embellir ses espaces, ZUZUH CHIC FLOWERS est le 
                partenaire idéal pour apporter une touche florale sophistiquée.
              </p>
              <p className="text-[#555555] text-base md:text-lg leading-relaxed break-words">
                Nous proposons des contrats flexibles, des créations personnalisées et un service 
                dédié pour répondre à vos besoins spécifiques.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-[#555555] text-sm md:text-base">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#F48FB1] flex-shrink-0 mt-1" />
                  <span className="break-words">Consultations personnalisées pour définir vos besoins</span>
                </li>
                <li className="flex items-start gap-3 text-[#555555] text-sm md:text-base">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#F48FB1] flex-shrink-0 mt-1" />
                  <span className="break-words">Créations sur mesure adaptées à votre identité de marque</span>
                </li>
                <li className="flex items-start gap-3 text-[#555555] text-sm md:text-base">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#F48FB1] flex-shrink-0 mt-1" />
                  <span className="break-words">Service régulier ou ponctuel selon vos exigences</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F48FB1] text-white">
        <div className="container mx-auto px-4 text-center">
          <Handshake className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl mb-6">Intéressé par une Collaboration ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons 
            travailler ensemble pour créer quelque chose d'exceptionnel
          </p>
          <Button 
            onClick={() => onNavigate('reservation')}
            className="bg-white hover:bg-gray-100 text-[#E75480] px-10 py-6 text-lg"
          >
            Demander une Proposition de Partenariat
          </Button>
        </div>
      </section>
    </div>
  );
}
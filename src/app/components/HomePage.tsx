import { Heart, Gift, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(244, 143, 177, 0.3), rgba(231, 84, 128, 0.3)), url('https://images.unsplash.com/photo-1676470227531-984346bccb09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBib3VxdWV0JTIwdmFsZW50aW5lc3xlbnwxfHx8fDE3NjgzMzYyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="mb-6 drop-shadow-lg" style={{ fontSize: '3.5rem', fontWeight: 700 }}>
              ZUZUH CHIC FLOWERS
            </h1>
            <p className="mb-8 max-w-2xl mx-auto" style={{ fontSize: '1.5rem' }}>
              L'élégance florale pour vos moments précieux
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('packages')}
                className="px-8 py-4 bg-[#E75480] text-white rounded-lg hover:bg-white hover:text-[#E75480] transition-colors shadow-xl"
              >
                Découvrir nos Packages
              </button>
              <button
                onClick={() => onNavigate('reservation')}
                className="px-8 py-4 bg-white text-[#E75480] rounded-lg hover:bg-[#E75480] hover:text-white transition-colors shadow-xl"
              >
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#FADADD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[#E75480] mb-12" style={{ fontSize: '2.5rem' }}>
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Heart size={48} className="text-[#E75480]" />
              </div>
              <h3 className="text-[#E75480] mb-3">Créations Uniques</h3>
              <p className="text-[#555555]">
                Chaque bouquet est conçu avec passion et attention aux détails pour vos moments spéciaux.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Gift size={48} className="text-[#E75480]" />
              </div>
              <h3 className="text-[#E75480] mb-3">Packages Personnalisés</h3>
              <p className="text-[#555555]">
                Découvrez nos packages exclusifs combinant fleurs et peluches pour des cadeaux inoubliables.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Sparkles size={48} className="text-[#E75480]" />
              </div>
              <h3 className="text-[#E75480] mb-3">Qualité Premium</h3>
              <p className="text-[#555555]">
                Nous sélectionnons les plus belles fleurs fraîches et les peluches de qualité supérieure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[#E75480] mb-12" style={{ fontSize: '2.5rem' }}>
            Nos Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="relative h-96 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => onNavigate('bouquets')}
            >
              <img
                src="https://images.unsplash.com/photo-1657426103794-a5937b9d916c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmxvd2VyJTIwYm91cXVldHxlbnwxfHx8fDE3NjgzMzYyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Bouquets"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#E75480]/80 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 style={{ fontSize: '2rem' }}>Nos Bouquets</h3>
                  <p className="mt-2">Découvrez notre collection exclusive</p>
                </div>
              </div>
            </div>
            <div
              className="relative h-96 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => onNavigate('peluches')}
            >
              <img
                src="https://images.unsplash.com/photo-1560128382-af550cccf1aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWRkeSUyMGJlYXIlMjBwbHVzaCUyMHRveXxlbnwxfHx8fDE3NjgzMzYyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Peluches"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#E75480]/80 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 style={{ fontSize: '2rem' }}>Nos Peluches</h3>
                  <p className="mt-2">Des compagnons doux et adorables</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#E75480] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6" style={{ fontSize: '2.5rem' }}>
            Offre Spéciale Saint-Valentin 2026
          </h2>
          <p className="mb-8" style={{ fontSize: '1.25rem' }}>
            Ne manquez pas nos packages exclusifs pour célébrer l'amour !
          </p>
          <button
            onClick={() => onNavigate('packages')}
            className="px-8 py-4 bg-white text-[#E75480] rounded-lg hover:bg-[#FADADD] transition-colors shadow-xl"
          >
            Voir les Packages
          </button>
        </div>
      </section>
    </div>
  );
}

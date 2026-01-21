import { useState, useEffect } from 'react';
import { Users, Eye, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  accessToken: string;
  userName: string;
}

interface PageView {
  page: string;
  views: number;
}

export function DashboardPage({ onNavigate, accessToken, userName }: DashboardPageProps) {
  const [stats, setStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
  });

  const [topPages, setTopPages] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData = {
      totalVisits: 1234,
      uniqueVisitors: 856,
    };

    const mockTopPages: PageView[] = [
      { page: 'Accueil', views: 450 },
      { page: 'Bouquets', views: 320 },
      { page: 'Packages', views: 215 },
      { page: 'Services', views: 145 },
      { page: 'À Propos', views: 104 },
    ];

    setTimeout(() => {
      setStats(mockData);
      setTopPages(mockTopPages);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('admin')}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">Bienvenue {userName}</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    Visites Totales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-gray-900">
                    {stats.totalVisits.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    Visiteurs Uniques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-gray-900">
                    {stats.uniqueVisitors.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pages populaires */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Pages Populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-white font-bold text-sm">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900">{page.page}</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-700">
                        {page.views.toLocaleString()} vues
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Note */}
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">
                  💡 <strong>Note:</strong> Données de démonstration. Intégrez Google Analytics pour voir vos vraies statistiques.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

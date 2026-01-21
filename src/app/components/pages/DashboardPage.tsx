import { useState, useEffect } from 'react';
import { Activity, Users, Eye, TrendingUp, Calendar, Clock, Globe, Monitor, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  accessToken: string;
  userName: string;
}

interface PageView {
  page: string;
  views: number;
  percentage: number;
}

interface DailyStats {
  date: string;
  visits: number;
  uniqueVisitors: number;
}

export function DashboardPage({ onNavigate, accessToken, userName }: DashboardPageProps) {
  const [stats, setStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    avgSessionDuration: '0m 0s',
    bounceRate: '0%',
  });

  const [topPages, setTopPages] = useState<PageView[]>([]);
  const [recentActivity, setRecentActivity] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données analytics
    // Dans une vraie application, vous intégreriez Google Analytics ou une autre solution
    const mockData = {
      totalVisits: 1234,
      uniqueVisitors: 856,
      avgSessionDuration: '3m 24s',
      bounceRate: '42%',
    };

    const mockTopPages: PageView[] = [
      { page: 'Accueil', views: 450, percentage: 36.5 },
      { page: 'Bouquets', views: 320, percentage: 25.9 },
      { page: 'Packages', views: 215, percentage: 17.4 },
      { page: 'Services', views: 145, percentage: 11.7 },
      { page: 'À Propos', views: 104, percentage: 8.4 },
    ];

    const mockActivity: DailyStats[] = [
      { date: '2026-01-21', visits: 89, uniqueVisitors: 67 },
      { date: '2026-01-20', visits: 102, uniqueVisitors: 78 },
      { date: '2026-01-19', visits: 95, uniqueVisitors: 71 },
      { date: '2026-01-18', visits: 78, uniqueVisitors: 59 },
      { date: '2026-01-17', visits: 112, uniqueVisitors: 85 },
      { date: '2026-01-16', visits: 98, uniqueVisitors: 74 },
      { date: '2026-01-15', visits: 87, uniqueVisitors: 65 },
    ];

    setTimeout(() => {
      setStats(mockData);
      setTopPages(mockTopPages);
      setRecentActivity(mockActivity);
      setLoading(false);
    }, 500);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('admin')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à l'admin
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard Analytique
          </h1>
          <p className="text-gray-600">
            Bienvenue {userName} - Vue d'ensemble du trafic du site web
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Visites Totales
                  </CardTitle>
                  <Eye className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalVisits.toLocaleString()}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
                    +12% ce mois
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Visiteurs Uniques
                  </CardTitle>
                  <Users className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.uniqueVisitors.toLocaleString()}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
                    +8% ce mois
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Durée Moyenne
                  </CardTitle>
                  <Clock className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgSessionDuration}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    Par session
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Taux de Rebond
                  </CardTitle>
                  <Activity className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.bounceRate}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    Visiteurs sortants
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="pages">Pages Populaires</TabsTrigger>
                <TabsTrigger value="realtime">Temps Réel</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Activité des 7 Derniers Jours
                    </CardTitle>
                    <CardDescription>
                      Statistiques quotidiennes des visites
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((day, index) => {
                        const maxVisits = Math.max(...recentActivity.map(d => d.visits));
                        const barWidth = (day.visits / maxVisits) * 100;
                        
                        return (
                          <div key={day.date} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-gray-700">
                                {formatDate(day.date)}
                              </span>
                              <div className="flex gap-4">
                                <span className="text-gray-600">
                                  {day.visits} visites
                                </span>
                                <span className="text-gray-500">
                                  {day.uniqueVisitors} uniques
                                </span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${barWidth}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pages" className="space-y-6">
                {/* Top Pages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Pages les Plus Visitées
                    </CardTitle>
                    <CardDescription>
                      Classement des pages par nombre de vues
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPages.map((page, index) => (
                        <div key={page.page} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-white font-bold text-sm">
                                {index + 1}
                              </span>
                              <span className="font-medium text-gray-900">
                                {page.page}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600 font-medium">
                                {page.views.toLocaleString()} vues
                              </span>
                              <span className="text-sm text-gray-500 min-w-[50px] text-right">
                                {page.percentage}%
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2 ml-11">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${page.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="realtime" className="space-y-6">
                {/* Real-time Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-green-500" />
                      Statistiques en Temps Réel
                    </CardTitle>
                    <CardDescription>
                      Activité actuelle sur le site
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <div className="relative inline-flex items-center justify-center">
                            <div className="absolute w-32 h-32 bg-green-500 rounded-full opacity-20 animate-ping" />
                            <div className="relative flex flex-col items-center justify-center w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full text-white">
                              <span className="text-4xl font-bold">12</span>
                              <span className="text-sm">En ligne</span>
                            </div>
                          </div>
                          <p className="mt-4 text-gray-600">
                            Visiteurs actuellement sur le site
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Vues dans la dernière heure</p>
                          <p className="text-2xl font-bold text-blue-600">45</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Pages vues aujourd'hui</p>
                          <p className="text-2xl font-bold text-purple-600">234</p>
                        </div>
                        <div className="p-4 bg-pink-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Nouveau visiteurs</p>
                          <p className="text-2xl font-bold text-pink-600">18</p>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Note</h4>
                        <p className="text-sm text-gray-600">
                          Pour voir des données en temps réel précises, intégrez Google Analytics ou un service d'analytics similaire. 
                          Cette interface est prête à recevoir les données de votre service d'analytics préféré.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Integration Info */}
            <Card className="mt-6 border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">🔗 Intégration Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Pour tracker le trafic réel de votre site web, vous pouvez intégrer:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Google Analytics</strong> - Solution gratuite et complète</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Plausible Analytics</strong> - Alternative respectueuse de la vie privée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Matomo</strong> - Solution open-source auto-hébergée</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

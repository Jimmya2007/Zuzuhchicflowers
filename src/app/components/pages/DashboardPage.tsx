import { useState, useEffect } from 'react';
import { Users, Eye, ArrowLeft, ShoppingCart, Calendar, DollarSign, TrendingUp, Package, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { projectId, publicAnonKey } from '@/utils/supabase/info';
import { toast } from 'sonner';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  accessToken: string;
  userName: string;
}

interface PageView {
  page: string;
  views: number;
}

interface Order {
  id: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
  items?: any[];
}

interface Reservation {
  id: string;
  customer_name: string;
  product: string;
  status: string;
  created_at: string;
}

interface Visitor {
  id: string;
  page_url: string;
  visit_date: string;
  user_agent: string;
}

export function DashboardPage({ onNavigate, accessToken, userName }: DashboardPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  const stats = {
    totalVisits: visitors.length,
    uniqueVisitors: new Set(visitors.map(v => v.user_agent)).size,
    totalOrders: orders.length,
    totalReservations: reservations.length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.total_amount || 0), 0),
    averageOrderValue: orders.length > 0 ? Math.round(orders.reduce((sum, o) => sum + (o.total_amount || 0), 0) / orders.length) : 0,
    completedSales: orders.filter(o => o.status === 'paid' || o.status === 'completed').length,
    pendingSales: orders.filter(o => o.status === 'pending').length,
  };

  const topPages: PageView[] = (() => {
    const pageCounts: Record<string, number> = {};
    visitors.forEach(v => {
      try {
        const url = new URL(v.page_url);
        const path = url.pathname === '/' ? 'Accueil' : url.pathname.replace('/', '').charAt(0).toUpperCase() + url.pathname.slice(2);
        pageCounts[path] = (pageCounts[path] || 0) + 1;
      } catch {
        pageCounts['Accueil'] = (pageCounts['Accueil'] || 0) + 1;
      }
    });
    return Object.entries(pageCounts)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  })();

  const recentSales = orders.slice(0, 5).map(order => ({
    id: order.id,
    customerName: order.customer_name,
    product: order.items?.map((i: any) => i.name).join(', ') || 'Commande',
    amount: order.total_amount || 0,
    status: order.status as 'completed' | 'pending' | 'cancelled',
    date: order.created_at,
  }));

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersRes, reservationsRes, visitorsRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/rest/v1/orders?order=created_at.desc`, {
          headers: { 'apikey': publicAnonKey, 'Authorization': `Bearer ${publicAnonKey}` }
        }),
        fetch(`https://${projectId}.supabase.co/rest/v1/reservations?order=created_at.desc`, {
          headers: { 'apikey': publicAnonKey, 'Authorization': `Bearer ${publicAnonKey}` }
        }),
        fetch(`https://${projectId}.supabase.co/rest/v1/visitors?order=created_at.desc`, {
          headers: { 'apikey': publicAnonKey, 'Authorization': `Bearer ${publicAnonKey}` }
        })
      ]);

      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setOrders(Array.isArray(data) ? data : []);
      }
      if (reservationsRes.ok) {
        const data = await reservationsRes.json();
        setReservations(Array.isArray(data) ? data : []);
      }
      if (visitorsRes.ok) {
        const data = await visitorsRes.json();
        setVisitors(Array.isArray(data) ? data : []);
      }
      
      toast.success('Données actualisées');
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('admin')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </div>
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
            {/* Stats Row 1 - Traffic */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    Visites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-gray-900">
                    {stats.totalVisits.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Total des visites</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    Visiteurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-gray-900">
                    {stats.uniqueVisitors.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Visiteurs uniques</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-purple-500" />
                    Commandes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-gray-900">
                    {stats.totalOrders}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Commandes totales</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-pink-500" />
                    Réservations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-gray-900">
                    {stats.totalReservations}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Réservations en cours</p>
                </CardContent>
              </Card>
            </div>

            {/* Stats Row 2 - Sales & Revenue */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Revenu Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-700">
                    {stats.totalRevenue.toLocaleString()} Gdes
                  </div>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Ce mois
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Valeur Moyenne
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-blue-700">
                    {stats.averageOrderValue.toLocaleString()} Gdes
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Par commande</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    Ventes Complétées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-700">
                    {stats.completedSales}
                  </div>
                  <p className="text-xs text-purple-600 mt-1">Ventes terminées</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-orange-600" />
                    En Attente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-orange-700">
                    {stats.pendingSales}
                  </div>
                  <p className="text-xs text-orange-600 mt-1">Ventes en cours</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Sales */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Ventes Récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Produit</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentSales.map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell className="font-medium">{sale.customerName}</TableCell>
                          <TableCell>{sale.product}</TableCell>
                          <TableCell className="font-bold text-green-600">
                            {sale.amount.toLocaleString()} Gdes
                          </TableCell>
                          <TableCell>
                            {sale.status === 'completed' && (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                                Complété
                              </Badge>
                            )}
                            {sale.status === 'pending' && (
                              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                                En attente
                              </Badge>
                            )}
                            {sale.status === 'cancelled' && (
                              <Badge className="bg-red-100 text-red-700 hover:bg-red-200">
                                Annulé
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(sale.date).toLocaleDateString('fr-FR')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

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

            {/* Data Source Note */}
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">
                  ✅ <strong>Données en temps réel</strong> depuis votre base de données Supabase.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Heart, TrendingUp, ShoppingCart, Calendar, Users, DollarSign, 
  Package, Eye, LogOut, RefreshCw, Flower2, Star, ArrowUpRight,
  Clock, CheckCircle, XCircle, BarChart3, AlertCircle, Phone, Mail,
  MapPin, Sparkles, Gift, CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { projectId, publicAnonKey } from '@/utils/supabase/info';

interface ValentineDashboardProps {
  onNavigate: (page: string) => void;
  userName?: string;
  onLogout?: () => void;
  accessToken?: string;
}

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address?: string;
  total_amount: number;
  currency: string;
  status: string;
  created_at: string;
  items?: any[];
}

interface Reservation {
  id: string;
  customer_name: string;
  email?: string;
  phone: string;
  product: string;
  price?: number;
  image_url?: string;
  message?: string;
  status: string;
  created_at: string;
}

function ValentineDashboard({ onNavigate, userName = 'Admin', onLogout }: ValentineDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const [lastReservationCount, setLastReservationCount] = useState(0);

  const stats = {
    totalRevenue: orders.reduce((sum, o) => sum + (o.total_amount || 0), 0),
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'paid' || o.status === 'completed').length,
    cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
    totalReservations: reservations.length,
    pendingReservations: reservations.filter(r => r.status === 'pending').length,
    confirmedReservations: reservations.filter(r => r.status === 'confirmed').length,
    todayOrders: orders.filter(o => new Date(o.created_at).toDateString() === new Date().toDateString()).length,
    todayRevenue: orders.filter(o => new Date(o.created_at).toDateString() === new Date().toDateString()).reduce((sum, o) => sum + (o.total_amount || 0), 0),
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadData();
    
    // Auto-refresh every 30 seconds to check for new orders/reservations
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing data...');
      loadData();
    }, 30000); // 30 seconds
    
    return () => clearInterval(refreshInterval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [ordersRes, reservationsRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/rest/v1/orders?order=created_at.desc`, {
          headers: { 'apikey': publicAnonKey, 'Authorization': `Bearer ${publicAnonKey}` }
        }),
        fetch(`https://${projectId}.supabase.co/rest/v1/reservations?order=created_at.desc`, {
          headers: { 'apikey': publicAnonKey, 'Authorization': `Bearer ${publicAnonKey}` }
        })
      ]);
      
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        const newOrders = Array.isArray(ordersData) ? ordersData : [];
        
        // Check for new orders and show notification
        if (lastOrderCount > 0 && newOrders.length > lastOrderCount) {
          const newOrdersCount = newOrders.length - lastOrderCount;
          toast.success(`🎉 ${newOrdersCount} nouvelle(s) commande(s)!`, {
            description: 'Consultez vos commandes ci-dessous',
            duration: 5000,
          });
        }
        
        setOrders(newOrders);
        setLastOrderCount(newOrders.length);
      } else {
        console.warn('Orders fetch failed:', ordersRes.status);
      }
      
      if (reservationsRes.ok) {
        const reservationsData = await reservationsRes.json();
        const newReservations = Array.isArray(reservationsData) ? reservationsData : [];
        
        // Check for new reservations and show notification
        if (lastReservationCount > 0 && newReservations.length > lastReservationCount) {
          const newReservationsCount = newReservations.length - lastReservationCount;
          toast.success(`💝 ${newReservationsCount} nouvelle(s) réservation(s)!`, {
            description: 'Consultez vos réservations ci-dessous',
            duration: 5000,
          });
        }
        
        setReservations(newReservations);
        setLastReservationCount(newReservations.length);
      } else {
        console.warn('Reservations fetch failed:', reservationsRes.status);
      }
      
      toast.success('Données actualisées');
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Impossible de charger les données. Vérifiez votre connexion.');
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/rest/v1/orders?id=eq.${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': publicAnonKey,
            'Authorization': `Bearer ${publicAnonKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({ status: newStatus })
        }
      );
      
      if (response.ok) {
        toast.success('Statut mis à jour avec succès');
        await loadData();
        setSelectedOrder(null);
      } else {
        const errorText = await response.text();
        console.error('Update error:', response.status, errorText);
        toast.error(`Erreur ${response.status}: ${errorText || 'Mise à jour impossible'}`);
      }
    } catch (err) {
      console.error('Connection error:', err);
      toast.error('Erreur de connexion au serveur');
    }
  };

  const updateReservationStatus = async (resId: string, newStatus: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/rest/v1/reservations?id=eq.${resId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': publicAnonKey,
            'Authorization': `Bearer ${publicAnonKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({ status: newStatus })
        }
      );
      
      if (response.ok) {
        toast.success('Statut mis à jour avec succès');
        await loadData();
        setSelectedReservation(null);
      } else {
        const errorText = await response.text();
        console.error('Update error:', response.status, errorText);
        toast.error(`Erreur ${response.status}: ${errorText || 'Mise à jour impossible'}`);
      }
    } catch (err) {
      console.error('Connection error:', err);
      toast.error('Erreur de connexion au serveur');
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      return;
    }
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/rest/v1/orders?id=eq.${orderId}`,
        {
          method: 'DELETE',
          headers: {
            'apikey': publicAnonKey,
            'Authorization': `Bearer ${publicAnonKey}`,
            'Prefer': 'return=minimal'
          }
        }
      );
      
      if (response.ok || response.status === 204) {
        toast.success('Commande supprimée avec succès');
        await loadData();
        setSelectedOrder(null);
      } else {
        const errorText = await response.text();
        console.error('Delete error:', response.status, errorText);
        toast.error(`Erreur ${response.status}: Impossible de supprimer`);
      }
    } catch (err) {
      console.error('Connection error:', err);
      toast.error('Erreur de connexion au serveur');
    }
  };

  const deleteReservation = async (resId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      return;
    }
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/rest/v1/reservations?id=eq.${resId}`,
        {
          method: 'DELETE',
          headers: {
            'apikey': publicAnonKey,
            'Authorization': `Bearer ${publicAnonKey}`,
            'Prefer': 'return=minimal'
          }
        }
      );
      
      if (response.ok || response.status === 204) {
        toast.success('Réservation supprimée avec succès');
        await loadData();
        setSelectedReservation(null);
      } else {
        const errorText = await response.text();
        console.error('Delete error:', response.status, errorText);
        toast.error(`Erreur ${response.status}: Impossible de supprimer`);
      }
    } catch (err) {
      console.error('Connection error:', err);
      toast.error('Erreur de connexion au serveur');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string; label: string; icon: any }> = {
      pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En attente', icon: Clock },
      completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Complété', icon: CheckCircle },
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Confirmé', icon: CheckCircle },
    };
    const { bg, text, label, icon: Icon } = config[status] || config.pending;
    return (
      <Badge className={`${bg} ${text} hover:${bg}`}>
        <Icon className="w-3 h-3 mr-1 inline" />
        {label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart 
            key={i} 
            className="absolute text-pink-200/20 animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + (i % 4) * 25}%`,
              width: `${25 + i * 8}px`,
              height: `${25 + i * 8}px`,
              animationDelay: `${i * 0.3}s`,
              transform: `rotate(${i * 15}deg)`,
            }}
          />
        ))}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-white/50" />
      </div>

      {/* Header */}
      <header className="relative bg-gradient-to-r from-rose-600 via-pink-500 to-purple-600 text-white shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/20 to-transparent" />
        <div className="relative container mx-auto px-6 py-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border border-white/30">
                <Flower2 className="w-9 h-9 text-white drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                  ZUZUH CHIC FLOWERS
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </h1>
                <p className="text-white/80 text-sm flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" />
                  {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} • {currentTime.toLocaleTimeString('fr-FR')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="ghost" className="text-white hover:bg-white/20 border border-white/20" onClick={loadData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20 border border-white/20" onClick={() => onNavigate('home')}>
                <Eye className="w-4 h-4 mr-2" />
                Site
              </Button>
              {onLogout && (
                <Button variant="ghost" className="text-white hover:bg-white/20 border border-white/20" onClick={onLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 md:px-6 py-6">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
            <Button size="sm" variant="outline" className="ml-auto" onClick={loadData}>Réessayer</Button>
          </div>
        )}

        {/* Today's Summary */}
        <div className="mb-6 p-4 bg-gradient-to-r from-rose-500/10 to-purple-500/10 rounded-2xl border border-rose-200/50 backdrop-blur-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Aujourd'hui</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayRevenue.toLocaleString()} <span className="text-sm font-normal text-gray-500">HTG</span></p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-rose-600">{stats.todayOrders}</p>
                <p className="text-xs text-gray-500">Commandes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{stats.pendingReservations}</p>
                <p className="text-xs text-gray-500">En attente</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">{stats.completedOrders}</p>
                <p className="text-xs text-gray-500">Complétées</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 hover:scale-[1.02]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-emerald-100 text-xs font-medium uppercase tracking-wide">Revenu Total</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-emerald-200 text-xs mt-1 flex items-center gap-1">
                    <CreditCard className="w-3 h-3" /> HTG
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 hover:scale-[1.02]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-violet-100 text-xs font-medium uppercase tracking-wide">Commandes</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{stats.totalOrders}</p>
                  <p className="text-violet-200 text-xs mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {stats.completedOrders} complétées
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500 to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 hover:scale-[1.02]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-rose-100 text-xs font-medium uppercase tracking-wide">Réservations</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{stats.totalReservations}</p>
                  <p className="text-rose-200 text-xs mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {stats.pendingReservations} en attente
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 hover:scale-[1.02]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-amber-100 text-xs font-medium uppercase tracking-wide">À Traiter</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{stats.pendingOrders}</p>
                  <p className="text-amber-200 text-xs mt-1 flex items-center gap-1">
                    <Package className="w-3 h-3" /> commandes
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b bg-gradient-to-r from-rose-50 to-pink-50 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
                  <ShoppingCart className="w-5 h-5 text-rose-500" />
                  Commandes
                </CardTitle>
                <Badge className="bg-rose-100 text-rose-700">{orders.length} total</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 max-h-[400px] overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <RefreshCw className="w-10 h-10 text-rose-400 animate-spin mx-auto" />
                    <p className="text-gray-500 mt-3 text-sm">Chargement...</p>
                  </div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                  <p className="font-medium">Aucune commande</p>
                  <p className="text-sm text-gray-400 mt-1">Les commandes apparaîtront ici</p>
                </div>
              ) : (
                <div className="divide-y">
                  {orders.slice(0, 8).map((order) => (
                    <div 
                      key={order.id} 
                      className="p-4 hover:bg-rose-50/70 transition-all cursor-pointer group"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Users className="w-5 h-5 text-rose-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{order.customer_name}</p>
                            <a href={`tel:${order.customer_phone}`} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline">
                              <Phone className="w-3 h-3" /> {order.customer_phone}
                            </a>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-600 text-lg">{order.total_amount?.toLocaleString()} <span className="text-xs">HTG</span></p>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDate(order.created_at)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Reservations */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-violet-50 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  Réservations
                </CardTitle>
                <Badge className="bg-purple-100 text-purple-700">{reservations.length} total</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 max-h-[400px] overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <RefreshCw className="w-10 h-10 text-purple-400 animate-spin mx-auto" />
                    <p className="text-gray-500 mt-3 text-sm">Chargement...</p>
                  </div>
                </div>
              ) : reservations.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                  <p className="font-medium">Aucune réservation</p>
                  <p className="text-sm text-gray-400 mt-1">Les réservations apparaîtront ici</p>
                </div>
              ) : (
                <div className="divide-y">
                  {reservations.slice(0, 8).map((res) => (
                    <div 
                      key={res.id} 
                      className="p-4 hover:bg-purple-50/70 transition-all cursor-pointer group"
                      onClick={() => setSelectedReservation(res)}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1">
                          {res.image_url ? (
                            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-purple-200 flex-shrink-0">
                              <img 
                                src={res.image_url} 
                                alt="Produit" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center"><svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Heart className="w-8 h-8 text-purple-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{res.customer_name}</p>
                            <a href={`tel:${res.phone}`} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline">
                              <Phone className="w-3 h-3" /> {res.phone}
                            </a>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm text-gray-700 font-medium mb-1">{res.product}</p>
                          {res.price && <p className="text-xs text-green-600 font-semibold">{res.price.toLocaleString()} Gdes</p>}
                          {getStatusBadge(res.status)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDate(res.created_at)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-xl h-16 text-lg font-semibold"
            onClick={() => onNavigate('dashboard')}
          >
            <BarChart3 className="w-6 h-6 mr-3" />
            Statistiques Détaillées
          </Button>
          <Button 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl h-16 text-lg font-semibold"
            onClick={() => onNavigate('home')}
          >
            <Eye className="w-6 h-6 mr-3" />
            Voir la Boutique
          </Button>
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b bg-gradient-to-r from-rose-50 to-pink-50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-rose-500" />
                  Détails Commande
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                  <Users className="w-7 h-7 text-rose-600" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-900">{selectedOrder.customer_name}</p>
                  <a href={`tel:${selectedOrder.customer_phone}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm hover:underline">
                    <Phone className="w-4 h-4" /> {selectedOrder.customer_phone}
                  </a>
                </div>
              </div>
              
              {selectedOrder.customer_email && (
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Mail className="w-4 h-4" /> {selectedOrder.customer_email}
                </div>
              )}
              
              {selectedOrder.customer_address && (
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <MapPin className="w-4 h-4" /> {selectedOrder.customer_address}
                </div>
              )}
              
              <div className="bg-emerald-50 p-4 rounded-xl">
                <p className="text-sm text-emerald-600 font-medium">Montant Total</p>
                <p className="text-3xl font-bold text-emerald-700">{selectedOrder.total_amount?.toLocaleString()} HTG</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Statut actuel:</span>
                {getStatusBadge(selectedOrder.status)}
              </div>
              
              <div className="text-sm text-gray-500">
                <Clock className="w-4 h-4 inline mr-1" />
                Créée le {formatDate(selectedOrder.created_at)}
              </div>
              
              <div className="pt-4 border-t flex gap-2 flex-wrap">
                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600" onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}>
                  <CheckCircle className="w-4 h-4 mr-1" /> Marquer Payé
                </Button>
                <Button size="sm" variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-50" onClick={() => updateOrderStatus(selectedOrder.id, 'pending')}>
                  <Clock className="w-4 h-4 mr-1" /> En Attente
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => deleteOrder(selectedOrder.id)}>
                  <XCircle className="w-4 h-4 mr-1" /> Supprimer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Detail Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedReservation(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-violet-50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  Détails Réservation
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedReservation(null)}>
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center">
                  <Heart className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-900">{selectedReservation.customer_name}</p>
                  <a href={`tel:${selectedReservation.phone}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm hover:underline">
                    <Phone className="w-4 h-4" /> {selectedReservation.phone}
                  </a>
                </div>
              </div>
              
              {selectedReservation.email && (
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Mail className="w-4 h-4" /> {selectedReservation.email}
                </div>
              )}
              
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-sm text-purple-600 font-medium">Produit</p>
                <p className="text-xl font-bold text-purple-700">{selectedReservation.product}</p>
                {selectedReservation.price && (
                  <p className="text-lg text-green-600 font-semibold mt-2">
                    Prix: {selectedReservation.price.toLocaleString()} Gdes
                  </p>
                )}
              </div>
              
              {selectedReservation.image_url && (
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-purple-700 font-bold uppercase tracking-wide">📸 Photo du Produit Demandé</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-lg">
                    <img 
                      src={selectedReservation.image_url} 
                      alt="Produit demandé" 
                      className="w-full h-auto rounded-md max-h-[500px] object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4=';
                      }}
                    />
                  </div>
                  <p className="text-xs text-purple-600 mt-3 text-center italic">
                    Cliquez sur l'image pour l'agrandir dans un nouvel onglet
                  </p>
                  <a 
                    href={selectedReservation.image_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block mt-2 text-center text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    🔍 Ouvrir l'image en grand
                  </a>
                </div>
              )}
              
              {selectedReservation.message && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 font-medium mb-1">Message</p>
                  <p className="text-gray-800">{selectedReservation.message}</p>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Statut actuel:</span>
                {getStatusBadge(selectedReservation.status)}
              </div>
              
              <div className="text-sm text-gray-500">
                <Clock className="w-4 h-4 inline mr-1" />
                Créée le {formatDate(selectedReservation.created_at)}
              </div>
              
              <div className="pt-4 border-t flex gap-2 flex-wrap">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => updateReservationStatus(selectedReservation.id, 'confirmed')}>
                  <CheckCircle className="w-4 h-4 mr-1" /> Confirmer
                </Button>
                <Button size="sm" variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50" onClick={() => updateReservationStatus(selectedReservation.id, 'pending')}>
                  <Clock className="w-4 h-4 mr-1" /> En Attente
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => deleteReservation(selectedReservation.id)}>
                  <XCircle className="w-4 h-4 mr-1" /> Supprimer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative mt-8 py-6 text-center text-gray-400 text-sm border-t border-gray-200/50 bg-white/30">
        <p className="flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" /> by ZUZUH CHIC FLOWERS • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default ValentineDashboard;

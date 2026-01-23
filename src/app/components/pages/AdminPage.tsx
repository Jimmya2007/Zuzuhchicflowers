import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, LogOut, Package, Image as ImageIcon, DollarSign, FileText, Tag, Layers, BarChart3, TrendingUp, ShoppingCart, Calendar, Users, Heart, Eye, X, Phone, Mail, MapPin, MessageSquare, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { projectId, publicAnonKey } from '@/utils/supabase/info';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  features: string[];
  page: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Reservation {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
  reservation_date: string;
  reservation_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address?: string;
  delivery_notes?: string;
  total_amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  payment_method: string;
  items: any[];
  created_at: string;
}

interface AdminPageProps {
  onNavigate: (page: string) => void;
  accessToken: string;
  userName: string;
  onLogout: () => void;
}

export function AdminPage({ onNavigate, accessToken, userName, onLogout }: AdminPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [reservationsLoading, setReservationsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState('reservations');
  
  // Dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    totalSales: 127,
    totalRevenue: 1847500, // HTG
    totalReservations: 89,
    pendingReservations: 12,
    completedSales: 115,
    averageOrderValue: 14547,
    monthlyGrowth: 23.5,
    topProduct: 'Package Romance',
  });
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    features: '',
    page: 'bouquets',
  });

  const pageOptions = [
    { value: 'bouquets', label: 'Nos Bouquets' },
    { value: 'peluches', label: 'Nos Peluches' },
    { value: 'packages', label: 'Packages' },
    { value: 'home', label: 'Page d\'accueil' },
  ];

  useEffect(() => {
    loadProducts();
    loadReservations();
    loadOrders();
  }, []);

  const loadReservations = async () => {
    setReservationsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/rest/v1/reservations?order=created_at.desc`,
        {
          headers: {
            'apikey': publicAnonKey,
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReservations(data || []);
        // Update stats
        const pending = data.filter((r: Reservation) => r.status === 'pending').length;
        setDashboardStats(prev => ({
          ...prev,
          totalReservations: data.length,
          pendingReservations: pending,
        }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des réservations:', error);
    } finally {
      setReservationsLoading(false);
    }
  };

  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/rest/v1/orders?order=created_at.desc`,
        {
          headers: {
            'apikey': publicAnonKey,
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrders(data || []);
        // Update stats
        const totalRevenue = data.reduce((sum: number, o: Order) => sum + (o.total_amount || 0), 0);
        const completed = data.filter((o: Order) => o.status === 'paid' || o.status === 'completed').length;
        setDashboardStats(prev => ({
          ...prev,
          totalSales: data.length,
          totalRevenue: totalRevenue,
          completedSales: completed,
        }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/rest/v1/reservations?id=eq.${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': publicAnonKey,
            'Authorization': `Bearer ${publicAnonKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({ status })
        }
      );

      if (response.ok) {
        toast.success('Statut mis à jour');
        loadReservations();
        setSelectedReservation(null);
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de connexion');
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/rest/v1/orders?id=eq.${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': publicAnonKey,
            'Authorization': `Bearer ${publicAnonKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({ status })
        }
      );

      if (response.ok) {
        toast.success('Statut mis à jour');
        loadOrders();
        setSelectedOrder(null);
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de connexion');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { className: string; label: string }> = {
      pending: { className: 'bg-yellow-100 text-yellow-800', label: 'En attente' },
      confirmed: { className: 'bg-blue-100 text-blue-800', label: 'Confirmé' },
      paid: { className: 'bg-green-100 text-green-800', label: 'Payé' },
      completed: { className: 'bg-green-100 text-green-800', label: 'Complété' },
      cancelled: { className: 'bg-red-100 text-red-800', label: 'Annulé' },
    };
    const config = statusConfig[status] || { className: 'bg-gray-100 text-gray-800', label: status };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-554e7d35/products`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setProducts(data.products || []);
      } else {
        console.error('Erreur lors du chargement des produits:', data.error);
        toast.error('Erreur lors du chargement des produits');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      toast.error('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim()),
    };

    try {
      const url = editingProduct
        ? `https://${projectId}.supabase.co/functions/v1/make-server-554e7d35/products/${editingProduct.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-554e7d35/products`;

      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Erreur lors de l\'enregistrement');
        return;
      }

      toast.success(editingProduct ? 'Produit modifié avec succès' : 'Produit créé avec succès');
      setIsDialogOpen(false);
      resetForm();
      loadProducts();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de connexion au serveur');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-554e7d35/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Erreur lors de la suppression');
        return;
      }

      toast.success('Produit supprimé avec succès');
      loadProducts();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de connexion au serveur');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
      features: product.features.join('\n'),
      page: product.page,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      features: '',
      page: 'bouquets',
    });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F48FB1] to-[#E75480] text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">Administration ZUZUH CHIC FLOWERS</h1>
              <p className="text-white/90">Bienvenue, {userName}</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                onClick={() => onNavigate('valentine-dashboard')}
              >
                <Heart className="w-4 h-4 mr-2" />
                Valentine Dashboard
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                onClick={() => onNavigate('dashboard')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                onClick={() => onNavigate('home')}
              >
                Voir le site
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="reservations" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Réservations ({reservations.length})
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Commandes ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Produits ({products.length})
            </TabsTrigger>
          </TabsList>

          {/* RESERVATIONS TAB */}
          <TabsContent value="reservations">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#E75480]" />
                      Réservations
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Cliquez sur une réservation pour voir tous les détails
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {reservations.filter(r => r.status === 'pending').length} en attente
                    </Badge>
                    <Button variant="outline" onClick={loadReservations}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Actualiser
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {reservationsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E75480] mx-auto"></div>
                    <p className="text-gray-500 mt-2">Chargement des réservations...</p>
                  </div>
                ) : reservations.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">Aucune réservation pour le moment</p>
                    <p className="text-gray-400 text-sm mt-2">Les réservations du formulaire apparaîtront ici</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reservations.map((reservation) => (
                      <div 
                        key={reservation.id} 
                        className={`border-2 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer bg-white hover:border-[#E75480] ${
                          reservation.status === 'pending' ? 'border-yellow-300 bg-yellow-50/30' : 
                          reservation.status === 'confirmed' ? 'border-blue-300 bg-blue-50/30' :
                          reservation.status === 'completed' ? 'border-green-300 bg-green-50/30' :
                          'border-gray-200'
                        }`}
                        onClick={() => setSelectedReservation(reservation)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                              reservation.status === 'pending' ? 'bg-yellow-100' : 
                              reservation.status === 'confirmed' ? 'bg-blue-100' :
                              reservation.status === 'completed' ? 'bg-green-100' :
                              'bg-gray-100'
                            }`}>
                              <Users className={`w-7 h-7 ${
                                reservation.status === 'pending' ? 'text-yellow-600' : 
                                reservation.status === 'confirmed' ? 'text-blue-600' :
                                reservation.status === 'completed' ? 'text-green-600' :
                                'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-gray-900 text-lg">{reservation.customer_name}</h4>
                                {getStatusBadge(reservation.status)}
                              </div>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Phone className="w-4 h-4 text-green-500" />
                                  {reservation.phone}
                                </span>
                                {reservation.email && (
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-4 h-4 text-blue-500" />
                                    {reservation.email}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(reservation.created_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(reservation.created_at).toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        {reservation.message && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600 line-clamp-2 bg-gray-50 p-2 rounded-lg">
                              <MessageSquare className="w-4 h-4 inline mr-1 text-gray-400" />
                              {reservation.message}
                            </p>
                          </div>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-gray-400">Cliquez pour voir les détails</span>
                          <Eye className="w-4 h-4 text-[#E75480]" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ORDERS TAB */}
          <TabsContent value="orders">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-green-600" />
                      Commandes MonCash
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Gérez les commandes payées via MonCash
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={loadOrders}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Actualiser
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Chargement...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">Aucune commande pour le moment</p>
                    <p className="text-gray-400 text-sm mt-2">Les commandes MonCash apparaîtront ici</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div 
                        key={order.id} 
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                              <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{order.customer_name}</h4>
                              <p className="text-sm text-gray-500">{order.customer_phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">
                                {order.total_amount?.toLocaleString()} {order.currency || 'HTG'}
                              </p>
                              {getStatusBadge(order.status)}
                            </div>
                            {order.status !== 'paid' && order.status !== 'completed' && (
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id, 'paid');
                                }}
                              >
                                💰 Payé
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t flex justify-between items-center">
                          <p className="text-sm text-gray-600">
                            {order.items?.length || 0} article(s)
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-400">
                              {new Date(order.created_at).toLocaleDateString('fr-FR')}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => setSelectedOrder(order)}
                            >
                              Voir détails
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* PRODUCTS TAB */}
          <TabsContent value="products">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription>Total Produits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#E75480]">{products.length}</div>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription>Bouquets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#E75480]">
                    {products.filter(p => p.page === 'bouquets').length}
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription>Peluches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#E75480]">
                    {products.filter(p => p.page === 'peluches').length}
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription>Packages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#E75480]">
                    {products.filter(p => p.page === 'packages').length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Table */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Catalogue des Produits
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Gérez tous vos produits depuis cette interface
                    </CardDescription>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                    <DialogTrigger asChild>
                      <Button 
                        className="bg-[#E75480] hover:bg-[#d43d6a]"
                        onClick={() => {
                          resetForm();
                          setIsDialogOpen(true);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau Produit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                    </DialogTitle>
                    <DialogDescription>
                      Remplissez les informations du produit ci-dessous
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Nom du produit
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Roses Rouges Passion"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="flex items-center gap-2">
                          <Layers className="w-4 h-4" />
                          Catégorie
                        </Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="Ex: Classique, Premium"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price" className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Prix
                        </Label>
                        <Input
                          id="price"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="Ex: 49,99€"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="page" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Page d'affichage
                      </Label>
                      <Select 
                        value={formData.page} 
                        onValueChange={(value) => setFormData({ ...formData, page: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une page" />
                        </SelectTrigger>
                        <SelectContent>
                          {pageOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Décrivez votre produit..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image" className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        URL de l'image
                      </Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://exemple.com/image.jpg"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Conseil: Uploadez votre image sur un service comme Imgur ou utilisez une URL d'image existante
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="features">
                        Caractéristiques (une par ligne)
                      </Label>
                      <Textarea
                        id="features"
                        value={formData.features}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        placeholder="24 roses&#10;Fraîcheur garantie&#10;Emballage élégant"
                        rows={4}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={handleDialogClose}>
                        Annuler
                      </Button>
                      <Button type="submit" className="bg-[#E75480] hover:bg-[#d43d6a]">
                        {editingProduct ? 'Modifier' : 'Créer'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Chargement des produits...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500 mb-4">Aucun produit pour le moment</p>
                <p className="text-sm text-gray-400">Cliquez sur "Nouveau Produit" pour commencer</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Page</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=No+Image';
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-[#FADADD]">
                            {pageOptions.find(p => p.value === product.page)?.label || product.page}
                          </Badge>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="font-semibold text-[#E75480]">{product.price}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>

        {/* RESERVATION DETAIL MODAL - SHOPIFY STYLE */}
        {selectedReservation && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setSelectedReservation(null)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-[#E75480] to-[#F48FB1] p-6 text-white rounded-t-2xl sticky top-0 z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                        <Calendar className="w-7 h-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Fiche Réservation</h2>
                        <p className="text-sm opacity-90 font-mono">ID: {selectedReservation.id.slice(0, 8).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(selectedReservation.status)}
                      <button 
                        onClick={() => setSelectedReservation(null)} 
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  
                  {/* Quick Summary Bar */}
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 flex items-center justify-between">
                    <div className="text-center flex-1 border-r border-pink-200">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Date de création</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedReservation.created_at).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="text-center flex-1 border-r border-pink-200">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Heure</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedReservation.created_at).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Statut actuel</p>
                      <p className="font-semibold text-gray-900">
                        {selectedReservation.status === 'pending' && '⏳ En attente'}
                        {selectedReservation.status === 'confirmed' && '✅ Confirmé'}
                        {selectedReservation.status === 'completed' && '🎉 Complété'}
                        {selectedReservation.status === 'cancelled' && '❌ Annulé'}
                      </p>
                    </div>
                  </div>

                  {/* Customer Information Card */}
                  <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#E75480]" />
                        Informations du Client
                      </h3>
                    </div>
                    <div className="p-4 space-y-4">
                      {/* Name */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[#E75480]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Nom Complet</p>
                          <p className="text-lg font-semibold text-gray-900">{selectedReservation.customer_name}</p>
                        </div>
                      </div>
                      
                      {/* Phone */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Téléphone</p>
                          <a 
                            href={`tel:${selectedReservation.phone}`} 
                            className="text-lg font-semibold text-green-600 hover:underline"
                          >
                            {selectedReservation.phone}
                          </a>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-green-200 text-green-600 hover:bg-green-50"
                          onClick={() => window.open(`tel:${selectedReservation.phone}`, '_blank')}
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Email */}
                      {selectedReservation.email && (
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                            <a 
                              href={`mailto:${selectedReservation.email}`} 
                              className="text-lg font-semibold text-blue-600 hover:underline break-all"
                            >
                              {selectedReservation.email}
                            </a>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-blue-200 text-blue-600 hover:bg-blue-50"
                            onClick={() => window.open(`mailto:${selectedReservation.email}`, '_blank')}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message & Address Card */}
                  <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-[#E75480]" />
                        Message & Détails de la Commande
                      </h3>
                    </div>
                    <div className="p-4">
                      {selectedReservation.message ? (
                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#E75480]">
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {selectedReservation.message}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-400 italic text-center py-4">Aucun message</p>
                      )}
                    </div>
                  </div>

                  {/* Date & Time Details */}
                  {(selectedReservation.reservation_date || selectedReservation.reservation_time) && (
                    <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-gray-50 px-4 py-3 border-b">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-[#E75480]" />
                          Date & Heure Souhaitées
                        </h3>
                      </div>
                      <div className="p-4 flex gap-4">
                        {selectedReservation.reservation_date && (
                          <div className="flex-1 bg-purple-50 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                            <p className="text-lg font-semibold text-purple-700">
                              {new Date(selectedReservation.reservation_date).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        )}
                        {selectedReservation.reservation_time && (
                          <div className="flex-1 bg-blue-50 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Heure</p>
                            <p className="text-lg font-semibold text-blue-700">
                              {selectedReservation.reservation_time}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Status Management */}
                  <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-[#E75480]" />
                        Gestion du Statut
                      </h3>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-3">Cliquez sur un statut pour mettre à jour cette réservation:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button 
                          variant={selectedReservation.status === 'pending' ? 'default' : 'outline'}
                          className={`flex flex-col items-center py-4 h-auto ${
                            selectedReservation.status === 'pending' 
                              ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                              : 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100'
                          }`}
                          onClick={() => updateReservationStatus(selectedReservation.id, 'pending')}
                        >
                          <span className="text-2xl mb-1">⏳</span>
                          <span className="text-xs">En attente</span>
                        </Button>
                        <Button 
                          variant={selectedReservation.status === 'confirmed' ? 'default' : 'outline'}
                          className={`flex flex-col items-center py-4 h-auto ${
                            selectedReservation.status === 'confirmed' 
                              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                              : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                          }`}
                          onClick={() => updateReservationStatus(selectedReservation.id, 'confirmed')}
                        >
                          <span className="text-2xl mb-1">✅</span>
                          <span className="text-xs">Confirmé</span>
                        </Button>
                        <Button 
                          variant={selectedReservation.status === 'completed' ? 'default' : 'outline'}
                          className={`flex flex-col items-center py-4 h-auto ${
                            selectedReservation.status === 'completed' 
                              ? 'bg-green-500 hover:bg-green-600 text-white' 
                              : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                          }`}
                          onClick={() => updateReservationStatus(selectedReservation.id, 'completed')}
                        >
                          <span className="text-2xl mb-1">🎉</span>
                          <span className="text-xs">Complété</span>
                        </Button>
                        <Button 
                          variant={selectedReservation.status === 'cancelled' ? 'default' : 'outline'}
                          className={`flex flex-col items-center py-4 h-auto ${
                            selectedReservation.status === 'cancelled' 
                              ? 'bg-red-500 hover:bg-red-600 text-white' 
                              : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                          }`}
                          onClick={() => updateReservationStatus(selectedReservation.id, 'cancelled')}
                        >
                          <span className="text-2xl mb-1">❌</span>
                          <span className="text-xs">Annulé</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-center">Actions Rapides</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white py-6 text-base"
                        onClick={() => window.open(`https://wa.me/${selectedReservation.phone?.replace(/\D/g, '')}?text=Bonjour ${selectedReservation.customer_name}, nous avons bien reçu votre réservation chez Zuzuh Chic Flowers! 🌸`, '_blank')}
                      >
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                      </Button>
                      <Button 
                        variant="outline" 
                        className="py-6 text-base border-2"
                        onClick={() => window.open(`tel:${selectedReservation.phone}`, '_blank')}
                      >
                        <Phone className="w-6 h-6 mr-2" />
                        Appeler
                      </Button>
                    </div>
                    {selectedReservation.email && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-3 py-4 border-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => window.open(`mailto:${selectedReservation.email}?subject=Votre réservation Zuzuh Chic Flowers&body=Bonjour ${selectedReservation.customer_name},%0A%0ANous avons bien reçu votre réservation.%0A%0ACordialement,%0AZuzuh Chic Flowers`, '_blank')}
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Envoyer un Email
                      </Button>
                    )}
                  </div>

                  {/* Footer Info */}
                  <div className="text-center text-xs text-gray-400 pt-2">
                    <p>Réservation créée le {new Date(selectedReservation.created_at).toLocaleString('fr-FR')}</p>
                    <p className="font-mono mt-1">ID: {selectedReservation.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ORDER DETAIL MODAL */}
        {selectedOrder && (
          <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setSelectedOrder(null)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Détails de la Commande</h2>
                        <p className="text-sm opacity-90">#{selectedOrder.id.slice(0, 8)}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/20 rounded-full">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Amount & Status */}
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Montant Total</p>
                    <p className="text-4xl font-bold text-green-600">
                      {selectedOrder.total_amount?.toLocaleString()} {selectedOrder.currency || 'HTG'}
                    </p>
                    <div className="mt-3">{getStatusBadge(selectedOrder.status)}</div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-3">Informations Client</h3>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{selectedOrder.customer_name}</span>
                    </div>
                    {selectedOrder.customer_phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <a href={`tel:${selectedOrder.customer_phone}`} className="text-green-600 hover:underline">
                          {selectedOrder.customer_phone}
                        </a>
                      </div>
                    )}
                    {selectedOrder.customer_email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <a href={`mailto:${selectedOrder.customer_email}`} className="text-green-600 hover:underline">
                          {selectedOrder.customer_email}
                        </a>
                      </div>
                    )}
                    {selectedOrder.customer_address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <span className="text-gray-700">{selectedOrder.customer_address}</span>
                      </div>
                    )}
                  </div>

                  {/* Delivery Notes */}
                  {selectedOrder.delivery_notes && (
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-yellow-600" />
                        Notes de Livraison
                      </h3>
                      <p className="text-gray-700">{selectedOrder.delivery_notes}</p>
                    </div>
                  )}

                  {/* Items */}
                  {selectedOrder.items && selectedOrder.items.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Articles Commandés</h3>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item: any, index: number) => (
                          <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg">
                            {item.image && (
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Qté: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-green-600">
                              {item.price} {item.currency || 'HTG'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Date Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Commandé le: {new Date(selectedOrder.created_at).toLocaleString('fr-FR')}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Méthode de paiement: {selectedOrder.payment_method || 'MonCash'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Changer le statut</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'pending')}
                      >
                        En attente
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'paid')}
                      >
                        Payé
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complété
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Annuler
                      </Button>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  {selectedOrder.customer_phone && (
                    <div className="flex gap-3 pt-4 border-t">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => window.open(`https://wa.me/${selectedOrder.customer_phone?.replace(/\D/g, '')}`, '_blank')}
                      >
                        WhatsApp
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => window.open(`tel:${selectedOrder.customer_phone}`, '_blank')}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Appeler
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, LogOut, Package, Image as ImageIcon, DollarSign, FileText, Tag, Layers, BarChart3 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { projectId, publicAnonKey } from '/utils/supabase/info';
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

interface AdminPageProps {
  onNavigate: (page: string) => void;
  accessToken: string;
  userName: string;
  onLogout: () => void;
}

export function AdminPage({ onNavigate, accessToken, userName, onLogout }: AdminPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
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
  }, []);

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
    <div className="min-h-screen bg-gray-50">
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Produits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#E75480]">{products.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Bouquets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#E75480]">
                {products.filter(p => p.page === 'bouquets').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Peluches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#E75480]">
                {products.filter(p => p.page === 'peluches').length}
              </div>
            </CardContent>
          </Card>
          <Card>
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
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Gestion des Produits
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
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Heart, Upload, CheckCircle, Camera } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { projectId, publicAnonKey } from '@/utils/supabase/info';

interface ReservationPageProps {
  onNavigate: (page: string) => void;
}

export function ReservationPage({ onNavigate }: ReservationPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    product: '',
    price: '',
    message: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('📤 Submitting reservation directly to Supabase...');
      
      // Save reservation directly to Supabase REST API
      const response = await fetch(
        `https://${projectId}.supabase.co/rest/v1/reservations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': publicAnonKey,
            'Authorization': `Bearer ${publicAnonKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            customer_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            product: formData.product || 'Non spécifié',
            price: formData.price ? parseFloat(formData.price) : null,
            message: `${formData.message}\n\nAdresse: ${formData.address}`,
            reservation_date: new Date().toISOString().split('T')[0],
            reservation_time: new Date().toTimeString().split(' ')[0],
            status: 'pending'
          })
        }
      );

      console.log('📊 Response status:', response.status);
      
      if (response.ok || response.status === 201) {
        const data = await response.json();
        console.log('✅ Reservation saved successfully!', data);
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            fullName: '',
            address: '',
            phone: '',
            email: '',
            product: '',
            price: '',
            message: ''
          });
          setImageFile(null);
          setImagePreview(null);
        }, 3000);
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to save reservation. Status:', response.status, 'Error:', errorText);
        alert(`Erreur ${response.status}: ${errorText}\n\nVeuillez vérifier que tous les champs sont remplis.`);
      }
    } catch (error) {
      console.error('❌ Error submitting reservation:', error);
      alert(`Erreur réseau: ${error}\n\nVérifiez votre connexion Internet.`);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FADADD] to-white">
        <div className="text-center p-12 bg-white rounded-2xl shadow-2xl max-w-md mx-4">
          <CheckCircle className="w-20 h-20 text-[#E75480] mx-auto mb-6" />
          <h2 className="text-3xl text-[#E75480] mb-4">Réservation Envoyée !</h2>
          <p className="text-[#555555] text-lg mb-6">
            Merci pour votre réservation. Notre équipe vous contactera très bientôt.
          </p>
          <Heart className="w-12 h-12 text-[#F48FB1] mx-auto animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#F48FB1] to-[#E75480] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl mb-4">Formulaire de Réservation</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Remplissez ce formulaire avec la capture d'écran du produit de votre choix
          </p>
        </div>
      </section>

      {/* Instructions Banner */}
      <section className="bg-[#FADADD] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Camera className="w-8 h-8 text-[#E75480] flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-lg text-[#E75480]">Comment ça marche ?</h3>
                <ol className="list-decimal list-inside space-y-2 text-[#555555]">
                  <li>Parcourez nos pages Packages, Peluches ou Bouquets</li>
                  <li>Prenez une capture d'écran du produit qui vous intéresse</li>
                  <li>Remplissez ce formulaire et téléversez votre capture d'écran</li>
                  <li>Notre équipe vous contactera pour finaliser votre commande</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#555555]">
                Nom Complet *
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border-[#F48FB1] focus:ring-[#E75480]"
                placeholder="Entrez votre nom complet"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-[#555555]">
                Adresse Complète *
              </Label>
              <Textarea
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border-[#F48FB1] focus:ring-[#E75480] min-h-[80px]"
                placeholder="Rue, ville, code postal..."
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#555555]">
                Numéro de Téléphone *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border-[#F48FB1] focus:ring-[#E75480]"
                placeholder="+509 3XXX XXXX (Haïti/RD/USA/France/Canada)"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#555555]">
                Adresse Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border-[#F48FB1] focus:ring-[#E75480]"
                placeholder="votre.email@exemple.com"
              />
            </div>

            {/* Product */}
            <div className="space-y-2">
              <Label htmlFor="product" className="text-[#555555]">
                Produit Désiré *
              </Label>
              <Input
                id="product"
                name="product"
                type="text"
                required
                value={formData.product}
                onChange={handleInputChange}
                className="w-full border-[#F48FB1] focus:ring-[#E75480]"
                placeholder="Ex: Romance Passion, Bouquet de Roses Rouges, Peluche Ours..."
              />
              <p className="text-sm text-[#555555] mt-1">
                💡 Astuce: Indiquez le nom exact du produit que vous avez vu sur notre site
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-[#555555]">
                Prix (Gdes) *
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border-[#F48FB1] focus:ring-[#E75480]"
                placeholder="Ex: 5000, 7250..."
              />
              <p className="text-sm text-[#555555] mt-1">
                💡 Indiquez le prix du produit en Gourdes (Gdes)
              </p>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#555555]">
                Message / Demandes Spéciales (Optionnel)
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full border-[#F48FB1] focus:ring-[#E75480] min-h-[100px]"
                placeholder="Ajoutez des détails sur votre commande, date de livraison souhaitée, message personnalisé..."
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="productImage" className="text-[#555555]">
                Capture d'Écran du Produit *
              </Label>
              <div className="border-2 border-dashed border-[#F48FB1] rounded-lg p-8 text-center hover:border-[#E75480] transition-colors">
                <input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="productImage" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-[#E75480]">Cliquez pour changer l'image</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 text-[#F48FB1] mx-auto" />
                      <div>
                        <p className="text-[#E75480] mb-1">
                          Cliquez pour téléverser votre capture d'écran
                        </p>
                        <p className="text-sm text-[#555555]">
                          JPG, PNG, ou JPEG (max 10MB)
                        </p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit"
                className="w-full bg-[#E75480] hover:bg-[#d64575] text-white py-6 text-lg"
              >
                <Heart className="w-5 h-5 mr-2" />
                Envoyer ma Réservation
              </Button>
            </div>

            <p className="text-sm text-[#555555] text-center pt-4">
              * Champs obligatoires. Vos informations sont confidentielles et utilisées uniquement 
              pour traiter votre commande.
            </p>
          </form>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gradient-to-br from-[#FADADD] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-2xl text-[#E75480]">Que se Passe-t-il Ensuite ?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-10 h-10 bg-[#F48FB1] rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                  1
                </div>
                <p className="text-[#555555] text-sm">
                  Nous recevons votre réservation et votre capture d'écran
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-10 h-10 bg-[#F48FB1] rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                  2
                </div>
                <p className="text-[#555555] text-sm">
                  Notre équipe vous contacte sous 24h pour confirmer les détails
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-10 h-10 bg-[#F48FB1] rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                  3
                </div>
                <p className="text-[#555555] text-sm">
                  Nous préparons votre commande avec soin et organisons la livraison
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

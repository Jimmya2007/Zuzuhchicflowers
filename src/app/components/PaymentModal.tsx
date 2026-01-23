import { useState } from 'react';
import { X, CreditCard, Loader2, CheckCircle, XCircle, ArrowLeft, User, Phone, MapPin, Mail, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useCart } from '@/utils/CartContext';
import { projectId, publicAnonKey } from '@/utils/supabase/info';
import { toast } from 'sonner';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentStep = 'form' | 'processing' | 'mock-payment' | 'success' | 'error';

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const totals = getCartTotal();
  
  const [step, setStep] = useState<PaymentStep>('form');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [orderId, setOrderId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handlePayment = async () => {
    // Validation
    if (!customerName.trim()) {
      toast.error('Veuillez entrer votre nom complet');
      return;
    }
    if (!customerPhone.trim()) {
      toast.error('Veuillez entrer votre numéro de téléphone');
      return;
    }
    if (!customerEmail.trim()) {
      toast.error('Veuillez entrer votre adresse email');
      return;
    }
    if (!customerAddress.trim()) {
      toast.error('Veuillez entrer votre adresse de livraison');
      return;
    }

    setStep('processing');

    try {
      console.log('💳 Initiating payment...');

      // Calculate total amount (convert USD to HTG if needed)
      const totalHTG = totals.htg + (totals.usd * 135); // 135 HTG per USD

      // Prepare order data with all customer information
      const orderData = {
        amount: totalHTG,
        currency: 'HTG',
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.priceNumeric,
          currency: item.currency,
          quantity: item.quantity,
          image: item.image
        })),
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim(),
        customerAddress: customerAddress.trim(),
        deliveryNotes: deliveryNotes.trim()
      };

      console.log('📦 Order data:', orderData);

      // Call payment API
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/payment/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(orderData)
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create payment');
      }

      console.log('✅ Payment created:', data);

      setOrderId(data.orderId);
      setPaymentId(data.paymentId);
      setStep('mock-payment');

    } catch (error: any) {
      console.error('❌ Payment error:', error);
      setErrorMessage(error.message || 'Une erreur est survenue');
      setStep('error');
      toast.error('Échec de la création du paiement');
    }
  };

  const handleMockPaymentSuccess = async () => {
    setStep('processing');

    try {
      console.log('✅ Confirming mock payment...');

      // Call callback API
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/payment/callback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            orderId,
            transactionId: paymentId,
            status: 'success'
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to confirm payment');
      }

      console.log('✅ Payment confirmed:', data);

      setStep('success');
      clearCart();
      toast.success('Paiement confirmé avec succès!');

    } catch (error: any) {
      console.error('❌ Confirmation error:', error);
      setErrorMessage(error.message || 'Une erreur est survenue');
      setStep('error');
    }
  };

  const handleMockPaymentFailed = async () => {
    setStep('processing');

    try {
      console.log('❌ Payment failed...');

      await fetch(
        `https://${projectId}.supabase.co/functions/v1/payment/callback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            orderId,
            transactionId: paymentId,
            status: 'failed'
          })
        }
      );

      setErrorMessage('Paiement refusé');
      setStep('error');
      toast.error('Paiement refusé');

    } catch (error) {
      console.error('❌ Error:', error);
      setErrorMessage('Une erreur est survenue');
      setStep('error');
    }
  };

  const resetModal = () => {
    setStep('form');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setCustomerAddress('');
    setDeliveryNotes('');
    setOrderId('');
    setPaymentId('');
    setErrorMessage('');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-[#ED1C24] p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* MonCash Logo */}
                <div className="w-14 h-14 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Red play button shape */}
                    <polygon points="20,10 90,50 20,90" fill="white" />
                    {/* MON text */}
                    <text x="38" y="45" fontSize="16" fontWeight="bold" fill="#ED1C24">MON</text>
                    {/* Cash text */}
                    <text x="35" y="70" fontSize="20" fontWeight="bold" fill="#ED1C24" fontStyle="italic">Cash</text>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">MonCash</h2>
                  <p className="text-sm opacity-90">Paiement Sécurisé</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* STEP 1: Form */}
            {step === 'form' && (
              <div className="space-y-4">
                {/* MonCash Logo Display */}
                <div className="flex justify-center mb-4">
                  <div className="bg-[#ED1C24] rounded-xl p-4 w-32 h-32 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* White play button shape */}
                      <polygon points="15,10 85,50 15,90" fill="white" />
                      {/* MON text */}
                      <text x="35" y="45" fontSize="18" fontWeight="bold" fill="#ED1C24">MON</text>
                      {/* Cash text */}
                      <text x="30" y="70" fontSize="22" fontWeight="bold" fill="#ED1C24" fontStyle="italic">Cash</text>
                    </svg>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Récapitulatif de la Commande</h3>
                  <div className="space-y-1">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.quantity}x {item.name}</span>
                        <span className="font-medium">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-red-200 mt-2 pt-2">
                    {totals.htg > 0 && (
                      <p className="text-2xl font-bold text-[#ED1C24]">
                        {totals.htg.toLocaleString()} HTG
                      </p>
                    )}
                    {totals.usd > 0 && (
                      <p className="text-lg text-gray-600">
                        + ${totals.usd.toLocaleString()} USD
                      </p>
                    )}
                  </div>
                </div>

                {/* Customer Information Form */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#ED1C24]" />
                    Informations de Livraison
                  </h3>

                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      Nom Complet *
                    </Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Jean Dupont"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      Téléphone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+509 3XXX XXXX"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="email@exemple.com"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      Adresse de Livraison *
                    </Label>
                    <Textarea
                      id="address"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Rue, quartier, ville, repère..."
                      className="mt-1"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      Notes de livraison (optionnel)
                    </Label>
                    <Textarea
                      id="notes"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="Instructions spéciales, heure préférée, message à inclure..."
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full bg-[#ED1C24] hover:bg-[#C41920] text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg viewBox="0 0 100 100" className="w-8 h-8 mr-2 inline">
                    <polygon points="15,10 85,50 15,90" fill="white" />
                    <text x="35" y="45" fontSize="18" fontWeight="bold" fill="#ED1C24">MON</text>
                    <text x="30" y="70" fontSize="22" fontWeight="bold" fill="#ED1C24" fontStyle="italic">Cash</text>
                  </svg>
                  Payer avec MonCash
                </Button>

                <p className="text-xs text-center text-gray-500">
                  🔒 Paiement sécurisé via MonCash
                </p>
              </div>
            )}

            {/* STEP 2: Processing */}
            {step === 'processing' && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-16 h-16 text-[#ED1C24] animate-spin mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Traitement...</h3>
                <p className="text-gray-500 text-center">
                  Veuillez patienter pendant le traitement de votre paiement
                </p>
              </div>
            )}

            {/* STEP 3: Mock Payment Screen */}
            {step === 'mock-payment' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300 rounded-xl p-6 text-center">
                  {/* MonCash Logo */}
                  <div className="bg-[#ED1C24] rounded-xl p-3 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <polygon points="15,10 85,50 15,90" fill="white" />
                      <text x="35" y="45" fontSize="18" fontWeight="bold" fill="#ED1C24">MON</text>
                      <text x="30" y="70" fontSize="22" fontWeight="bold" fill="#ED1C24" fontStyle="italic">Cash</text>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Simulation MonCash</h3>
                  <p className="text-gray-600 mb-4">
                    Ceci est une simulation. En production, vous serez redirigé vers MonCash.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-500 mb-1">Montant à payer</p>
                    <p className="text-3xl font-bold text-[#ED1C24]">
                      {(totals.htg + totals.usd * 135).toLocaleString()} HTG
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Order ID: {orderId?.slice(0, 8)}...
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleMockPaymentSuccess}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
                  >
                    ✅ Simuler Paiement Réussi
                  </Button>
                  <Button
                    onClick={handleMockPaymentFailed}
                    variant="outline"
                    className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 py-6 text-lg font-semibold"
                  >
                    ❌ Simuler Paiement Échoué
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Annuler
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: Success */}
            {step === 'success' && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                {/* Success Banner */}
                <div className="w-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-6 shadow-lg">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">🎉 Paiement Réussi!</h3>
                  <p className="text-white/90 text-lg">
                    Votre commande a été confirmée avec succès!
                  </p>
                </div>
                
                {/* Order Details */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5 w-full mb-6 shadow-sm">
                  <p className="text-sm font-medium text-green-700 mb-2">📦 Numéro de commande</p>
                  <p className="font-mono font-bold text-xl text-green-800 bg-white px-4 py-2 rounded-lg">{orderId?.slice(0, 8).toUpperCase()}</p>
                </div>

                {/* Thank You Message */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 w-full mb-6">
                  <p className="text-yellow-800 font-medium">
                    ✨ Merci pour votre confiance! Nous vous contacterons bientôt.
                  </p>
                </div>

                <Button
                  onClick={() => {
                    resetModal();
                    onClose();
                  }}
                  className="w-full py-4 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  ✓ Continuer mes achats
                </Button>
              </div>
            )}

            {/* STEP 5: Error */}
            {step === 'error' && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <XCircle className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Paiement Échoué</h3>
                <p className="text-gray-600 mb-6">
                  {errorMessage || 'Une erreur est survenue lors du traitement'}
                </p>
                <div className="space-y-3 w-full">
                  <Button
                    onClick={resetModal}
                    className="w-full bg-gradient-to-r from-[#F48FB1] to-[#E75480] hover:from-[#E75480] hover:to-[#D63A6A] text-white"
                  >
                    Réessayer
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="w-full"
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

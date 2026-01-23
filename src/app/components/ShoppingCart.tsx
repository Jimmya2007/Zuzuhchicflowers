import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useCart } from '@/utils/CartContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PaymentModal } from '@/app/components/PaymentModal';

export function ShoppingCart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, isCartOpen, setIsCartOpen } = useCart();
  const totals = getCartTotal();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F48FB1] to-[#E75480] p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Mon Panier</h2>
                <p className="text-sm opacity-90">{cartItems.length} {cartItems.length === 1 ? 'article' : 'articles'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingBag className="w-24 h-24 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-600">Votre panier est vide</h3>
              <p className="text-gray-500">Ajoutez des produits pour commencer vos achats</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-4 border-2 border-pink-100 hover:border-[#F48FB1] transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-white flex-shrink-0 border-2 border-pink-200">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-red-100 rounded-full transition-colors text-red-500 hover:text-red-700 flex-shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-lg font-bold text-[#E75480]">
                          {item.priceNumeric.toLocaleString()} {item.currency === 'USD' ? '$' : 'HTG'}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-white rounded-full border-2 border-[#F48FB1] p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-pink-100 rounded-full transition-colors text-[#E75480]"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-pink-100 rounded-full transition-colors text-[#E75480]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-2 text-right text-sm text-gray-600">
                        Total: <span className="font-semibold text-[#E75480]">
                          {(item.priceNumeric * item.quantity).toLocaleString()} {item.currency === 'USD' ? '$' : 'HTG'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Actions */}
        {cartItems.length > 0 && (
          <div className="border-t-2 border-gray-200 p-6 bg-gradient-to-br from-pink-50 to-white space-y-4">
            {/* Totals */}
            <div className="space-y-2">
              {totals.htg > 0 && (
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-700">Total HTG:</span>
                  <span className="font-bold text-2xl text-[#E75480]">
                    {totals.htg.toLocaleString()} HTG
                  </span>
                </div>
              )}
              {totals.usd > 0 && (
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-700">Total USD:</span>
                  <span className="font-bold text-2xl text-[#E75480]">
                    ${totals.usd.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full bg-gradient-to-r from-[#F48FB1] to-[#E75480] hover:from-[#E75480] hover:to-[#D63A6A] text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Passer la Commande
              </Button>
              <Button
                onClick={clearCart}
                variant="outline"
                className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 py-3"
              >
                Vider le Panier
              </Button>
            </div>

            {/* Info */}
            <p className="text-xs text-center text-gray-500">
              Livraison gratuite pour les commandes de plus de 10,000 HTG
            </p>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
      />

      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

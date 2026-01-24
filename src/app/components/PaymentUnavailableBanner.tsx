import { useState, useEffect } from 'react';
import { AlertTriangle, X, Heart, Clock } from 'lucide-react';
import { usePayment } from '@/utils/PaymentContext';

export function PaymentUnavailableBanner() {
  const { isPaymentEnabled, paymentDisabledMessage } = usePayment();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide banner after 5 seconds (5000 milliseconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  if (isPaymentEnabled || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] overflow-hidden">
      {/* Animated gradient background */}
      <div className="relative bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 animate-gradient-x">
        {/* Floating hearts animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-white/20 animate-float"
              style={{
                left: `${15 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                fontSize: `${12 + (i % 3) * 4}px`,
              }}
              size={16 + (i % 3) * 8}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3 text-white">
            <div className="flex items-center gap-2 animate-pulse">
              <Clock className="h-5 w-5" />
              <AlertTriangle className="h-5 w-5" />
            </div>
            
            <p className="text-sm md:text-base font-medium text-center">
              <span className="hidden sm:inline">🚧 </span>
              {paymentDisabledMessage}
              <span className="hidden sm:inline"> 🚧</span>
            </p>

            <button
              onClick={() => setIsVisible(false)}
              className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Animated bottom border */}
        <div className="h-1 bg-gradient-to-r from-pink-300 via-white to-pink-300 animate-shimmer" />
      </div>
    </div>
  );
}

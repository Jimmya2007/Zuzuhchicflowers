import { createContext, useContext, useState, ReactNode } from 'react';

interface PaymentContextType {
  isPaymentEnabled: boolean;
  paymentDisabledMessage: string;
}

const PaymentContext = createContext<PaymentContextType>({
  isPaymentEnabled: false,
  paymentDisabledMessage: 'Le système de paiement est temporairement indisponible. Veuillez utiliser le formulaire de réservation.',
});

export function PaymentProvider({ children }: { children: ReactNode }) {
  // Set to false to disable payments until MonCash is configured
  const [isPaymentEnabled] = useState(false);
  const paymentDisabledMessage = 'Le système de paiement est temporairement indisponible. Veuillez utiliser le formulaire de réservation.';

  return (
    <PaymentContext.Provider value={{ isPaymentEnabled, paymentDisabledMessage }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  return useContext(PaymentContext);
}

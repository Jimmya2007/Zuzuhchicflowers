import { useState, useEffect } from 'react';
import { Header } from '@/app/components/Header';
import { FooterSection } from '@/app/components/FooterSection';
import { HomePage } from '@/app/components/pages/HomePage';
import { PackagesPage } from '@/app/components/pages/PackagesPage';
import { PeluchesPage } from '@/app/components/pages/PeluchesPage';
import { BouquetsPage } from '@/app/components/pages/BouquetsPage';
import { ServicesPage } from '@/app/components/pages/ServicesPage';
import { EquipePage } from '@/app/components/pages/EquipePage';
import { AboutPage } from '@/app/components/pages/AboutPage';
import { CollaborationsPage } from '@/app/components/pages/CollaborationsPage';
import { ReservationPage } from '@/app/components/pages/ReservationPage';
import { AdminLoginPage } from '@/app/components/pages/AdminLoginPage';
import { AdminPage } from '@/app/components/pages/AdminPage';
import { DashboardPage } from '@/app/components/pages/DashboardPage';
import ValentineDashboard from '@/app/components/pages/ValentineDashboard';
import { Toaster } from '@/app/components/ui/sonner';
import { initVisitorTracking } from '@/utils/visitorTracker';
import { CartProvider } from '@/utils/CartContext';
import { PaymentProvider } from '@/utils/PaymentContext';
import { ShoppingCart } from '@/app/components/ShoppingCart';
import { PaymentUnavailableBanner } from '@/app/components/PaymentUnavailableBanner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [userName, setUserName] = useState('');

  // Initialize visitor tracking when app loads
  useEffect(() => {
    console.log('🚀 Initializing visitor tracking...');
    initVisitorTracking();
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (token: string, name: string) => {
    setAccessToken(token);
    setUserName(name);
    setIsAuthenticated(true);
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    setAccessToken('');
    setUserName('');
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    // Admin routes
    if (currentPage === 'admin-login') {
      return <AdminLoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
    }
    
    if (currentPage === 'admin') {
      if (!isAuthenticated) {
        return <AdminLoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
      }
      return (
        <ValentineDashboard 
          onNavigate={handleNavigate}
          userName={userName || 'Admin'}          onLogout={handleLogout}
          accessToken={accessToken}
        />
      );
    }

    if (currentPage === 'dashboard') {
      if (!isAuthenticated) {
        return <AdminLoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
      }
      return (
        <DashboardPage 
          onNavigate={handleNavigate} 
          accessToken={accessToken}
          userName={userName}
        />
      );
    }

    if (currentPage === 'old-admin') {
      return (
        <AdminPage 
          onNavigate={handleNavigate} 
          accessToken={accessToken || 'test-token'}
          userName={userName || 'Admin'}
          onLogout={handleLogout}
        />
      );
    }

    if (currentPage === 'valentine-dashboard') {
      return (
        <ValentineDashboard 
          onNavigate={handleNavigate}
          userName={userName || 'Admin'}
        />
      );
    }

    // Regular pages
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'packages':
        return <PackagesPage onNavigate={handleNavigate} />;
      case 'peluches':
        return <PeluchesPage onNavigate={handleNavigate} />;
      case 'bouquets':
        return <BouquetsPage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'equipe':
        return <EquipePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'collaborations':
        return <CollaborationsPage onNavigate={handleNavigate} />;
      case 'reservation':
        return <ReservationPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Don't show header/footer for admin pages
  const isAdminPage = currentPage === 'admin' || currentPage === 'admin-login' || currentPage === 'valentine-dashboard' || currentPage === 'old-admin';

  return (
    <PaymentProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          {!isAdminPage && <PaymentUnavailableBanner />}
          {!isAdminPage && <Header currentPage={currentPage} onNavigate={handleNavigate} />}
          <main className={isAdminPage ? '' : 'flex-1'}>
            {renderPage()}
          </main>
          {!isAdminPage && <FooterSection />}
          <ShoppingCart />
          <Toaster position="top-right" />
        </div>
      </CartProvider>
    </PaymentProvider>
  );
}
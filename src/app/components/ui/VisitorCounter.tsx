import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { getVisitorStats } from '@/utils/visitorTracker';

export function VisitorCounter() {
  const [stats, setStats] = useState({ total: 0, today: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const visitorStats = await getVisitorStats();
        setStats(visitorStats);
        setLoading(false);
      } catch (error) {
        console.error('Error loading visitor stats:', error);
        setLoading(false);
      }
    };

    loadStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-[#F48FB1] to-[#E75480] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
      <Eye className="w-4 h-4" />
      <div className="text-sm font-semibold">
        <span className="hidden sm:inline">Visites: </span>
        <span className="font-bold">{stats.total.toLocaleString()}</span>
        <span className="hidden sm:inline text-xs ml-2 opacity-80">
          (Aujourd'hui: {stats.today})
        </span>
      </div>
    </div>
  );
}
